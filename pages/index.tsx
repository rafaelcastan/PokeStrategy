import Head from 'next/head'
import { HomePage } from '../src/components/home/home'
import { PokemonsInfoProvider } from "../src/hooks/PokeContext";
import { PokemonsImgProvider } from "../src/hooks/PokeImages";
import { PokemonStrategyProvider } from "../src/hooks/Strategy";



export default function Home() {
  return (
    
    <PokemonsInfoProvider>
      <PokemonsImgProvider>
    <Head>
      <title>StrategyDex</title>
    </Head>
    <PokemonStrategyProvider>
    <HomePage/>
    </PokemonStrategyProvider>
    </PokemonsImgProvider>
  </PokemonsInfoProvider>
  )
}
