import express from 'express'
import cors from 'cors'
import {PrismaClient} from '@prisma/client'
import { convertHourStringToMinutes } from './utils/convert-hour-string-to-minutes'
import { convertMinutesToHourString } from './utils/convert-minute-to-hour-string'


const app = express()
app.use(express.json())
app.use(cors())
const prisma = new PrismaClient()
const port = 3333



// Listagem de games com contagem de anúncios
app.get('/games', async (req, res) => {
    const games = await prisma.game.findMany({
        include: {
            _count: {
                select: {
                    ads: true
                }
            }
        }
    })

    return res.json(games)
})


// Listagem de anúncios por game (game específico)
app.get('/games/:id/ads', async (req, res) => {
    const gameId = req.params.id

    const ads = await prisma.ad.findMany({
        select: {
            id: true,
            name: true,
            weekDays: true,
            yearsPlaying: true,
            hourStart: true,
            hourEnd: true,
            useVoiceChannel: true,
            createdAt: true,

        },
        where: {
            gameId: gameId
        },
        orderBy: {
            createdAt: 'desc'
        }
    })

    return res.json(ads.map(ad => {
        return {
            ...ad,
            weekDays: ad.weekDays.split(','),
            hourStart: convertMinutesToHourString(ad.hourStart),
            hourEnd: convertMinutesToHourString(ad.hourEnd)
        }
    }))
})


// Buscar o discord pelo ID do anúncio
app.get('/ads/:id/discord', async (req, res) => {
    const adId = req.params.id

    const ad = await prisma.ad.findUniqueOrThrow({
        select: {
            discord: true
        },

        where: {
            id: adId,
        }
    })

    return res.json({
        discord: ad.discord
    })
})


// Criar novo anúncio 
app.post('/games/:id/ads', async (req, res) => {
    const gameId = req.params.id
    const body: any = req.body


    const ad = await prisma.ad.create({
        data: {
            gameId,
            name: body.name,
            weekDays: body.weekDays.join(','),
            discord: body.discord,
            yearsPlaying: body.yearsPlaying,
            hourStart: convertHourStringToMinutes(body.yoursStart),
            hourEnd: convertHourStringToMinutes(body.hoursEnd),
            useVoiceChannel: body.useVoiceChannel,
            createdAt: body.createdAt,
        }
    })


    return res.status(201).json(ad)
})





app.listen(port, () => {
    console.log(`Server iniciado na porta: ${port}`)
})