import * as Dotenv from 'dotenv'
import Telegraf from 'telegraf'
import {convertRisibankStickersToInlineResults} from "./src/utils/functions";
import RisibankClient from "./src/services/RisibankClient";

Dotenv.config()

const bot = new Telegraf(process.env.BOT_TOKEN, {username: 'Risitas'})
bot.on("inline_query", async (ctx) => {
  try {
    const search = ctx.update.inline_query.query
    const results = await RisibankClient.search(search)
    if (results.stickers) {
      const stickers = convertRisibankStickersToInlineResults(results.stickers).slice(0, 15)
      return ctx.answerInlineQuery(stickers)
    } else {
      return ctx.answerInlineQuery([])
    }
  } catch (e) {
    console.error(e)
    console.log('returning no results cause of error')
    return ctx.answerInlineQuery([])
  }

})

bot.startPolling()
console.log('bot is running')
