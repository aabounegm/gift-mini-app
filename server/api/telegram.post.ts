import { bot } from "~~/server/lib/telegram/bot";
import type { Update } from "grammy/types";

export default defineEventHandler(async (event) => {
  const { telegram } = useRuntimeConfig(event);
  const secretTokenHeader = event.headers.get(
    "X-Telegram-Bot-Api-Secret-Token"
  );

  if (secretTokenHeader !== telegram.apiSecret) {
    setResponseStatus(event, 401, "Unauthorized");
    return { message: "Incorrect API secret token" };
  }

  if (!bot.isInited()) {
    await bot.init();
  }

  try {
    const body: Update = await readBody(event);
    await bot.handleUpdate(body);
  } catch (e) {
    console.error("An error occurred while handling bot update:", e);
  }

  return sendNoContent(event);
});
