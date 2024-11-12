import { Bot, InlineKeyboard, InlineQueryResultBuilder } from "grammy";

const { telegram } = useRuntimeConfig();

export const bot = new Bot(telegram.botToken, {
  client: {
    environment: import.meta.dev ? "test" : "prod",
    buildUrl(root, token, method, env) {
      const maybeTest = env === "test" && telegram.useTestServer ? "test/" : "";
      return `${root}/bot${token}/${maybeTest}${method}`;
    },
  },
});

let welcomeImageId: string | null = null;

bot.command("start", async (ctx) => {
  let imageId = welcomeImageId ?? "https://imgur.com/R2Stef0";

  const msg = await ctx.replyWithPhoto(imageId, {
    caption: "🎁 Here you can buy and send gifts to your friends.",
    reply_markup: new InlineKeyboard().webApp(
      "Open App",
      "https://gift-mini-app.abounegm.com/"
      // "http://127.0.0.1:3000/" // Bot API doesn't accept "localhost" even in test environment (need to test if 127... works in non-test, but with HTTPS)
    ),
  });

  if (!welcomeImageId) {
    welcomeImageId = msg.photo[0].file_id;
  }
});

bot.command("dev", async (ctx) => {
  const url = ctx.match || "http://127.0.0.1:3000/";
  await ctx.reply(`Dev mode web app: ${url}`, {
    reply_markup: new InlineKeyboard().webApp("Open App", url),
  });
});

bot.on("inline_query", async (ctx) => {
  const giftId = ctx.inlineQuery.query;

  const gift = await GiftModel.findById(giftId).catch(() => null);
  if (gift == null) {
    return ctx.answerInlineQuery([]);
  }

  // Max. 64 characters, only A-Z, a-z, 0-9, _ and - are allowed.
  const start_param = `${gift.id}_${ctx.inlineQuery.from.id}`;
  const result = InlineQueryResultBuilder.article(gift.id, "Send gift", {
    thumbnail_url: gift.image,
    description: `Send a gift of ${gift.name}`,
    reply_markup: new InlineKeyboard().url(
      "Receive gift",
      `https://t.me/aa_gift_bot/gift_app?startapp=${start_param}`
    ),
  }).text(`🎁 I have a gift for you! Tap the button below to open it.`);

  await ctx.answerInlineQuery([result], {
    cache_time: import.meta.dev ? 0 : 300,
    is_personal: true,
  });
});

bot.on("message", (ctx) =>
  ctx.reply("Sorry, I cannot handle plain text messages")
);
