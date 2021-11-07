import React from 'react'
import { useMediaPredicate } from 'react-media-hook'

import Loading from './Loading'
import CustomTooltip from './CustomTooltip'
import CustomAlert from './CustomAlert'
import SpinIcon from './SpinIcon'
import CustomButton from './CustomButton'

interface ContentProps {
  isMounted: boolean
  walletAddress: { loading: boolean; value: string }
  inputValue: string
  gifList: { loading: boolean; value: string[] | null }
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  connectWallet: () => void
  createGifAccount: () => void
  sendGif: () => void
}

export default function Content({
  isMounted,
  walletAddress,
  inputValue,
  gifList,
  onInputChange,
  connectWallet,
  createGifAccount,
  sendGif,
}: ContentProps) {
  const mediaDesktop = useMediaPredicate('(min-width: 1024px)')

  return (
    <div className="flex flex-col items-center justify-center mt-8">
      {walletAddress.loading ? (
        <Loading text="Loading your wallet..." />
      ) : isMounted ? (
        mediaDesktop ? (
          <CustomTooltip
            trigger={
              walletAddress.value.length > 0 ? (
                <p className="text-lg">
                  💰 →{' '}
                  {`${walletAddress.value.slice(
                    0,
                    4
                  )}...${walletAddress.value.slice(
                    walletAddress.value.length - 4
                  )}`}
                </p>
              ) : null
            }
            content={
              <div className="flex flex-col p-4 items-center justify-center bg-white shadow-lg rounded-lg border border-grey-400">
                <p className="text-lg font-semibold">
                  💰 Your Solana Wallet Address:
                </p>
                <p>{walletAddress.value}</p>
              </div>
            }
          />
        ) : (
          <CustomAlert
            trigger={
              walletAddress.value.length > 0 ? (
                <p className="text-lg">
                  💰 →{' '}
                  {`${walletAddress.value.slice(
                    0,
                    4
                  )}...${walletAddress.value.slice(
                    walletAddress.value.length - 4
                  )}`}
                </p>
              ) : null
            }
            title={`💰 Your Solana Wallet Address:`}
            description={
              <div className="w-full bg-gray-300 p-1 rounded">
                <pre className="overflow-auto">{walletAddress.value}</pre>
              </div>
            }
            action={
              <div className="flex flex-col">
                <button className="border rounded py-1 mt-2 border-gray-300">
                  OK!
                </button>
              </div>
            }
          />
        )
      ) : null}

      {walletAddress.value.length === 0 ? (
        <CustomButton
          onClick={connectWallet}
          text={`Connect to Solana Wallet`}
        />
      ) : gifList === null ? (
        <CustomButton
          onClick={createGifAccount}
          text={`Create One-Time Initialization Account!`}
        />
      ) : (
        <div className="flex w-11/12 mt-4 sm:w-[400px]">
          <input
            type="text"
            className="w-full mt-1 block rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            placeholder="Paste your GIF link here!"
            value={inputValue}
            onChange={onInputChange}
            onKeyUp={(e) => {
              if (e.keyCode === 13) {
                e.preventDefault()
                sendGif()
              }
            }}
          />
        </div>
      )}

      <div className="my-6 mx-4 sm:mx-20">
        {gifList.loading ? (
          <Loading text="Loading your GIFs..." />
        ) : (
          <div className="masonry before:box-inherit after:box-inherit cursor-default">
            {gifList.value?.map((gif, index) => (
              // eslint-disable-next-line
              <img
                key={index}
                src={gif}
                alt={`gif-${index}`}
                className="break-inside rounded-lg mb-6 shadow-lg"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
