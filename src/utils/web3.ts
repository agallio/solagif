import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js'
import { Idl, Program, Provider, web3 } from '@project-serum/anchor'

import idl from '../constants/idl.json'
import keypair from '../constants/keypair.json'

const { SystemProgram, Keypair } = web3
const programID = new PublicKey(idl.metadata.address)
const keypairArr = Object.values(keypair._keypair.secretKey)
const secret = new Uint8Array(keypairArr)
const baseAccount = Keypair.fromSecretKey(secret)
const network = clusterApiUrl('devnet')

const getProvider = () => {
  const connection = new Connection(network, 'processed')
  const provider = new Provider(connection, window.solana, {
    preflightCommitment: 'processed',
  })
  return provider
}

const getProgram = () => {
  const provider = getProvider()
  const program = new Program(idl as Idl, programID, provider)
  return { publicKey: provider.wallet.publicKey, program }
}

export { SystemProgram, getProgram, baseAccount }
