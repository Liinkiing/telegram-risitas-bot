import * as Dotenv from 'dotenv'
import * as Telegraf from 'telegraf'
import {convertRisibankStickersToInlineResults, convertRisibankStickerToGif} from "./src/utils/functions";
import RisibankClient from "./src/services/RisibankClient";

Dotenv.config()

const bot = new Telegraf.default(process.env.BOT_TOKEN, {username: 'Risitas'})
bot.on("inline_query", async (ctx) => {
  const search = ctx.update.inline_query.query
  console.log(search)
  const results = await RisibankClient.search(search)
  const stickers = convertRisibankStickersToInlineResults(results.stickers).slice(0, 10)
  return ctx.answerInlineQuery(stickers)
})
bot.startPolling()

console.log('bot is running')
