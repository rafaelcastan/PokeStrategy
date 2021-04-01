import Head from 'next/head'
import { HomePage } from '../components/home/home'
import { PokemonsInfoProvider } from "../hooks/PokeContext";
import { PokemonsImgProvider } from "../hooks/PokeImages";



export default function Home() {
  return (
    <PokemonsInfoProvider>
      <PokemonsImgProvider>
    <Head>
      <title>PokeStrategy</title>
    </Head>
    <HomePage/>
    </PokemonsImgProvider>
  </PokemonsInfoProvider>
  )
}
