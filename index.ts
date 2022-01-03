import * as Dotenv from 'dotenv'
import { Telegraf } from 'telegraf'
import express, { Request, Response } from 'express'
import enforce from 'express-sslify'
import { convertRisibankStickersToInlineResults } from "./src/utils/functions";
import RisibankClient from "./src/services/RisibankClient";
import { ExtraAnswerInlineQuery } from 'telegraf/typings/telegram-types';

Dotenv.config()

const bot = new Telegraf(process.env.BOT_TOKEN)

const DEFAULT_EXTRA_OPTIONS: ExtraAnswerInlineQuery = {
  cache_time: 0
}

bot.on("inline_query", async (ctx) => {
  try {
    const search = ctx.update.inline_query.query
    const results = await RisibankClient.search(search)
    if (results.stickers) {
      const stickers = convertRisibankStickersToInlineResults(results.stickers).slice(0,30)
      return ctx.answerInlineQuery(stickers, DEFAULT_EXTRA_OPTIONS)
    } else {
      return ctx.answerInlineQuery([], DEFAULT_EXTRA_OPTIONS)
    }
  } catch (e) {
    console.error(e)
    console.log('returning no results cause of error')
    return ctx.answerInlineQuery([], DEFAULT_EXTRA_OPTIONS)
  }
})

const webhookUrl = process.env.WEBHOOK_URL || 'http://localhost'

const secretPath = `/telegraf/${bot.secretPathComponent()}`
bot.telegram.setWebhook(`${webhookUrl}${secretPath}`)

const hostname = process.env.NODE_ENV === 'production' ? '0.0.0.0': 'localhost'

const app = express()
app.get('/', (req: Request, res: Response) => res.status(404).send())
app.use(bot.webhookCallback(secretPath))
app.use(enforce.HTTPS({ trustProtoHeader: true }))
app.listen(8080, hostname, () => {
  console.log("Risibank bot launched on port 8080!")
})
