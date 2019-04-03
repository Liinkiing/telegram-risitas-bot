import * as Dotenv from 'dotenv'
import Telegraf from 'telegraf'
import {convertRisibankStickersToInlineResults} from "./src/utils/functions";
import RisibankClient from "./src/services/RisibankClient";
import { ExtraAnswerInlineQuery } from 'telegraf/typings/telegram-types';

Dotenv.config()

const bot = new Telegraf(process.env.BOT_TOKEN, {username: 'Risitas'})

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

bot.startPolling()
console.log('bot is running')
