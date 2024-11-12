import { validate, parse } from "@telegram-apps/init-data-node";
import mongoose from "mongoose";
import { z } from "zod";
import { InlineKeyboard } from "grammy";
import { bot } from "~~/server/lib/telegram/bot";

const querySchema = z.object({
  initData: z.string(),
  from: z.number({ coerce: true }),
});

export default defineEventHandler(async (event) => {
  const { initData, from } = await getValidatedQuery(event, querySchema.parse);
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

  if (user.id === from) {
    setResponseStatus(event, 400);
    return { message: "You cannot send a gift to yourself" };
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

  const sender = await UserModel.findById(from);
  if (!sender) {
    setResponseStatus(event, 404);
    return { message: "Sender not found" };
  }

  if (
    !sender.ownedGifts.some(
      (ownedGift) => ownedGift.gift.toString() === gift.id
    )
  ) {
    setResponseStatus(event, 400);
    return {
      message: "Sender does not own this gift. Did you already accept it?",
    };
  }

  await mongoose.connection.transaction(async () => {
    // Create user if not exists
    let receiver = await UserModel.findById(user.id);
    if (!receiver) {
      receiver = await UserModel.create({
        _id: user.id,
        name: user.firstName,
        profilePicture:
          user.photoUrl ??
          "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png",
      });
    }

    // Add the gift to the receiver's "receivedGifts" array
    receiver.receivedGifts.push({
      gift: gift.id,
      sender: sender.id,
      receiveDate: new Date(),
    });
    await receiver.save();

    // Remove the gift from the receiver's "ownedGifts" array
    const giftIdx = sender.ownedGifts.findIndex(
      (ownedGift) => ownedGift.gift.toString() === gift.id
    );
    sender.ownedGifts.splice(giftIdx, 1);
    await sender.save();

    // Store a transaction
    const transaction = await TransactionModel.create({
      transactionType: "transfer",
      gift: gift,
      recipient: receiver.id,
      sender: sender.id,
      timestamp: new Date(),
    });
  });

  await bot.api.sendMessage(
    sender._id,
    `👌 ${user.firstName} received your gift of ${gift.name}`,
    {
      reply_markup: new InlineKeyboard().webApp(
        "Open App",
        "https://gift-mini-app.abounegm.com/"
      ),
    }
  );

  return { message: "Gift transferred successfully" };
});
