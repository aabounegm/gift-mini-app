import { GiftModel } from "~~/server/models/gift";

/**
 * Return a list of all gifts in the DB
 */
export default defineEventHandler(async (event) => {
  const gifts = await GiftModel.find();

  return gifts.map((gift) => gift.toJSON());
});
