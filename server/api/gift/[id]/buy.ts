import { validate, parse } from "@telegram-apps/init-data-node";
import { InlineKeyboard } from "grammy";
import mongoose from "mongoose";
import { z } from "zod";
import { bot } from "~~/server/lib/telegram/bot";

const querySchema = z.object({
  initData: z.string(),
});

export default defineEventHandler(async (event) => {
  const { initData } = await getValidatedQuery(event, querySchema.parse);
  const { telegram } = useRuntimeConfig(event);
  try {
    validate(initData, telegram.botToken);
  } catch (e) {
    setResponseStatus(event, 400);
    return { message: (e as Error).message };
  }
  const { user } = parse(initData);

  if (!user) {
    setResponseStatus(event, 400);
    return { message: "User is required" };
  }

  const giftId = getRouterParam(event, "id");
  if (!giftId) {
    setResponseStatus(event, 400);
    return { message: "Gift ID is required" };
  }

  const gift = await GiftModel.findById(giftId);
  if (!gift) {
    setResponseStatus(event, 404);
    return { message: "Gift not found" };
  }
  if (gift.available <= 0) {
    setResponseStatus(event, 400);
    return { message: "Gift is out of stock" };
  }

  await mongoose.connection.transaction(async () => {
    // Create user if not exists
    let dbUser = await UserModel.findById(user.id);
    if (!dbUser) {
      dbUser = await UserModel.create({
        _id: user.id,
        name: user.firstName,
        profilePicture:
          user.photoUrl ??
          "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png",
      });
    }

    // Add the gift to the user's "ownedGifts" array
    dbUser.ownedGifts.push({
      gift: gift.id,
      purchaseDate: new Date(),
    });
    await dbUser.save();

    // decrement the "available" count
    gift.available -= 1;
    await gift.save();

    // add a transaction
    const transaction = await TransactionModel.create({
      transactionType: "buy",
      currency: gift.currency,
      price: gift.price,
      gift: gift,
      sender: dbUser.id,
      timestamp: new Date(),
    });
  });

  await bot.api.sendMessage(
    user.id,
    `✅ You have purchased the gift of ${gift.name}`,
    {
      reply_markup: new InlineKeyboard().webApp(
        "Open Gifts",
        "https://gift-mini-app.abounegm.com/gifts"
      ),
    }
  );

  return { message: "Gift bought successfully" };
});
