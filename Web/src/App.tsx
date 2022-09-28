import { useState, useEffect } from 'react'
import * as Dialog from "@radix-ui/react-dialog";
import logoImg from "./assets/logo-nlw-esports.svg";

import { GameController } from 'phosphor-react';

import CreateAdBanner from './components/CreateAdBanner'
import GameBanner from "./components/GameBanner";
import Input from './components/Form/Input';

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

          <Dialog.Content className='fixed bg-[#2A2634] py-10 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg'>
            <Dialog.Title className='text-3xl font-black mb-9'>Publique um anúncio</Dialog.Title>

            <form className='mt-8 flex flex-col gap-4'>
              <div className='flex flex-col gap-2'>
                <label htmlFor='game' className='font-semibold tracking-tighter'>Qual o game?</label>
                <Input id='game' placeholder='Selecione o game que deseja jogar' />
              </div>

              <div className='flex flex-col gap-2'>
                <label htmlFor='name' className='font-semibold tracking-tighter'>Seu nome (ou nickname)</label>
                <Input
                  id='name'
                  placeholder='Como te chamam dentro do game'
                />
              </div>

              <div className='grid grid-cols-2 gap-6'>
                <div className='flex flex-col gap-2'>
                  <label htmlFor='yearsPlaying' className='font-semibold tracking-tighter'>Joga há quantos anos?</label>
                  <Input
                    id='yearsPlaying'
                    placeholder='Tudo bem ser ZERO'
                  />
                </div>

                <div className='flex flex-col gap-2'>
                  <label htmlFor='discord' className='font-semibold tracking-tighter'>Qual seu discord?</label>
                  <Input
                    id='discord'
                    placeholder='Usuário#0000'
                  />
                </div>
              </div>

              <div className='flex gap-6'>
                <div className='flex flex-col gap-2'>
                  <label htmlFor='weekDays' className='font-semibold tracking-tighter'>Quando costuma jogar?</label>
                  <div className='grid grid-cols-4 gap-2'>
                    <button
                      title='Domingo'
                      className='w-8 h-8 bg-[#18181B] rounded'
                    >
                      S
                    </button>
                    <button
                      title='Segunda'
                      className='w-8 h-8 bg-[#18181B] rounded'
                    >
                      S
                    </button>
                    <button
                      title='Terça'
                      className='w-8 h-8 bg-[#18181B] rounded'
                    >
                      T
                    </button>
                    <button
                      title='Quarta'
                      className='w-8 h-8 bg-[#18181B] rounded'
                    >
                      Q
                    </button>
                    <button
                      title='Quinta'
                      className='w-8 h-8 bg-[#18181B] rounded'
                    >
                      Q
                    </button>
                    <button
                      title='Sexta'
                      className='w-8 h-8 bg-[#18181B] rounded'
                    >
                      S
                    </button>
                    <button
                      title='Sábado'
                      className='w-8 h-8 bg-[#18181B] rounded'
                    >
                      S
                    </button>
                  </div>
                </div>

                <div className='flex flex-col gap-2 flex-1'>
                  <label htmlFor='hourStart' className='font-semibold tracking-tighter'>Qual horário do dia?</label>
                  <div className='grid grid-cols-2 gap-2'>
                    <Input
                      id='hourStart'
                      placeholder='De'
                      type='time'
                    />

                    <Input
                      id='hourEnd'
                      placeholder='Até'
                      type='time'
                    />
                  </div>
                </div>
              </div>

              <div className='mt-3 flex items-center'>
                <input
                  type='checkbox'
                  className='bg-[#18181B] mr-2'
                />
                <label htmlFor='chatDeVoz' className='text-sm'>Costumo me conectar ao chat de voz</label>
              </div>

              <footer className='mt-5 flex justify-end gap-3'>
                <Dialog.Close
                    type='button'
                    className='bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600'
                  >
                    Cancelar
                </Dialog.Close>

                <button
                  type='submit'
                  className='bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600'
                >
                  <GameController size={24}/>
                  Encontrar duo
                </button>
              </footer>
            </form>

          </Dialog.Content>
        </Dialog.Portal>

      </Dialog.Root>
    </div>
  );
}


