import "https://deno.land/x/dotenv/load.ts";
import Telegraf from "https://cdn.pika.dev/telegraf-esm@^1.0.2";
import { convertRisibankStickersToInlineResults } from "./src/utils/functions.ts";
import RisibankClient from "./src/services/RisibankClient.ts";

const bot = new Telegraf(Deno.env.get("BOT_TOKEN"), { username: "Risitas" });

const DEFAULT_EXTRA_OPTIONS = {
  cache_time: 0,
};

bot.on("inline_query", async (ctx) => {
  try {
    const search = ctx.update.inline_query.query;
    const results = await RisibankClient.search(search);
    if (results.stickers) {
      const stickers = convertRisibankStickersToInlineResults(results.stickers)
        .slice(0, 30);
      return ctx.answerInlineQuery(stickers, DEFAULT_EXTRA_OPTIONS);
    } else {
      return ctx.answerInlineQuery([], DEFAULT_EXTRA_OPTIONS);
    }
  } catch (e) {
    console.error(e);
    console.log("returning no results cause of error");
    return ctx.answerInlineQuery([], DEFAULT_EXTRA_OPTIONS);
  }
});

bot.startPolling();
console.log("bot is running");
