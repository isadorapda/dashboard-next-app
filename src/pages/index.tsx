import Head from 'next/head'
import Image from 'next/image'
import { Roboto } from 'next/font/google'

const roboto = Roboto({ weight: [] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Dashboard Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main></main>
    </>
  )
}
