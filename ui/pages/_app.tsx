import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {useState, useEffect, SetStateAction} from "react"
import Client from "./api/Client"

const wallet = "9i5FPuvo3vYKCTaDQkk7vUDrvnfXHW6GpkWxSKrVFWGmBtzkQWg"

function MyApp({Component, pageProps}: AppProps) {
  const [feed, setFeed] = useState([])
  useEffect(() => {
    fetchData()
    const interval = setInterval(() => {
      fetchData()
    }, 10000)
    return () => clearInterval(interval)
  }, [])
  console.log(wallet)

  async function fetchData() {
    console.log("fetching data")
    console.log("wallet is", wallet)
    await Client.getFeed(wallet, (feed: { tweets: SetStateAction<never[]> } | undefined) => {
      console.log(feed)
      if (feed !== undefined) {
        setFeed(feed.tweets)
      }
    })
  }
  return <Component {...pageProps} />
}

export default MyApp
