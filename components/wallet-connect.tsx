"use client"

import { useState } from "react"
import { Wallet, ChevronDown, LogOut } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useWeb3 } from "@/components/providers/web3-provider"
import { ChainType } from "@/components/providers/web3-provider"

export default function WalletConnect() {
  const { connected, address, chainType, balance, connectWallet, disconnectWallet, switchChain } = useWeb3()
  const [isConnecting, setIsConnecting] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const handleConnect = async (chain: ChainType) => {
    try {
      setIsConnecting(true)
      await connectWallet(chain)
    } catch (error) {
      console.error("Failed to connect wallet:", error)
    } finally {
      setIsConnecting(false)
      setIsDropdownOpen(false)
    }
  }

  const formatAddress = (addr: string | null) => {
    if (!addr) return ""
    if (addr.startsWith("solana:")) return addr
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`
  }

  const getChainName = (chain: ChainType | null) => {
    switch (chain) {
      case ChainType.ETHEREUM:
        return "Ethereum"
      case ChainType.SOLANA:
        return "Solana"
      case ChainType.BSC:
        return "BSC"
      case ChainType.POLYGON:
        return "Polygon"
      default:
        return "Unknown"
    }
  }

  const getChainIcon = (chain: ChainType | null) => {
    switch (chain) {
      case ChainType.ETHEREUM:
        return "Ξ"
      case ChainType.SOLANA:
        return "◎"
      case ChainType.BSC:
        return "B"
      case ChainType.POLYGON:
        return "P"
      default:
        return "?"
    }
  }

  const getChainColor = (chain: ChainType | null) => {
    switch (chain) {
      case ChainType.ETHEREUM:
        return "bg-[#3b82f6]/10 text-[#3b82f6]"
      case ChainType.SOLANA:
        return "bg-[#8b5cf6]/10 text-[#8b5cf6]"
      case ChainType.BSC:
        return "bg-[#f59e0b]/10 text-[#f59e0b]"
      case ChainType.POLYGON:
        return "bg-[#10b981]/10 text-[#10b981]"
      default:
        return "bg-[#a0a0a0]/10 text-[#a0a0a0]"
    }
  }

  const handleSwitchChain = async (chain: ChainType) => {
    await switchChain(chain)
    setIsDropdownOpen(false)
  }

  if (connected && address) {
    return (
      <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="border-[#1e1e1e] text-white/80 hover:bg-[#1a1a1a] transition-all duration-300"
          >
            <motion.div
              className={`w-5 h-5 rounded-full ${getChainColor(chainType)} flex items-center justify-center mr-2`}
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              {getChainIcon(chainType)}
            </motion.div>
            <span>{formatAddress(address)}</span>
            <motion.div animate={{ rotate: isDropdownOpen ? 180 : 0 }} transition={{ duration: 0.2 }} className="ml-2">
              <ChevronDown className="h-4 w-4" />
            </motion.div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-[#0a0a0a] border-[#1e1e1e] w-56">
          <DropdownMenuLabel className="text-white/70">
            <div className="flex flex-col">
              <span>{getChainName(chainType)}</span>
              <span className="text-xs font-normal text-white/50">Balance: {balance}</span>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-[#1e1e1e]" />
          <DropdownMenuLabel className="text-white/70">Switch Chain</DropdownMenuLabel>
          <DropdownMenuItem
            className="text-white/70 cursor-pointer flex items-center hover:bg-[#1a1a1a]"
            onClick={() => handleSwitchChain(ChainType.ETHEREUM)}
          >
            <motion.div
              className="w-4 h-4 rounded-full bg-[#3b82f6]/10 text-[#3b82f6] flex items-center justify-center mr-2"
              whileHover={{ scale: 1.1 }}
            >
              Ξ
            </motion.div>
            Ethereum
            {chainType === ChainType.ETHEREUM && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="ml-auto h-2 w-2 rounded-full bg-[#10b981]"
              />
            )}
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-white/70 cursor-pointer flex items-center hover:bg-[#1a1a1a]"
            onClick={() => handleSwitchChain(ChainType.SOLANA)}
          >
            <motion.div
              className="w-4 h-4 rounded-full bg-[#8b5cf6]/10 text-[#8b5cf6] flex items-center justify-center mr-2"
              whileHover={{ scale: 1.1 }}
            >
              ◎
            </motion.div>
            Solana
            {chainType === ChainType.SOLANA && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="ml-auto h-2 w-2 rounded-full bg-[#10b981]"
              />
            )}
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-white/70 cursor-pointer flex items-center hover:bg-[#1a1a1a]"
            onClick={() => handleSwitchChain(ChainType.BSC)}
          >
            <motion.div
              className="w-4 h-4 rounded-full bg-[#f59e0b]/10 text-[#f59e0b] flex items-center justify-center mr-2"
              whileHover={{ scale: 1.1 }}
            >
              B
            </motion.div>
            BSC
            {chainType === ChainType.BSC && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="ml-auto h-2 w-2 rounded-full bg-[#10b981]"
              />
            )}
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-white/70 cursor-pointer flex items-center hover:bg-[#1a1a1a]"
            onClick={() => handleSwitchChain(ChainType.POLYGON)}
          >
            <motion.div
              className="w-4 h-4 rounded-full bg-[#10b981]/10 text-[#10b981] flex items-center justify-center mr-2"
              whileHover={{ scale: 1.1 }}
            >
              P
            </motion.div>
            Polygon
            {chainType === ChainType.POLYGON && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="ml-auto h-2 w-2 rounded-full bg-[#10b981]"
              />
            )}
          </DropdownMenuItem>
          <DropdownMenuSeparator className="bg-[#1e1e1e]" />
          <DropdownMenuItem
            className="text-white/70 cursor-pointer hover:bg-[#1a1a1a]"
            onClick={() => {
              disconnectWallet()
              setIsDropdownOpen(false)
            }}
          >
            <LogOut className="h-4 w-4 mr-2" />
            Disconnect
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  return (
    <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="border-[#1e1e1e] text-white/80 hover:bg-[#1a1a1a] transition-all duration-300"
          disabled={isConnecting}
        >
          {isConnecting ? (
            <div className="flex items-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                className="mr-2"
              >
                <Wallet className="h-4 w-4" />
              </motion.div>
              Connecting...
            </div>
          ) : (
            <>
              <Wallet className="h-4 w-4 mr-2" />
              Connect Wallet
              <motion.div
                animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="ml-2"
              >
                <ChevronDown className="h-4 w-4" />
              </motion.div>
            </>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-[#0a0a0a]/95 backdrop-blur-md border-[#1e1e1e] w-56">
        <DropdownMenuLabel className="text-white/70">Select Chain</DropdownMenuLabel>
        <DropdownMenuItem
          className="text-white/70 cursor-pointer flex items-center hover:bg-[#1a1a1a]"
          onClick={() => handleConnect(ChainType.ETHEREUM)}
        >
          <motion.div
            className="w-4 h-4 rounded-full bg-[#3b82f6]/10 text-[#3b82f6] flex items-center justify-center mr-2"
            whileHover={{ scale: 1.1 }}
          >
            Ξ
          </motion.div>
          Ethereum
        </DropdownMenuItem>
        <DropdownMenuItem
          className="text-white/70 cursor-pointer flex items-center hover:bg-[#1a1a1a]"
          onClick={() => handleConnect(ChainType.SOLANA)}
        >
          <motion.div
            className="w-4 h-4 rounded-full bg-[#8b5cf6]/10 text-[#8b5cf6] flex items-center justify-center mr-2"
            whileHover={{ scale: 1.1 }}
          >
            ◎
          </motion.div>
          Solana
        </DropdownMenuItem>
        <DropdownMenuItem
          className="text-white/70 cursor-pointer flex items-center hover:bg-[#1a1a1a]"
          onClick={() => handleConnect(ChainType.BSC)}
        >
          <motion.div
            className="w-4 h-4 rounded-full bg-[#f59e0b]/10 text-[#f59e0b] flex items-center justify-center mr-2"
            whileHover={{ scale: 1.1 }}
          >
            B
          </motion.div>
          BSC
        </DropdownMenuItem>
        <DropdownMenuItem
          className="text-white/70 cursor-pointer flex items-center hover:bg-[#1a1a1a]"
          onClick={() => handleConnect(ChainType.POLYGON)}
        >
          <motion.div
            className="w-4 h-4 rounded-full bg-[#10b981]/10 text-[#10b981] flex items-center justify-center mr-2"
            whileHover={{ scale: 1.1 }}
          >
            P
          </motion.div>
          Polygon
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
