# Peculia Platform — Remediation Plan

**From the desk of the consulting crypto-anarchist you didn't ask for but clearly needed**

> The platform is a beautiful machine. Polished. Ambitious. Confident.
> And strapped to its forehead is a sticker that says **"brain coming soon."**
>
> Every fake wallet address, every `setTimeout` dressed up as an API call, every
> `Math.random()` masquerading as a 91.3%-accurate AI — that's the sticker.
> This plan peels it off and installs the actual brain. No vapor, no theater,
> no "simulated network delay" where the only thing being simulated is honesty.

---

**Branch:** `arena/01a019e9-peculia` · **Base commit:** `4037263` · **Date:** 2026-08-19
**Status:** Plan (implementation in progress — see §10 for per-PR status)

---

## 0. Executive Summary

The audit's six findings were verified line-by-line against this checkout. Every one is real.
A few deserve sharpening for accuracy, because an honest remediation plan must start honest:

| Audit claim | Verified reality in this checkout |
|---|---|
| Fragmented wallet implementations (`WalletConnect.tsx`, `WalletConnector.ts`, `Web3Provider.tsx`) | True in spirit. In this tree it's `components/wallet-connect.tsx` (288 lines of dropdown theater) + `components/providers/web3-provider.tsx` (the actual logic). No `WalletConnector.ts` exists anymore — but fragmentation survives in a worse form: **duplicate modules** (`hooks/use-toast.ts` vs `components/ui/use-toast.ts`; `app/components/ThemeSelector.tsx` vs `components/theme-selector.tsx`; orphaned `app/components/*` v0 leftovers). |
| Simulation-only MetaMask connection | **Confirmed.** `web3-provider.tsx` "connects" after `await new Promise(r => setTimeout(r, 1000))`, then assigns `0xEth1...5678`, `0xBsc1...5678`, `solana:community`. `window.ethereum` appears **nowhere** in the codebase. `ethers` is in `package.json` purely as decorative cargo. |
| `predictionGenerator.ts` emits random mock data | True in spirit. No file by that name exists in this checkout; the disease lives in `data/predictions.ts` (hardcoded 2024-era `mockPredictions`), `hooks/use-predictions.ts` (fake 1s API delay), and `components/token-simulator.tsx` (a `Math.random()` random-walk price engine wearing an `AIFeedback` interface as a Halloween costume). |
| "AI-driven" promise with zero AI | **Confirmed, and quantified.** Marketing copy claims *"AI Accuracy: 91.3%"* (`components/home/ecosystem-section.tsx:103`). Total AI-related code: 0 lines. The `Brain` icon from lucide-react is the most advanced AI component on the platform. |
| Cross-chain is hardcoded switching | **Confirmed.** `switchChain()` in `web3-provider.tsx` is a 500ms timeout that swaps the fake address string. No RPC call, no network switch, no chain object exists anywhere. |
| Animation performance (e.g., "raining words") | True as a *class of problem*. There is no literal "raining words" module in this snapshot, but the same anti-pattern is everywhere: DOM-particle storms via `motion.div` arrays (`app/auth/auth-client-page.tsx` renders **50** animated divs; `components/home/ecosystem-section.tsx` `FloatingParticles` does the same), `Math.random()` + `window.innerWidth` executed **during render** (hydration-mismatch time bombs on SSR pages), and a fake **1.5-second** full-screen `PageLoading` overlay (`components/ui/page-loading.tsx`) blocking every route. |
| Inconsistent styling / naming | **Confirmed.** Three UI systems coexist (`@nextui-org/react`, Radix+shadcn, hand-rolled), two animation libraries (`framer-motion`, `react-spring`), two toast systems (`sonner`, Radix toast — with two copies of `use-toast.ts`). 24 inline `style={{}}` blocks, 141 `placeholder.svg` references, and hex-soup classes like `border-[#1e1e1e]` that bypass the perfectly good semantic tokens already defined in `tailwind.config.js`. `globals.css` even overrides the loaded Inter/Space Mono fonts with `font-family: Arial`. Files are named `TokenPitchingClientPage.tsx` (PascalCase) next to `activity-card.tsx` (kebab-case). |
| Tooling | **Worse than audited.** `package.json` has `"lint": "eslint ."` but **no ESLint config exists anywhere**. `next.config.mjs` sets `eslint.ignoreDuringBuilds: true` **and** `typescript.ignoreBuildErrors: true` **and** `images.unoptimized: true`. The build pipeline has been deliberately blindfolded. The README is still the v0 "satori" boilerplate — the most honest document in the repo, ironically, since it promises nothing. |

**The diagnosis:** this is a prototype wearing a production tuxedo. That's fine — prototypes are how revolutions start. But the tuxedo's pockets are full of `Math.random()` and the lapel says "91.3% AI Accuracy." Time to make the machine honest, then make it real.

---

## 1. Prioritized Roadmap

Priority = (user-facing dishonesty risk × blast radius) / effort. Phase 0 is table-stakes hygiene that unblocks everything else.

| Phase | Theme | Deliverables | Est. effort | Exit criterion |
|---|---|---|---|---|
| **P0** | Stop lying, stop wasting | Kill fake loaders; remove `Math.random()` from render; re-enable lint+type checks; fix duplicate modules; replace `placeholder.svg` storm | 1–2 days | `pnpm lint` and `tsc --noEmit` pass clean; zero `Math.random()` in render paths |
| **P1** | Real wallet, real data | Unified wallet module with actual EIP-1193 MetaMask; `PredictionDataSource` interface + API layer; TanStack Query caching | 3–5 days | Wallet connects to a real address; predictions come from a fetcher, not a constant |
| **P2** | Real AI, real cross-chain | AI agent service contracts + orchestrator; honest cross-chain adapter layer (EVM-first via wagmi/viem, Solana via wallet adapter, bridges behind an interface) | 2–4 weeks | One real AI-backed prediction pipeline end-to-end; one real `wallet_switchEthereumChain` |
| **P3** | Performance & design system | Canvas-based effects, design tokens, component library consolidation, boundary linting | 1–2 weeks | Lighthouse perf ≥ 90; zero hex-soup classes outside `tailwind.config.js` |
| **P4** | Narrative & docs | Rewritten README/VISION/ARCHITECTURE, roadmap, honest marketing copy | 2–3 days | Marketing claims are falsifiable against shipped code |

Every phase ships as its own PR (§10 gives the commit sequence). Nothing in this plan requires a rewrite-from-scratch; everything is incremental surgery on the existing skeleton.

---

## 2. UI/UX Consolidation — One Wallet to Rule Them All

### 2.1 Strategy

Current state: UI chrome (`wallet-connect.tsx`) and connection logic (`web3-provider.tsx`) are two separate concerns, and *both are wrong* — the UI thinks it has four chains, the logic invents an address per chain. The fix:

1. **One provider, one hook, one button.** Delete `web3-provider.tsx`'s fake state machine and replace it with a provider that speaks **EIP-1193** to the user's actual injected wallet.
2. **One chain model.** A `ChainConfig` registry as the single source of truth — the dropdown, balances, and RPC calls all read from it. No more `switch (chain) { case ...: return "0xEth1...5678" }`.
3. **Solana is not Ethereum with a hat.** The current code pretends one dropdown can connect MetaMask to Solana. It cannot. Solana gets its own adapter (`@solana/wallet-adapter-react`) later (P2). For P1, ship **EVM-only, honestly**, and show disabled "coming" states for chains not yet wired.
4. **Delete the duplicate modules.** `hooks/use-toast.ts` and `components/ui/use-toast.ts` both exist; one dies. Same for the two `ThemeSelector`s. One owner per concept — this is a governance rule, not a style preference.

### 2.2 The unified provider (real MetaMask, no theater)

Replace `components/providers/web3-provider.tsx` wholesale with this shape (uses only `ethers`, which is already a dependency — no new packages for P1):

```tsx
// components/providers/wallet-provider.tsx
"use client"

import { createContext, useCallback, useContext, useEffect, useMemo, useReducer } from "react"
import { formatEther } from "ethers"

/* ---------------------------------- types ---------------------------------- */

type ChainId = 1 | 56 | 137 | 8453 | 42161

interface ChainConfig {
  id: ChainId
  name: string
  symbol: string
  rpcUrl: string
  explorer: string
  addParams: { chainId: string; chainName: string; nativeCurrency: { name: string; symbol: string; decimals: number }; rpcUrls: string[]; blockExplorerUrls?: string[] }
}

// Single source of truth. The dropdown renders this. Nothing else hardcodes chains.
export const CHAINS: Record<ChainId, ChainConfig> = {
  1: {
    id: 1, name: "Ethereum", symbol: "ETH", rpcUrl: "https://eth.llamarpc.com", explorer: "https://etherscan.io",
    addParams: { chainId: "0x1", chainName: "Ethereum Mainnet", nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 }, rpcUrls: ["https://eth.llamarpc.com"], blockExplorerUrls: ["https://etherscan.io"] },
  },
  137: {
    id: 137, name: "Polygon", symbol: "POL", rpcUrl: "https://polygon-rpc.com", explorer: "https://polygonscan.com",
    addParams: { chainId: "0x89", chainName: "Polygon Mainnet", nativeCurrency: { name: "POL", symbol: "POL", decimals: 18 }, rpcUrls: ["https://polygon-rpc.com"], blockExplorerUrls: ["https://polygonscan.com"] },
  },
  // BSC (56), Base (8453), Arbitrum (42161) — same shape. Solana deliberately NOT here.
}

type WalletStatus = "disconnected" | "connecting" | "connected"

interface WalletState {
  status: WalletStatus
  address: string | null
  chainId: ChainId | null
  balanceWei: bigint | null
  error: string | null
}

type WalletAction =
  | { type: "CONNECT_START" }
  | { type: "CONNECT_OK"; address: string; chainId: ChainId; balanceWei: bigint }
  | { type: "CONNECT_FAIL"; error: string }
  | { type: "ACCOUNTS_CHANGED"; address: string | null }
  | { type: "CHAIN_CHANGED"; chainId: ChainId }
  | { type: "BALANCE"; balanceWei: bigint }
  | { type: "DISCONNECT" }

/* ------------------------------- EIP-1193 glue ------------------------------ */

type EthereumProvider = {
  request(args: { method: string; params?: unknown[] }): Promise<unknown>
  on?(event: string, handler: (...args: unknown[]) => void): void
  removeListener?(event: string, handler: (...args: unknown[]) => void): void
  isMetaMask?: boolean
}

declare global {
  interface Window { ethereum?: EthereumProvider }
}

function getProvider(): EthereumProvider | null {
  if (typeof window === "undefined") return null
  return window.ethereum ?? null
}

function normalizeError(err: unknown): string {
  const e = err as { code?: number; message?: string }
  switch (e?.code) {
    case 4001: return "Connection rejected in wallet."
    case -32002: return "A connection request is already pending — check MetaMask."
    default: return e?.message ?? "Wallet connection failed."
  }
}

/* -------------------------------- the store -------------------------------- */

const initialState: WalletState = { status: "disconnected", address: null, chainId: null, balanceWei: null, error: null }

function reducer(state: WalletState, action: WalletAction): WalletState {
  switch (action.type) {
    case "CONNECT_START": return { ...state, status: "connecting", error: null }
    case "CONNECT_OK": return { status: "connected", address: action.address, chainId: action.chainId, balanceWei: action.balanceWei, error: null }
    case "CONNECT_FAIL": return { ...initialState, error: action.error }
    case "ACCOUNTS_CHANGED": return action.address ? { ...state, status: "connected", address: action.address } : { ...initialState }
    case "CHAIN_CHANGED": return { ...state, chainId: action.chainId }
    case "BALANCE": return { ...state, balanceWei: action.balanceWei }
    case "DISCONNECT": return initialState
  }
}

/* -------------------------------- the provider ------------------------------ */

interface WalletContextValue {
  status: WalletStatus
  address: string | null
  chainId: ChainId | null
  chain: ChainConfig | null
  balance: string            // human-readable, e.g. "1.5000 ETH"
  error: string | null
  connect: () => Promise<void>
  disconnect: () => void
  switchChain: (chainId: ChainId) => Promise<void>
}

const WalletContext = createContext<WalletContextValue | null>(null)

export function useWallet(): WalletContextValue {
  const ctx = useContext(WalletContext)
  if (!ctx) throw new Error("useWallet must be used inside <WalletProvider>")
  return ctx
}

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  const refreshBalance = useCallback(async (address: string) => {
    const p = getProvider()
    if (!p) return
    try {
      const wei = (await p.request({ method: "eth_getBalance", params: [address, "latest"] })) as string
      dispatch({ type: "BALANCE", balanceWei: BigInt(wei) })
    } catch { /* balance is cosmetic; never let it kill the session */ }
  }, [])

  const connect = useCallback(async () => {
    const p = getProvider()
    if (!p) {
      dispatch({ type: "CONNECT_FAIL", error: "No injected wallet found. Install MetaMask (or any EIP-1193 wallet)." })
      throw new Error("no_provider")
    }
    dispatch({ type: "CONNECT_START" })
    try {
      // THE ACTUAL CONNECTION. This opens MetaMask and returns real addresses.
      const accounts = (await p.request({ method: "eth_requestAccounts" })) as string[]
      if (!accounts.length) throw { code: 4001 }
      const chainIdHex = (await p.request({ method: "eth_chainId" })) as string
      const chainId = Number.parseInt(chainIdHex, 16) as ChainId
      const wei = (await p.request({ method: "eth_getBalance", params: [accounts[0], "latest"] })) as string
      dispatch({ type: "CONNECT_OK", address: accounts[0], chainId, balanceWei: BigInt(wei) })
    } catch (err) {
      const message = normalizeError(err)
      dispatch({ type: "CONNECT_FAIL", error: message })
      throw err
    }
  }, [])

  const disconnect = useCallback(() => dispatch({ type: "DISCONNECT" }), [])

  const switchChain = useCallback(async (chainId: ChainId) => {
    const p = getProvider()
    if (!p) return
    try {
      await p.request({ method: "wallet_switchEthereumChain", params: [{ chainId: `0x${chainId.toString(16)}` }] })
    } catch (err) {
      // 4902 = chain unknown to the wallet → propose it for real.
      if ((err as { code?: number }).code === 4902 && CHAINS[chainId]) {
        await p.request({ method: "wallet_addEthereumChain", params: [CHAINS[chainId].addParams] })
      } else throw err
    }
    // chainChanged event will update state via the listener below
  }, [])

  /* ---- silent reconnection + live event subscription (no localStorage lies) ---- */
  useEffect(() => {
    const p = getProvider()
    if (!p) return

    // Silent reconnect: the wallet remembers the permission; we just ask.
    p.request({ method: "eth_accounts" })
      .then(async (accounts) => {
        const accts = accounts as string[]
        if (!accts.length) return
        const chainIdHex = (await p.request({ method: "eth_chainId" })) as string
        const chainId = Number.parseInt(chainIdHex, 16) as ChainId
        const wei = (await p.request({ method: "eth_getBalance", params: [accts[0], "latest"] })) as string
        dispatch({ type: "CONNECT_OK", address: accts[0], chainId, balanceWei: BigInt(wei) })
      })
      .catch(() => { /* never connected or rejected — stay disconnected */ })

    const onAccountsChanged = (accounts: unknown) => {
      const accts = accounts as string[]
      dispatch({ type: "ACCOUNTS_CHANGED", address: accts[0] ?? null })
      if (accts[0]) refreshBalance(accts[0])
    }
    const onChainChanged = (chainIdHex: unknown) =>
      dispatch({ type: "CHAIN_CHANGED", chainId: Number.parseInt(chainIdHex as string, 16) as ChainId })

    p.on?.("accountsChanged", onAccountsChanged)
    p.on?.("chainChanged", onChainChanged)
    return () => {
      p.removeListener?.("accountsChanged", onAccountsChanged)
      p.removeListener?.("chainChanged", onChainChanged)
    }
  }, [refreshBalance])

  const value = useMemo<WalletContextValue>(() => ({
    status: state.status,
    address: state.address,
    chainId: state.chainId,
    chain: state.chainId ? CHAINS[state.chainId] ?? null : null,
    balance: state.balanceWei !== null ? `${formatEther(state.balanceWei)} ${CHAINS[state.chainId ?? 1].symbol}` : "—",
    error: state.error,
    connect,
    disconnect,
    switchChain,
  }), [state, connect, disconnect, switchChain])

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
}
```

**What died here:** the fake delay, the fake addresses, `localStorage` pretending a wallet is connected, the mock PPT decay timer (`setInterval` burning a re-render every 5 minutes for a number nobody owns), and the Solana masquerade.

**What the button becomes:** `wallet-connect.tsx` slims from 288 lines to ~80 — it renders `CHAINS` from the registry, disables chains that require adapters not yet wired (Solana), and shows `state.error` inline instead of `console.error`-ing into the void.

### 2.3 Production-grade upgrade path (P2)

Raw EIP-1193 is correct and dependency-light, but hand-rolling event plumbing forever is how you end up re-auditing this exact mess in 2027. Once P1 ships, move to **wagmi v2 + viem** (EVM) and **@solana/wallet-adapter-react** (Solana), and make `useWallet()` a thin facade over both so consumers never see the seam:

```
useWallet() ──► WalletFacade ──► EvmWalletService (wagmi/viem)
                         └────► SolanaWalletService (@solana/wallet-adapter)
```

The interface above (`connect/disconnect/switchChain`) is already shaped for that migration — that's deliberate. Facades aren't over-engineering when the alternative is a third rewrite of the same component.

---

## 3. Data Handling & AI Integration — Replace the Fortune Cookie

### 3.1 Where the rot is (mapped to the audit's `predictionGenerator.ts`)

| Audit name | Actual file | The rot |
|---|---|---|
| `predictionGenerator.ts` | `data/predictions.ts` | Hardcoded `mockPredictions` — including "Bitcoin $100k by end of 2024," a question the platform answers *in the past tense* |
| (same) | `hooks/use-predictions.ts` | `await new Promise(r => setTimeout(r, 1000))` calling itself an API |
| (same) | `components/token-simulator.tsx` | `Math.random()` random-walk "market" + `AIFeedback` object with canned strings |
| (same) | `app/quest-system/view/[id]/quest-detail-client-page.tsx:232` | User progress = `Math.floor(Math.random() * 100)` |

### 3.2 Step 1 — Define the seam, then swap the guts

The generator becomes a **data-source interface**. Mock data stays in the repo — but demoted to a clearly-labeled fixture behind the same interface, imported only by tests and storybook. The UI must not know or care where predictions come from.

```ts
// lib/predictions/sources/types.ts

export interface PredictionEvidence {
  kind: "price-feed" | "news" | "onchain-event" | "model-output" | "manual"
  url?: string
  source: string
  fetchedAt: string           // ISO — provenance or it didn't happen
  dataHash?: string           // optional: content-addressed proof (IPFS/Arweave)
}

export interface PredictionCandidate {
  id: string
  title: string
  description: string
  category: PredictionCategory
  resolveBy: string
  initialOdds: { yes: number; no: number }
  confidence: number          // 0..1, model-reported, NOT a vibes number
  rationale: string           // must cite evidence refs — no uncited oracles
  evidence: PredictionEvidence[]
}

export interface PredictionQuery {
  categories?: PredictionCategory[]
  search?: string
  horizonDays?: number
  limit?: number
}

export interface PredictionDataSource {
  readonly id: string
  readonly name: string
  fetchCandidates(query: PredictionQuery): Promise<PredictionCandidate[]>
  resolveConfidence(candidateId: string): Promise<number>
}

export class PredictionSourceError extends Error {
  constructor(sourceId: string, cause?: unknown) {
    super(`Prediction source ${sourceId} failed: ${cause instanceof Error ? cause.message : String(cause)}`)
    this.name = "PredictionSourceError"
  }
}
```

```ts
// lib/predictions/sources/registry.ts
import { PredictionDataSource } from "./types"

// Sources are registered, not imported ad-hoc. Adding AI later = adding one entry.
export const predictionSources = new Map<string, PredictionDataSource>()

export function registerPredictionSource(source: PredictionDataSource) {
  if (predictionSources.has(source.id)) throw new Error(`Duplicate prediction source: ${source.id}`)
  predictionSources.set(source.id, source)
}

export function getPredictionSource(id: string): PredictionDataSource {
  const source = predictionSources.get(id)
  if (!source) throw new PredictionSourceError(id)
  return source
}
```

```ts
// lib/predictions/sources/mock-source.ts  ← the honest ghetto
import { mockPredictions } from "@/data/predictions"
import { PredictionDataSource, PredictionCandidate } from "./types"

// Exists ONLY so dev/test/storybook never block on a network.
// Never registered in production. If it ships, CI must fail.
export const mockPredictionSource: PredictionDataSource = {
  id: "mock",
  name: "Fixture data (dev only)",
  async fetchCandidates(query) {
    const candidates = mockPredictions.map((p): PredictionCandidate => ({
      id: p.id, title: p.title, description: p.description,
      category: p.category as PredictionCandidate["category"],
      resolveBy: p.endDate, initialOdds: p.odds, confidence: 0.5,
      rationale: "Static fixture — no evidence. For UI development only.",
      evidence: [],
    }))
    return query.search
      ? candidates.filter((c) => c.title.toLowerCase().includes(query.search!.toLowerCase()))
      : candidates
  },
  async resolveConfidence() { return 0.5 },
}
```

```ts
// lib/predictions/sources/api-source.ts  ← the real one (P1)
import { PredictionDataSource, PredictionQuery } from "./types"

// Talks to the backend (Next.js route handlers or a dedicated service).
// The backend is where market data + LLM calls actually live.
export class ApiPredictionSource implements PredictionDataSource {
  readonly id = "api"
  readonly name = "Peculia prediction service"
  constructor(private readonly baseUrl: string = process.env.NEXT_PUBLIC_API_URL ?? "/api") {}

  async fetchCandidates(query: PredictionQuery): Promise<PredictionCandidate[]> {
    const params = new URLSearchParams()
    if (query.categories?.length) params.set("categories", query.categories.join(","))
    if (query.search) params.set("q", query.search)
    if (query.limit) params.set("limit", String(query.limit))

    const res = await fetch(`${this.baseUrl}/predictions?${params}`, {
      headers: { "content-type": "application/json" },
      next: { revalidate: 60 },           // ISR-friendly cache hint
    })
    if (!res.ok) throw new PredictionSourceError(this.id, new Error(`HTTP ${res.status}`))
    return res.json()
  }

  async resolveConfidence(candidateId: string): Promise<number> {
    const res = await fetch(`${this.baseUrl}/predictions/${candidateId}/confidence`)
    if (!res.ok) throw new PredictionSourceError(this.id, new Error(`HTTP ${res.status}`))
    const { confidence } = await res.json()
    return confidence
  }
}
```

Then `use-predictions.ts` loses the fake timer and gains a cache (§4.2). The `useEffect`-with-sleep disappears entirely.

### 3.3 Step 2 — The AI agent swarm (P2), architected like it might actually work

The platform's story is "AI-blockchain convergence." Convergence means **two systems meeting at a provable seam**, not a `<Brain />` icon. Architecture:

```
                 ┌───────────────────────────────────────────────┐
 User creates   │             Prediction Pipeline                │
 market         │                                                │
      │         │  Orchestrator (schedules, enforces budgets,    │
      ▼         │    retries, rate-limits, logs every step)      │
 ┌──────────┐   │       │           │            │               │
 │ Frontend │◄──┤       ▼           ▼            ▼               │
 └──────────┘   │  Market Scout   Analyst     Verifier           │
      │         │  (prices,news,  (LLM       (checks outputs     │
      ▼         │   on-chain     reasoning  against evidence,    │
 ┌──────────┐   │   events)       + ensembles)  scores coherence,│
 │ Backend  │   │       │           │       attaches model       │
 │ (Route   │   │       └─────┬─────┘       signature + hash)    │
 │ handlers)│   │             ▼                                  │
 └────┬─────┘   │   Market Proposal {candidate, confidence,      │
      │         │    rationale, evidence[], attestation}         │
      ▼         │             │                                  │
 ┌──────────┐   │             ▼                                  │
 │ On-chain │   │   Anchor: tx on L2 writes evidenceHash +       │
 │ contracts│◄──┤   model signature → market contract emits      │
 └──────────┘   │   "market created with provenance"             │
                └───────────────────────────────────────────────┘
```

The key discipline: **agents are services behind interfaces, not chat widgets.** Each is independently testable, swappable, and *pausable* — and the UI never awaits an LLM call directly (timeouts are the product of bad seams).

```ts
// lib/agents/types.ts

export interface AgentOutput<T> {
  data: T
  model: string                 // e.g. "gpt-4o-2024-11-20" — no anonymous intelligence
  latencyMs: number
  inputHash: string             // SHA-256 of the exact prompt+inputs
  attestation?: {
    signature: string           // service-side key signing (model, inputHash, outputHash)
    provider: "openai" | "anthropic" | "local" | "tee"
    teeEvidence?: string        // optional: TEE attestation doc for the paranoid (us)
  }
}

export interface Agent {
  readonly id: string
  readonly name: string
  run<T>(input: unknown): Promise<AgentOutput<T>>
}

export class AgentError extends Error {
  constructor(agentId: string, cause?: unknown) {
    super(`Agent ${agentId} failed: ${cause instanceof Error ? cause.message : String(cause)}`)
    this.name = "AgentError"
  }
}
```

```ts
// lib/agents/orchestrator.ts  (pseudocode — the real thing lives server-side)
export async function generateMarketProposal(
  topic: string,
  opts: { timeoutMs: number; maxBudgetUsd: number },
): Promise<MarketProposal> {
  const runId = crypto.randomUUID()
  const budget = new Budget(opts.maxBudgetUsd)                       // nobody gets a blank check

  // 1. Scout: pull grounded inputs (feeds, news, on-chain events). No LLM allowed here.
  const evidence = await withTimeout(scoutAgent.gatherEvidence(topic, budget), opts.timeoutMs)

  // 2. Analyst: ensemble reasoning OVER the evidence, not over vibes.
  const analysis = await withTimeout(analystAgent.analyze(topic, evidence, budget), opts.timeoutMs)

  // 3. Verifier: an independent pass that scores claim-evidence coherence.
  //    Score below threshold → proposal rejected with reasons. The AI says "no" to itself.
  const verdict = await withTimeout(verifierAgent.verify(analysis, evidence, budget), opts.timeoutMs)
  if (verdict.data.coherence < VERIFY_THRESHOLD) {
    return { status: "rejected", reasons: verdict.data.findings, runId }
  }

  // 4. Anchor: hash the artifacts; the hash goes on-chain, the artifacts go to IPFS.
  const artifactHash = await anchorArtifacts({ runId, evidence, analysis, verdict })

  return { status: "accepted", proposal: analysis.data, evidence, artifactHash, runId }
}
```

**Honesty engineering (the part nobody wants to fund but everyone audits for):** every agent output carries `model`, `inputHash`, and a signature. When the UI shows "AI Accuracy 91.3%", that number must be *computable* from logged verdicts — not a string in a component. Wire the dashboard to a `/api/agents/stats` endpoint that aggregates real accept/reject/resolve rates. Fake metrics die the moment they're derived, not declared.

### 3.4 Step 3 — Cross-chain that isn't a costume change

Replace `switchChain` theater with a real adapter layer (P2):

1. **EVM chains:** wagmi/viem handles `wallet_switchEthereumChain` + chain configs natively. One config table, one code path — the dropdown from §2.2 already renders from a registry, so adding Base/Arbitrum is a config diff, not a component rewrite.
2. **Solana:** `@solana/wallet-adapter-react` — a genuinely separate wallet ecosystem, surfaced as a separate connect flow, not a fake menu item.
3. **Bridging:** do not build a bridge. Wrap one — Chainlink CCIP or Wormhole — behind a `BridgeService` interface so the UI shows quotes/status without pretending you own relayers:

```ts
// lib/bridges/types.ts
export interface BridgeQuote { fromChainId: number; toChainId: number; amount: string; fee: string; etaSec: number; provider: "ccip" | "wormhole" }
export interface BridgeService {
  quote(req: { fromChainId: number; toChainId: number; amount: string }): Promise<BridgeQuote>
  status(txHash: string): Promise<"pending" | "confirmed" | "failed">
}
```

4. **Until then:** the UI marks non-EVM chains as `disabled` with a "Roadmap: Solana (Q…)" tooltip. An honest "coming" beats a fake "here."

---

## 4. Performance — Delete the Fake Work First

A blunt truth: the biggest performance win on this app is **deleting code that wastes time on purpose.**

### 4.1 Kill the fake 1.5-second blocker

`components/ui/page-loading.tsx` holds every user hostage for 1500ms of *nothing*, on a `setTimeout`, over a full-screen overlay. That's not loading state; that's contempt for the user's CPU.

**Fix:** delete the fake timer. The only legitimate use is Next's route-transition signal — and Next 14 gives that for free with a `loading.tsx` per route (several already exist: `app/prediction-markets/loading.tsx`, etc.). So: **remove `PageLoading` from `app/layout.tsx` entirely.** If a branded transition is desired later, use a 150ms CSS fade tied to actual navigation events — never a fixed sleep.

### 4.2 The "raining words" class: Canvas, not 50 re-rendering divs

The audit's "raining words" doesn't exist verbatim in this tree, but its evil twins do — `[...Array(50)].map(... motion.div ...)` in `auth-client-page.tsx`, `FloatingParticles` in `ecosystem-section.tsx`, plus `Math.random()` executed during render (SSR hydration mismatch guaranteed). One canonical component replaces them all:

```tsx
// components/ui/raining-words.tsx
"use client"

import { useEffect, useRef } from "react"

interface RainingWordsProps {
  words: string[]
  density?: number        // words on screen, not DOM nodes
  fontSize?: number
  color?: string
  className?: string
}

interface Droplet {
  x: number; y: number
  speed: number           // px/sec
  word: string
  opacity: number
}

export function RainingWords({ words, density = 20, fontSize = 14, color = "#10b981", className }: RainingWordsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let raf = 0
    let w = 0
    let h = 0

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)   // cap DPR: retina ≠ render budget
      w = canvas.clientWidth
      h = canvas.clientHeight
      canvas.width = Math.max(1, w * dpr)
      canvas.height = Math.max(1, h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    // Seeded once, inside the effect — never during render, never on the server.
    const rand = (min: number, max: number) => min + Math.random() * (max - min)
    const droplets: Droplet[] = Array.from({ length: density }, () => ({
      x: rand(0, 1), y: rand(0, 1),            // normalized; resolved at draw time
      speed: rand(24, 90),
      word: words[Math.floor(rand(0, words.length))],
      opacity: rand(0.08, 0.35),
    }))

    ctx.font = `500 ${fontSize}px var(--font-space-mono, monospace)`
    ctx.textBaseline = "top"

    let last = performance.now()
    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.1)   // clamp: tab-switch jumps can't teleport words
      last = now
      ctx.clearRect(0, 0, w, h)
      ctx.fillStyle = color

      for (const d of droplets) {
        d.y += (d.speed * dt) / h                       // normalized velocity
        if (d.y > 1.05) {                               // recycle instead of reallocate
          d.y = -0.05
          d.x = rand(0, 1)
          d.word = words[Math.floor(rand(0, words.length))]
        }
        ctx.globalAlpha = d.opacity
        ctx.fillText(d.word, d.x * w, d.y * h)
      }
      ctx.globalAlpha = 1
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    // Pause when hidden — background tabs don't get free GPU.
    const onVisibility = () => {
      cancelAnimationFrame(raf)
      if (!document.hidden) {
        last = performance.now()
        raf = requestAnimationFrame(tick)
      }
    }
    document.addEventListener("visibilitychange", onVisibility)
    // Bonus: pause when off-screen entirely.
    const io = new IntersectionObserver(([entry]) => {
      cancelAnimationFrame(raf)
      if (entry.isIntersecting && !document.hidden) {
        last = performance.now()
        raf = requestAnimationFrame(tick)
      }
    })
    io.observe(canvas)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      document.removeEventListener("visibilitychange", onVisibility)
    }
  }, [words, density, fontSize, color])

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />
}
```

One canvas. Zero React re-renders per frame. Zero DOM churn. The auth pages and ecosystem section both swap their 50-div particle storms for this. The typing effect in `hero-section.tsx` (a `setInterval` driving state every ~100ms) gets the same treatment: animate on canvas or, better, **delete it** — typed hero text is a 2019 flex that costs a re-render every 100ms forever.

### 4.3 Caching: stop re-fetching what doesn't change

All data hooks (`use-predictions`, `use-proposals`, `use-quests`, `use-token-pitches`) currently do `useState + useEffect + fake sleep`. Replace with **TanStack Query v5** (works with React 19):

```ts
// hooks/use-predictions.ts (rewritten)
"use client"

import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { getPredictionSource } from "@/lib/predictions/sources/registry"
import type { PredictionFilter, PredictionCategory } from "./types"

export function usePredictions(filter: PredictionFilter, category: PredictionCategory, search: string) {
  return useQuery({
    queryKey: ["predictions", { filter, category, search }],
    queryFn: () => getPredictionSource("api").fetchCandidates({
      categories: category === "all" ? undefined : [category],
      search: search || undefined,
    }),
    staleTime: 30_000,                    // markets don't move every keystroke
    placeholderData: keepPreviousData,    // no flash-of-loading on filter change
    retry: 2,
  })
}
```

Rules: `staleTime ≥ 30s` for market listings; **never** cache wallet balances/state; `gcTime` short (60s) for user data; serialize `queryKey` in a lint-checkable helper so `["predictions", filter, category]` doesn't drift into string soup across the app.

### 4.4 Images: 141 placeholders is not a design system

- **Turn optimization back on:** `next.config.mjs` currently sets `images: { unoptimized: true }`. Flip it off, configure `remotePatterns` for allowed origins (IPFS gateways, avatar CDNs), and use `next/image` everywhere.
- **Kill `placeholder.svg`:** for avatars, render an initial-based `<Avatar>` fallback (the Radix avatar component is already in the tree); for hero/blog images, host real assets with correct `sizes`/`priority` attributes.
- **Preload what's above the fold, lazy-load the rest** (`loading="lazy"` + `sizes`). The blog images (`cross-chain-interoperability.jpg`, etc.) should never be in the initial bundle path.

### 4.5 Smarter route preloading

- Next's `<Link>` already prefetches on viewport entry — **make sure every internal link is a `<Link>`** (the prior fix doc `ROUTING_AND_UX_FIXES.md` claims this was done; enforce it with the ESLint rule in §5.3 so it can't regress).
- For heavy routes (`prediction-markets`, `token-pitching`), use `next/dynamic` with a *named* loading state — but only where profiling shows main-thread contention. Blanket `next/dynamic` is cargo-cult; measure first.
- Use the Network Information API to gate prefetching on slow connections (`navigator.connection.saveData`/`effectiveType`) via a tiny `usePrefetchPolicy()` hook — cheap, real, and exactly the kind of "smarter based on network conditions" the audit asked for.

---

## 5. Standardization — Make Chaos a Lint Error

### 5.1 The rules (short enough to memorize)

1. **File names:** `kebab-case.tsx` everywhere. `TokenPitchingClientPage.tsx` → `token-pitching-client-page.tsx`. Folders already match this (`prediction-markets/`); only files revolt.
2. **Component names:** `PascalCase`, one component per file, exported as `default` only for route/page entries — everything else gets **named exports**. Default exports are how two components end up named `ThemeSelector` in two folders (which has already happened).
3. **Folder ownership:** `components/ui/` = primitives; `components/<domain>/` = domain composition (already mostly true); `app/` = routing + metadata only, logic lives in `components/`/`hooks/`/`lib/`; `data/` = **fixtures only**, importable by nothing in production code (`lib/` sources, tests, storybook excepted).
4. **Styling:** Tailwind semantic tokens only. `bg-[#1e1e1e]` is banned; that color already exists as `--border`/`--card` tokens. Hardcoded hex is how the same "black" became five slightly different blacks across pages.
5. **One library per job:** animation = `framer-motion` (delete `react-spring`); toasts = `sonner` (delete Radix toast + one of the two `use-toast.ts` copies); UI primitives = Radix/shadcn (delete `@nextui-org/react`); forms = `react-hook-form` + `zod` (already present — actually *use* them; `auth-client-page.tsx` hand-rolls form state that a resolver would do in 5 lines).

### 5.2 The canonical Button (design-token edition)

`components/ui/button.tsx` already exists — standardize it, then make everything import it:

```tsx
// components/ui/button.tsx (canonical)
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium " +
  "ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 " +
  "focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 " +
  "[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-border bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
  },
)
Button.displayName = "Button"

export { Button, buttonVariants }
```

Note the `className={cn(...)}` merge — that's why `className="border-[#1e1e1e]"` overrides currently work. After the token migration, custom classes should only ever *tune*, never *retheme*.

### 5.3 Tooling that enforces all of it

There is currently **no ESLint config** despite `"lint": "eslint ."`, and builds run with lint+types **disabled**. Step one of standardization is admitting the compiler exists:

```js
// next.config.mjs (diff)
const nextConfig = {
-  eslint: { ignoreDuringBuilds: true },
-  typescript: { ignoreBuildErrors: true },
+  eslint: { ignoreDuringBuilds: false },
+  typescript: { ignoreBuildErrors: false },
-  images: { unoptimized: true },
+  images: {
+    remotePatterns: [{ protocol: "https", hostname: "**" }], // tighten per-origin as assets land
+  },
}
```

```js
// eslint.config.mjs (flat config, ESLint 9)
import nextPlugin from "@eslint/eslintrc"               // (or @next/eslint-plugin-next directly)
// Install: pnpm add -D eslint @next/eslint-plugin-next eslint-plugin-import
//          eslint-plugin-boundaries typescript-eslint prettier eslint-config-prettier

export default [
  {
    ignores: [".next/**", "node_modules/**", "public/**"],
  },
  {
    files: ["**/*.{ts,tsx}"],
    plugins: { "boundaries": boundaries },
    settings: {
      "boundaries/elements": [
        { type: "app", pattern: "app/**", mode: "folder" },
        { type: "ui", pattern: "components/ui/**", mode: "folder" },
        { type: "feature", pattern: "components/*/**", capture: ["feature"], mode: "folder" },
        { type: "lib", pattern: "lib/**", mode: "folder" },
        { type: "hooks", pattern: "hooks/**", mode: "folder" },
        { type: "data", pattern: "data/**", mode: "folder" },   // the ghetto
      ],
      "boundaries/rules": [
        { from: ["app"], allow: ["ui", "feature", "lib", "hooks"] },
        { from: ["feature", "ui"], allow: ["ui", "lib", "hooks"] },
        { from: ["lib", "hooks"], allow: ["lib", "hooks"] },
        // Nothing may import from "data" except lib/predictions sources + test files:
        { from: ["app", "ui", "feature", "hooks"], disallow: ["data"] },
      ],
    },
    rules: {
      "boundaries/element-types": "error",
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "no-restricted-imports": ["error", {
        patterns: [
          { group: ["@nextui-org/*"], message: "NextUI is being removed — use components/ui/*." },
          { group: ["react-spring"], message: "One animation library: framer-motion." },
          { group: ["next/link", "next/navigation"], importNames: ["default"], message: "No raw window.location navigation." },
        ],
      }],
      "react/display-name": "error",
      "react-hooks/exhaustive-deps": "error",
    },
  },
  // NEXT rules (core-web-vitals) + typescript-eslint recommended, then:
  {
    files: ["**/*.tsx"],
    rules: {
      // Math.random() during render is a hydration-mismatch factory:
      "no-restricted-syntax": ["error",
        { selector: "CallExpression[callee.object.name='Math'][callee.property.name='random']", message: "Math.random() in render breaks SSR hydration. Seed randomness inside useEffect/useMemo or move to canvas." },
      ],
    },
  },
]
```

Plus: `prettier` (`.prettierrc` + `prettier-plugin-tailwindcss` for class sorting), `lint-staged` + `simple-git-hooks` so unformatted code can't merge, and a **CI job** running `pnpm lint && tsc --noEmit && pnpm build` on every PR. Blindfold removed.

### 5.4 Consolidation kill list

| Delete / merge | Why | Replaced by |
|---|---|---|
| `hooks/use-toast.ts` **or** `components/ui/use-toast.ts` | Same concept, two owners | one of them, chosen in a coin flip that takes 10 seconds |
| `app/components/ThemeSelector.tsx` **or** `components/theme-selector.tsx` | Ditto | one |
| `app/components/{DigitalClock,MoviePlayer,MusicPlayer,PomodoroTimer,TaskList}.tsx` | v0 demo leftovers (verify zero imports first) | deletion |
| `components/{quest-wheel,social-feed,wager-card}.tsx` | Verify usage; dead components are dead weight | deletion or revival |
| `@nextui-org/react`, `react-spring`, Radix toast, `sonner` (keep exactly one toast system) | three UI systems, two animation libs, two toasts | Radix primitives + sonner |
| `web3-provider.tsx` fake state machine | §2.2 | `wallet-provider.tsx` |

---

## 6. Narrative Alignment — Sell What Exists, Then Exist What You Sell

### 6.1 The honesty audit of current copy

- *"AI Accuracy: 91.3%"* (`ecosystem-section.tsx:103`) — fabricated. Replace with a live metric from §3.3's agent logs, or label the stat `"Launch target"` while it's aspirational.
- *"Seamless cross-chain across Ethereum, Solana, BSC, Polygon"* (blog + metadata) — currently a dropdown with fake addresses. Either ship §3.4 or say *"EVM live; Solana adapter on the roadmap (date)."*
- `README.md` — still the v0 "satori" boilerplate. **The single most embarrassing file in the repo.** Rewrite it (§6.3).
- `next.config` still says `generator: "v0.dev"` in layout metadata. Cosmetic, but the sticker shows.

### 6.2 Make the vision *falsifiable*

A vision you can't check is marketing. A vision with a test suite is engineering. Add to CI:

```ts
// tests/vision.test.ts  — the "no vaporware" contract
import { CHAINS } from "@/components/providers/wallet-provider"

test("every chain surfaced in the UI has a real network config", () => {
  for (const chain of Object.values(CHAINS)) {
    expect(chain.rpcUrl).toMatch(/^https:\/\//)
    expect(chain.addParams.chainId).toMatch(/^0x[0-9a-f]+$/i)
  }
})

test("marketing accuracy stat is derived, not hardcoded", async () => {
  const stats = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/agents/stats`).then(r => r.json())
  expect(stats).toHaveProperty("accuracy")          // computed from verdict logs
  expect(stats.accuracy).toBeGreaterThanOrEqual(0)
  expect(stats.accuracy).toBeLessThanOrEqual(1)
})
```

If the claim can't pass its test, the claim changes — not the test.

### 6.3 Documentation updates (the rewrite list)

1. **`README.md`** — what Peculia is, what's *live* today, what's *roadmap*, how to run it, how to contribute. Delete the Vercel/v0 boilerplate.
2. **`docs/VISION.md`** — the AI-blockchain convergence thesis, written as architecture (the §3.3 diagram), not adjectives.
3. **`docs/ARCHITECTURE.md`** — data flow: UI → data sources → agents → contracts; wallet facades; caching strategy.
4. **`docs/ROADMAP.md`** — the phase table from §1, with owners and exit criteria. A roadmap with exit criteria is a plan; without them it's a mood board.
5. **`docs/VERIFICATION.md`** — how a skeptic verifies "AI" claims: model signatures, evidence hashes, on-chain anchors. The platform's audience is crypto-anarchists; *trust us* was never going to work anyway.

---

## 7. Overall Code Quality — State, Errors, and the Death of Hardcoded Data

### 7.1 Global state: one store, typed, serialized deliberately

Server state (predictions, quests, proposals) → **TanStack Query** (§4.3). Client state (wallet, UI prefs, modals) → **Zustand** (one small dep; or Context for P1 if you want zero new deps — but a 200-line context file is already how we got here):

```ts
// stores/user-store.ts
import { create } from "zustand"
import { persist } from "zustand/middleware"

interface UserState {
  hasSeenOnboarding: boolean
  dismissedBanners: string[]
  setOnboarded: () => void
  dismissBanner: (id: string) => void
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      hasSeenOnboarding: false,
      dismissedBanners: [],
      setOnboarded: () => set({ hasSeenOnboarding: true }),
      dismissBanner: (id) => set((s) => ({ dismissedBanners: [...s.dismissedBanners, id] })),
    }),
    { name: "peculia-ui" },
  ),
)
```

Wallet state stays in its provider (§2.2) — wallet ≠ UI preference, and mixing them is how `localStorage.getItem("peculia_address")` became the source of truth for "connected."

### 7.2 Global error boundary (the app must never white-screen again)

```tsx
// components/providers/error-boundary.tsx
"use client"

import { Component, type ErrorInfo, type ReactNode } from "react"
import { Button } from "@/components/ui/button"

interface Props { children: ReactNode }
interface State { error: Error | null }

export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null }

  static getDerivedStateFromError(error: Error): State { return { error } }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // Structured, awaitable, and NOT console.error into the void:
    void fetch("/api/telemetry/errors", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        name: error.name, message: error.message, stack: error.stack?.slice(0, 4000),
        componentStack: info.componentStack?.slice(0, 4000),
        route: typeof window !== "undefined" ? window.location.pathname : null,
        ts: Date.now(),
      }),
    }).catch(() => { /* telemetry must never throw */ })
  }

  render() {
    if (this.state.error) {
      return (
        <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 p-8 text-center">
          <h1 className="text-xl font-semibold">The machine hiccuped.</h1>
          <p className="max-w-md text-sm text-muted-foreground">
            Error logged. Refresh, or file it with the details below — transparency goes both ways.
          </p>
          <pre className="max-h-40 max-w-full overflow-auto rounded-md border border-border bg-card p-3 text-xs">
            {this.state.error.message}
          </pre>
          <Button onClick={() => { this.setState({ error: null }); window.location.reload() }}>
            Try again
          </Button>
        </div>
      )
    }
    return this.props.children
  }
}
```

Wire it in `app/layout.tsx` around the app shell, and add Next's built-in `app/error.tsx` + `app/global-error.tsx` (App Router handles server-side + root-level failures) for the layers the boundary can't see.

### 7.3 Replace hardcoded data with typed fetching

Every hardcoded dataset gets the same treatment, in this order (prediction markets first — it's the flagship):

| Dataset | Now | Then |
|---|---|---|
| `data/predictions.ts` | constant + fake sleep | `GET /api/predictions` → DB → contract indexer |
| `data/quests.ts` | constant | `GET /api/quests` |
| `data/proposals.ts` | constant | `GET /api/proposals` (quadratic funding math stays client-side; data doesn't) |
| `data/token-pitches.ts` | constant | `GET /api/pitches` |
| `activities-client-page.tsx` (~240 lines of inline mock) | literal JSX arrays | `GET /api/activities` |
| auth (`auth-client-page.tsx`) | `console.log(loginData)` | real auth provider (SIWE for wallet-native login fits the thesis) |

Each API response gets a **zod schema** (zod is already a dependency — use it) so the frontend trusts nothing:

```ts
// lib/api/predictions/schema.ts
import { z } from "zod"

export const predictionCandidateSchema = z.object({
  id: z.string(),
  title: z.string().min(5),
  description: z.string().min(20),
  category: z.enum(["Cryptocurrency", "Technology", "Business", "Space", "Music", "Other"]),
  resolveBy: z.string().datetime(),
  initialOdds: z.object({ yes: z.number().min(0).max(100), no: z.number().min(0).max(100) }),
  confidence: z.number().min(0).max(1),
  rationale: z.string(),
  evidence: z.array(z.object({
    kind: z.enum(["price-feed", "news", "onchain-event", "model-output", "manual"]),
    source: z.string(), url: z.string().url().optional(),
    fetchedAt: z.string().datetime(),
  })).default([]),
})

export type PredictionCandidate = z.infer<typeof predictionCandidateSchema>

export async function fetchPredictionCandidates(query: PredictionQuery): Promise<PredictionCandidate[]> {
  const res = await fetch(buildUrl("/api/predictions", query))
  if (!res.ok) throw new Error(`predictions API: HTTP ${res.status}`)
  return predictionCandidateSchema.array().parse(await res.json())   // parse = verify
}
```

### 7.4 Misc quality that pays rent daily

- **Kill the `setInterval` PPT decay timer** in the old web3 provider — it re-renders every 5 minutes to decrement a number nobody can spend. Token balances come from contracts, not timers.
- **Forms:** adopt `react-hook-form` + `zodResolver` across auth/signup/modals (already in deps; currently decorative).
- **`Math.random()` in render:** banned by the §5.3 lint rule. All four offenders (auth/signup/login/portfolio pages) move randomness into effects or canvas.
- **`window.innerWidth` during render:** same rule, same reason (SSR). Use CSS (`clamp()`, `vw`) or measure in effects.
- **`React.memo`/`useMemo` discipline:** `ecosystem-section.tsx` already does this correctly — make it the house style for anything inside lists.

---

## 8. What "Done" Looks Like (Acceptance Criteria)

- [ ] `pnpm lint` and `tsc --noEmit` pass with the new configs; CI blocks merges that don't.
- [ ] Clicking **Connect Wallet** opens MetaMask and shows a **real** address + real chain ID + real balance; rejecting the request leaves the app disconnected with a friendly error.
- [ ] `grep -rn "Math.random" app/ components/` returns hits only inside `useEffect`/handlers/canvas loops — zero in render scope.
- [ ] `grep -rn "setTimeout(resolve" app/ components/` returns nothing (no fake API latency anywhere).
- [ ] `placeholder.svg` references: 0. All images via `next/image` with real assets or initial-based avatar fallbacks.
- [ ] Exactly one toast system, one animation library, one UI primitive library, one `use-toast.ts`, one `ThemeSelector`.
- [ ] One prediction pipeline fetches from `/api/predictions` with zod validation; mock data reachable only in dev/tests.
- [ ] `AI Accuracy` stat on the home page is computed from `/api/agents/stats` or clearly labeled a roadmap target.
- [ ] Chain dropdown renders from the `CHAINS` registry; unsupported chains are disabled with roadmap tooltips, not fake addresses.
- [ ] README describes the actual platform; `docs/{VISION,ARCHITECTURE,ROADMAP,VERIFICATION}.md` exist.
- [ ] Lighthouse ≥ 90 on `/` and `/prediction-markets` (mobile throttle). The 1.5s fake loader is gone.
- [ ] `next.config.mjs` has lint, type-checking, and image optimization **enabled**.

## 9. Risks & Guardrails

- **Scope creep:** the swarm in §3.3 is P2 for a reason. A "minimal honest AI" milestone is: *one* agent (analyst), *one* evidence pipeline, *one* signed output, *one* market created with provenance. Ship that before orchestrating a swarm — swarms without telemetry are just multiple simultaneous ways to be wrong.
- **Wallet UX regression:** EIP-1193 direct integration is fine, but mobile wallets (WalletConnect protocol) need wagmi eventually. Don't block P1 on it; do block P2.
- **Don't delete the mocks on day one:** dev velocity and demos need fixtures. Demote them behind the interface (`mockPredictionSource`) and gate registration behind `process.env.NODE_ENV !== "production"`.
- **Copy changes are cheap; reneging isn't.** If Solana support can't ship by the roadmap date, move the date publicly. A moved date is roadmap hygiene; a silent fake address is fraud.

## 10. Suggested Commit Sequence (each = one reviewable PR)

> **Implementation status:** ✅ PRs 1–2 shipped. Notes on deviations from this plan
> are marked inline below.

1. ✅ `chore: re-enable lint/tsc/image-optimization; add eslint+prettier configs` (fix fallout; keep rules advisory first, escalate to `error` in PR 3)
   - **Deviation:** shipped as `.eslintrc.json` (ESLint 8) instead of the flat `eslint.config.mjs` example in §5.3 — Next 14.2's build-time lint step bundles ESLint 8 and cannot read flat configs; keeping legacy config keeps lint enforcement working inside `next build` (incl. Vercel). Flat-config migration rides the Next 15 upgrade.
   - **Deviation:** `eslint-plugin-boundaries` was installed, then dropped — v7's element patterns match **folders**, not files, and the policy schema changed (`boundaries/dependencies`, selector objects). Re-introduce with the correct v7 schema in PR 3 (per-repo `data/`-ghetto enforcement, per-commit green).
   - **Deviation:** `@types/react` pinned to `^18.3` rather than `^19`: react-spring's types require the legacy global `JSX` namespace, which 18.3 still ships and 19 removed.
   - **Added:** fonts self-hosted via `@fontsource` (removes the Google Fonts egress dependency that fails builds on restricted networks — the plan's "placeholder assets" finding); recharts pinned `^2.15.4` and `react-spring` pinned `^10.0.3` after floating `"latest"` specs drifted to breaking majors.
2. ✅ `fix: remove fake page loader and render-time randomness; delete duplicate modules`
   - **Deviation:** render-time randomness fixes landed in PR 1 instead — re-enabling the build pipeline made them blocking fallout (the `/auth` page crashed static generation via `window.innerWidth` in render).
   - Deleted: `components/ui/page-loading.tsx` (+ layout wiring), duplicate `hooks/use-toast.ts` (consumers now all use `@/components/ui/use-toast`), duplicate `app/components/ThemeSelector.tsx`.
3. `refactor: real EIP-1193 wallet provider + slimmed WalletConnect button + chain registry`
4. `feat: prediction data-source interface + /api/predictions route handler + zod validation`
5. `refactor: migrate data hooks to TanStack Query (kill fake setTimeout APIs)`
6. `refactor: canvas raining-words + particle cleanup across auth/ecosystem/hero`
7. `feat: AI agent pipeline v1 (analyst + verifier + signed outputs + /api/agents/stats)`
8. `feat: EVM multi-chain via wagmi/viem; Solana adapter stub with honest disabled states`
9. `style: design-token sweep (kill hex soup) + image pipeline (next/image, avatar fallbacks)`
10. `docs: README + VISION + ARCHITECTURE + ROADMAP + VERIFICATION; honestify marketing copy`
11. `chore: escalate lint rules to error; add vision contract tests to CI`

---

*Final word: none of this is optional if the "AI-blockchain convergence" story is going to survive contact with a skeptic. A decentralized platform's only moat is verifiability — and right now, the most verifiable thing about this codebase is that its AI is a `<Brain />` icon. Let's make the machine live up to the sticker, or stop selling the sticker.*
