"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { ethers } from "ethers"

// Define supported chains
export enum ChainType {
  ETHEREUM = "ethereum",
  SOLANA = "solana",
  BSC = "bsc",
  POLYGON = "polygon",
}

interface Web3ContextType {
  connected: boolean
  address: string | null
  chainType: ChainType | null
  balance: string
  connectWallet: (chainType: ChainType) => Promise<void>
  disconnectWallet: () => void
  switchChain: (chainType: ChainType) => Promise<void>
  pptBalance: number
}

const Web3Context = createContext<Web3ContextType>({
  connected: false,
  address: null,
  chainType: null,
  balance: "0",
  connectWallet: async () => {},
  disconnectWallet: () => {},
  switchChain: async () => {},
  pptBalance: 0,
})

export const useWeb3 = () => useContext(Web3Context)

export const Web3Provider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [connected, setConnected] = useState(false)
  const [address, setAddress] = useState<string | null>(null)
  const [chainType, setChainType] = useState<ChainType | null>(null)
  const [balance, setBalance] = useState("0")
  const [pptBalance, setPptBalance] = useState(1000) // Mock PPT balance

  // Check if user was previously connected
  useEffect(() => {
    const savedChainType = localStorage.getItem("peculia_chain_type")
    const savedAddress = localStorage.getItem("peculia_address")

    if (savedChainType && savedAddress) {
      setChainType(savedChainType as ChainType)
      setAddress(savedAddress)
      setConnected(true)

      // Fetch initial balance
      fetchBalance(savedAddress, savedChainType as ChainType)
    }

    // Mock PPT decay timer
    const decayInterval = setInterval(() => {
      setPptBalance((prev) => {
        const newBalance = Math.max(0, prev - Math.floor(Math.random() * 3))
        return newBalance
      })
    }, 300000) // Every 5 minutes

    return () => clearInterval(decayInterval)
  }, [])

  // Fetch balance based on chain type
  const fetchBalance = async (addr: string, chain: ChainType) => {
    try {
      let bal = "0"

      switch (chain) {
        case ChainType.ETHEREUM:
        case ChainType.BSC:
        case ChainType.POLYGON:
          // Mock EVM balance fetch
          bal = ethers.utils.formatEther(ethers.utils.parseEther("1.5"))
          break

        case ChainType.SOLANA:
          // Mock Solana balance fetch
          bal = "2.75"
          break
      }

      setBalance(bal)
    } catch (error) {
      console.error("Error fetching balance:", error)
    }
  }

  // Connect wallet based on chain type
  const connectWallet = async (chain: ChainType) => {
    try {
      // Simulate connection delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      let addr = ""

      switch (chain) {
        case ChainType.ETHEREUM:
          addr = "0xEth1...5678"
          break
        case ChainType.BSC:
          addr = "0xBsc1...5678"
          break
        case ChainType.POLYGON:
          addr = "0xPoly...5678"
          break
        case ChainType.SOLANA:
          addr = "solana:community"
          break
      }

      setAddress(addr)
      setChainType(chain)
      setConnected(true)

      // Save connection info
      localStorage.setItem("peculia_chain_type", chain)
      localStorage.setItem("peculia_address", addr)

      // Fetch balance
      fetchBalance(addr, chain)

      return addr
    } catch (error) {
      console.error("Error connecting wallet:", error)
      throw error
    }
  }

  // Disconnect wallet
  const disconnectWallet = () => {
    setConnected(false)
    setAddress(null)
    setChainType(null)
    setBalance("0")

    // Clear saved connection info
    localStorage.removeItem("peculia_chain_type")
    localStorage.removeItem("peculia_address")
  }

  // Switch between chains
  const switchChain = async (chain: ChainType) => {
    if (!address) return

    // Simulate switching delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    setChainType(chain)
    localStorage.setItem("peculia_chain_type", chain)

    // Update address format based on chain
    let newAddress = ""
    switch (chain) {
      case ChainType.ETHEREUM:
        newAddress = "0xEth1...5678"
        break
      case ChainType.BSC:
        newAddress = "0xBsc1...5678"
        break
      case ChainType.POLYGON:
        newAddress = "0xPoly...5678"
        break
      case ChainType.SOLANA:
        newAddress = "solana:community"
        break
    }

    setAddress(newAddress)
    localStorage.setItem("peculia_address", newAddress)

    // Fetch balance for new chain
    fetchBalance(newAddress, chain)
  }

  return (
    <Web3Context.Provider
      value={{
        connected,
        address,
        chainType,
        balance,
        connectWallet,
        disconnectWallet,
        switchChain,
        pptBalance,
      }}
    >
      {children}
    </Web3Context.Provider>
  )
}
