import { useState, useEffect } from 'react'
import logoImg from "./assets/logo-nlw-esports.svg";

import GameBanner from "./components/GameBanner";
import CreateAdBanner from './components/CreateAdBanner'
import CreateAdModal from './components/CreateAdModal';

import * as Dialog from "@radix-ui/react-dialog";


import { api } from './services/api';

import "./styles/main.css";


interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number
  }
}



export default function App() {

  const [games, setGames] = useState<Game[]>([])

  useEffect(() => {
    async function fetchGames() {
      await api.get('/games').then(response => {
        setGames(response.data)
      })
    }

    fetchGames()
  }, [])


  return (
    <div className="max-w-[1300px] mx-auto my-20 flex flex-col items-center">
      <img src={logoImg} alt="" />

      <h1 className="text-6xl text-white font-black mt-20">
        Seu
        <span className="text-transparent bg-nlw-gradient bg-clip-text mx-3">
          duo
        </span>
        está aqui.
      </h1>

      <div className="grid grid-cols-6 gap-6 mt-16">

        {games.map(game =>
          <GameBanner
            key={game.id}
            title={game.title}
            adsCount={game._count.ads}
            bannerUrl={game.bannerUrl}
          />
        )}

      </div>


      <Dialog.Root>
        <CreateAdBanner />

        <CreateAdModal />
      </Dialog.Root>
    </div>
  );
}


