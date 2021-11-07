import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Head from 'next/head'

import Content from '../components/Content'
import Loading from '../components/Loading'

import { getProgram, baseAccount, SystemProgram } from '../utils/web3'

import type { NextPage } from 'next'

const Home: NextPage = () => {
  const [noPhantom, setNoPhantom] = useState(false)
  const [userRejected, setUserRejected] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [walletAddress, setWalletAddress] = useState({
    loading: false,
    value: '',
  })
  const [gifList, setGifList] = useState<{
    loading: boolean
    value: string[] | null
  }>({
    loading: false,
    value: null,
  })

  const checkIfWalletIsConnected = async () => {
    setWalletAddress({ loading: true, value: '' })

    try {
      const { solana } = window

      if (solana && solana.isPhantom) {
        console.log('Phantom wallet found.')

        const response = await solana.connect()
        setWalletAddress({ loading: false, value: String(response.publicKey) })
      } else {
        console.error('Solana object cannot be found. Get a Phantom wallet.')
        setNoPhantom(true)
      }
    } catch (err) {
      console.error(err)
      if ((err as any).code === 4001) {
        setUserRejected(true)
      }
    }
  }

  const connectWallet = async () => {
    setWalletAddress({ loading: true, value: '' })

    try {
      const { solana } = window

      if (solana) {
        const response = await solana.connect()
        console.log(`Connected with public-key ${String(response.publicKey)}`)
        setWalletAddress({ loading: false, value: String(response.publicKey) })
      }
    } catch (err) {
      console.error('Wallet connection request error:', err)
    }
  }

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const getGifList = async () => {
    setGifList({ loading: true, value: null })
    try {
      const { program } = getProgram()
      const account = await program.account.baseAccount.fetch(
        baseAccount.publicKey
      )
      setGifList({
        loading: false,
        value: account.gifList.map(
          (gif: { gifLink: string; userAddress: any }) => gif.gifLink
        ),
      })
      setInputValue('')
    } catch (err) {
      console.error('Get GIF list error', err)
    }
  }

  const createGifAccount = async () => {
    try {
      const { publicKey, program } = getProgram()
      await program.rpc.startStuffOff({
        accounts: {
          baseAccount: baseAccount.publicKey,
          user: publicKey,
          systemProgram: SystemProgram.programId,
        },
        signers: [baseAccount],
      })
      await getGifList()
    } catch (err) {
      console.error('Create BaseAccount error:', err)
    }
  }

  const sendGif = async () => {
    if (inputValue.length === 0) return

    try {
      const { program } = getProgram()
      await program.rpc.addGif(inputValue, {
        accounts: {
          baseAccount: baseAccount.publicKey,
        },
      })
      console.log('GIF sent! GIF link:', inputValue)
      await getGifList()
    } catch (err) {
      console.error('Send GIF error:', err)
    }
  }

  useEffect(() => {
    setIsMounted(true)
    checkIfWalletIsConnected()
  }, [])

  useEffect(() => {
    if (!walletAddress.loading && walletAddress.value !== '') {
      getGifList()
    }
  }, [walletAddress])

  return (
    <>
      <Head>
        <title>Solagif - agallio.xyz</title>
      </Head>
      <div className="flex flex-col items-center justify-center my-10 sm:my-16">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-4xl italic font-black">Solagif</h1>
          <p className="mt-2 text-lg">Store GIF inside your Solana wallet!</p>
          <p className="text-gray-600 text-xs sm:text-base">
            Made by{' '}
            <a
              className="hover:underline"
              href="https://agallio.xyz/"
              target="_blank"
              rel="noopener noreferrer"
            >
              agallio.xyz
            </a>{' '}
            — Powered by{' '}
            <a
              className="hover:underline"
              href="https://twitter.com/_buildspace"
              target="_blank"
              rel="noopener noreferrer"
            >
              @_buildspace
            </a>
          </p>
        </div>

        {isMounted ? (
          noPhantom ? (
            <div className="flex flex-col items-center justify-center mt-8">
              <Image
                src="/phantom.png"
                alt="phantom-logo"
                width={50}
                height={50}
              />
              <p className="mt-2 text-lg font-semibold">
                Phantom Wallet is required!
              </p>
              <a
                className="hover:underline"
                href="https://phantom.app/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Install Here →
              </a>
            </div>
          ) : userRejected ? (
            <div className="flex flex-col items-center justify-center mt-8">
              <p>
                🙁 We cannot connect to your wallet. Retry by{' '}
                <a
                  className="underline"
                  role="button"
                  onClick={() => window.location.reload()}
                >
                  refreshing
                </a>{' '}
                the page.
              </p>
            </div>
          ) : (
            <Content
              isMounted={isMounted}
              walletAddress={walletAddress}
              inputValue={inputValue}
              gifList={gifList}
              onInputChange={onInputChange}
              connectWallet={connectWallet}
              createGifAccount={createGifAccount}
              sendGif={sendGif}
            />
          )
        ) : (
          <Loading text="Loading..." />
        )}
      </div>
    </>
  )
}

export default Home
