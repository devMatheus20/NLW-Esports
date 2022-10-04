import { useState, useEffect, FormEvent } from 'react'
import * as Dialog from "@radix-ui/react-dialog";
import * as Checkbox from '@radix-ui/react-checkbox';
import * as ToggleGroup from '@radix-ui/react-toggle-group';

import { api } from '../../services/api';

import { GameController, Check } from 'phosphor-react';

import Input from '../Form/Input';
import Label from '../Form/Label';



interface Game {
    id: string;
    title: string;
}


export default function CreateAdModal() {

    const [games, setGames] = useState<Game[]>([])
    const [weekDay, setWeekDay] = useState<string[]>([])
    const [useVoiceChannel, setUseVoiceChannel] = useState<boolean>(false)

    useEffect(() => {
        async function fetchGames() {
            await api.get('/games').then(response => {
                setGames(response.data)
            })
        }

        fetchGames()
    }, [])

    async function handleCreateAd(e: FormEvent) {
        e.preventDefault()

        const formData = new FormData(e.target as HTMLFormElement)

        const data = Object.fromEntries(formData)

        if (!data.name) {
            return;
        }

        console.log(data)


        try {
            await api.post(`games/${data.game}/ads`, {
                name: data.name,
                yearsPlaying: Number(data.yearsPlaying),
                discord: data.discord,
                weekDays: weekDay.map(Number),
                hourStart: data.hourStart,
                hourEnd: data.hourEnd,
                useVoiceChannel: useVoiceChannel,
            })

            alert("Anúncio criado com sucesso!")
        } catch (error) {
            alert("Ops, algo deu errado! " + error)
        } 
    }

    return (
        <Dialog.Portal>
            <Dialog.Overlay className='bg-black/60 inset-0 fixed' />

            <Dialog.Content className='fixed bg-[#2A2634] py-10 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg'>
                <Dialog.Title className='text-3xl font-black mb-9'>Publique um anúncio</Dialog.Title>

                <form onSubmit={handleCreateAd} className='mt-8 flex flex-col gap-4'>
                    <div className='flex flex-col gap-2'>
                        <Label htmlFor="game">Qual o game?</Label>
                        <select
                            id="game"
                            name="game"
                            className='px-4 py-3 rounded bg-[#18181B] text-sm placeholder:text-zinc-500'
                            defaultValue=""
                        >
                            <option
                                disabled
                            >
                                Selecione o game que deseja jogar
                            </option>

                            {games.map(game =>
                                <option
                                    key={game.id}
                                    value={game.id}
                                >
                                    {game.title}
                                </option>
                            )}
                        </select>
                    </div>

                    <div className='flex flex-col gap-2'>
                        <Label htmlFor='name'>Seu nome (ou nickname)</Label>
                        <Input
                            name="name"
                            id='name'
                            placeholder='Como te chamam dentro do game'
                        />
                    </div>

                    <div className='grid grid-cols-2 gap-6'>
                        <div className='flex flex-col gap-2'>
                            <Label htmlFor='yearsPlaying'>Joga há quantos anos?</Label>
                            <Input
                                name="yearsPlaying"
                                id='yearsPlaying'
                                placeholder='Tudo bem ser ZERO'
                            />
                        </div>

                        <div className='flex flex-col gap-2'>
                            <Label htmlFor='discord'>Qual seu discord?</Label>
                            <Input
                                name="discord"
                                id='discord'
                                placeholder='Usuário#0000'
                            />
                        </div>
                    </div>

                    <div className='flex gap-6'>
                        <div className='flex flex-col gap-2'>
                            <Label htmlFor='weekDays'>Quando costuma jogar?</Label>
                            <ToggleGroup.Root
                                id="weekDays"
                                type="multiple"
                                className='grid grid-cols-4 gap-2'
                                value={weekDay}
                                onValueChange={setWeekDay}
                            >
                                <ToggleGroup.Item
                                    value='0'
                                    title='Domingo'
                                    className={`w-8 h-8 text-center rounded ${weekDay.includes("0") ? "bg-violet-500" : "bg-zinc-900"
                                        } transition hover:bg-violet-600`}
                                >
                                    D
                                </ToggleGroup.Item>
                                <ToggleGroup.Item
                                    value='1'
                                    title='Segunda'
                                    className={`w-8 h-8 text-center rounded ${weekDay.includes("1") ? "bg-violet-500" : "bg-zinc-900"
                                        } transition hover:bg-violet-600`}
                                >
                                    S
                                </ToggleGroup.Item>
                                <ToggleGroup.Item
                                    value='2'
                                    title='Terça'
                                    className={`w-8 h-8 text-center rounded ${weekDay.includes("2") ? "bg-violet-500" : "bg-zinc-900"
                                        } transition hover:bg-violet-600`}
                                >
                                    T
                                </ToggleGroup.Item>
                                <ToggleGroup.Item
                                    value='3'
                                    title='Quarta'
                                    className={`w-8 h-8 text-center rounded ${weekDay.includes("3") ? "bg-violet-500" : "bg-zinc-900"
                                        } transition hover:bg-violet-600`}
                                >
                                    Q
                                </ToggleGroup.Item>
                                <ToggleGroup.Item
                                    value='4'
                                    title='Quinta'
                                    className={`w-8 h-8 text-center rounded ${weekDay.includes("4") ? "bg-violet-500" : "bg-zinc-900"
                                        } transition hover:bg-violet-600`}
                                >
                                    Q
                                </ToggleGroup.Item>
                                <ToggleGroup.Item
                                    value='5'
                                    title='Sexta'
                                    className={`w-8 h-8 text-center rounded ${weekDay.includes("5") ? "bg-violet-500" : "bg-zinc-900"
                                        } transition hover:bg-violet-600`}
                                >
                                    S
                                </ToggleGroup.Item>
                                <ToggleGroup.Item
                                    value='6'
                                    title='Sábado'
                                    className={`w-8 h-8 text-center rounded ${weekDay.includes("6") ? "bg-violet-500" : "bg-zinc-900"
                                        } transition hover:bg-violet-600`}
                                >
                                    S
                                </ToggleGroup.Item>
                            </ToggleGroup.Root>
                        </div>

                        <div className='flex flex-col gap-2 flex-1'>
                            <Label htmlFor='hourStart'>Qual horário do dia?</Label>
                            <div className='grid grid-cols-2 gap-2'>
                                <Input
                                    name="hourStart"
                                    id='hourStart'
                                    placeholder='De'
                                    type='time'
                                />

                                <Input
                                    name="hourEnd"
                                    id='hourEnd'
                                    placeholder='Até'
                                    type='time'
                                />
                            </div>
                        </div>
                    </div>

                    <label className='mt-2 flex items-center text-sm'>
                        <Checkbox.Root
                            className="flex items-center p-1 w-6 h-6 rounded bg-zinc-900 mr-2"
                            checked={useVoiceChannel}
                            onCheckedChange={(checked: boolean) =>
                                checked === true
                                    ? setUseVoiceChannel(true)
                                    : setUseVoiceChannel(false)
                            }
                        >
                            <Checkbox.Indicator>
                                <Check className="w-4 h-4 text-emerald-400" />
                            </Checkbox.Indicator>
                        </Checkbox.Root>
                        Costumo me conectar ao chat de voz
                    </label>

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
                            <GameController size={24} />
                            Encontrar duo
                        </button>
                    </footer>
                </form>

            </Dialog.Content>
        </Dialog.Portal>
    )
}