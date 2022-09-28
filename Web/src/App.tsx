import { useState, useEffect } from 'react'
import * as Dialog from "@radix-ui/react-dialog";
import logoImg from "./assets/logo-nlw-esports.svg";

import CreateAdBanner from './components/CreateAdBanner'
import GameBanner from "./components/GameBanner";

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
      const response = await api.get('/games')

      setGames(response.data)
    }

    fetchGames()
  }, [])


  return (
    <div className="max-w-[1300px] mx-auto my-20 flex flex-col items-center">
      <img src={logoImg} alt="" />

      <h1 className="text-6xl text-white font-black mt-20">
        Seu
        <span className="text-transparent bg-nlw-gradient bg-clip-text">
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

        <Dialog.Portal>
          <Dialog.Overlay className='bg-black/60 inset-0 fixed' />

          <Dialog.Content className='fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg'>
            <Dialog.Title className='text-3xl font-black mb-9'>Publique um anúncio</Dialog.Title>

            <Dialog.Content>
              <form>
                <div>
                  <label htmlFor='game' className='block mb-2 font-semibold tracking-tighter'>Qual o game?</label>
                  <input
                    id='game'
                    placeholder='Selecione o game que deseja jogar'
                    className='w-full h-12 pl-3 rounded bg-[#18181B] text-sm mb-4'
                  />
                </div>

                <div>
                  <label htmlFor='name' className='block mb-2 font-semibold tracking-tighter'>Seu nome (ou nickname)</label>
                  <input
                    id='name'
                    placeholder='Como te chamam dentro do game'
                    className='w-full h-12 pl-3 rounded bg-[#18181B] text-sm mb-4'
                  />
                </div>

                <div className='flex justify-between'>
                  <div>
                    <label htmlFor='yearsPlaying' className='block mb-2 font-semibold tracking-tighter'>Joga há quantos anos?</label>
                    <input
                      id='yearsPlaying'
                      placeholder='Tudo bem ser ZERO'
                      className='w-44 h-12 pl-3 rounded bg-[#18181B] text-sm mb-4'
                    />
                  </div>

                  <div>
                    <label htmlFor='discord' className='block mb-2 font-semibold tracking-tighter'>Qual seu discord?</label>
                    <input
                      id='discord'
                      placeholder='Usuário#0000'
                      className='w-44 h-12 pl-3 rounded bg-[#18181B] text-sm mb-4'
                    />
                  </div>
                </div>

                <div className='flex justify-between'>
                  <div>
                    <label htmlFor='weekDays' className='block mb-2 font-semibold tracking-tighter'>Quando costuma jogar?</label>
                    <div className='flex gap-1'>
                      <button type='button' className='w-9 h-10 leading-10 bg-[#18181B] rounded'>S</button>
                      <button type='button' className='w-9 h-10 leading-10 bg-[#18181B] rounded'>T</button>
                      <button type='button' className='w-9 h-10 leading-10 bg-[#18181B] rounded'>Q</button>
                      <button type='button' className='w-9 h-10 leading-10 bg-[#18181B] rounded'>Q</button>
                      <button type='button' className='w-9 h-10 leading-10 bg-[#18181B] rounded'>S</button>
                    </div>
                  </div>

                  <div>
                    <label htmlFor='hourStart' className='block mb-2 font-semibold tracking-tighter'>Qual horário do dia?</label>
                    <div className='flex gap-2'>
                      <input
                        id='hourStart'
                        placeholder='De'
                        className='w-20 h-10 leading-10 bg-[#18181B] rounded pl-3'
                      />

                      <input
                        id='hourEnd'
                        placeholder='Até'
                        className='w-20 h-10 leading-10 bg-[#18181B] rounded pl-3'
                      />
                    </div>
                  </div>
                </div>

                <div className='mt-5 flex items-center'>
                  <input
                    type='checkbox'
                    className='bg-[#18181B] mr-2'
                  />
                  <label htmlFor='chatDeVoz' className='text-sm'>Costumo me conectar ao chat de voz</label>
                </div>

                <div>

                </div>
              </form>
            </Dialog.Content>
          </Dialog.Content>
        </Dialog.Portal>

      </Dialog.Root>
    </div>
  );
}


