import { z } from "zod";

const querySchema = z.object({
  userId: z.string().optional(),
});

/**
 * Return a list of all gifts in the DB
 */
export default defineEventHandler(async (event) => {
  const { userId } = await getValidatedQuery(event, querySchema.parse);

  if (userId) {
    const user = await UserModel.findById(userId)
      .select("ownedGifts.gift")
      .populate("ownedGifts.gift");
    if (!user) {
      setResponseStatus(event, 404);
      return { message: "User not found" };
    }
    return user.ownedGifts.map((gift) => gift.gift);
  }

  const gifts = await GiftModel.find();

  return gifts.map((gift) => gift.toJSON());
});
