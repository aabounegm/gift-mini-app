import { Bot, InlineKeyboard } from "grammy";

const { telegram } = useRuntimeConfig();

export const bot = new Bot(telegram.botToken, {
  client: {
    environment: import.meta.dev ? "test" : "prod",
    buildUrl(root, token, method, env) {
      const maybeTest = env === "test" ? "test/" : "";
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
      "http://127.0.0.1:3000/" // Bot API doesn't accept "localhost" even in test environment (need to test if 127... works in non-test, but with HTTPS)
    ),
  });

  if (!welcomeImageId) {
    welcomeImageId = msg.photo[0].file_id;
  }
});

bot.on("message", (ctx) =>
  ctx.reply("Sorry, I cannot handle plain text messages")
);