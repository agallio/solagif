import type { Wallet } from '@project-serum/anchor'

interface Solana extends Wallet {
  isPhantom: boolean
  connect: any
}

declare global {
  interface Window {
    solana: Solana
  }
}
