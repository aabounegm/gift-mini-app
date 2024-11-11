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
      .populate("ownedGifts")
      .select("ownedGifts");
    if (!user) {
      setResponseStatus(event, 404);
      return { message: "User not found" };
    }
    return user.ownedGifts;
  }

  const gifts = await GiftModel.find();

  return gifts.map((gift) => gift.toJSON());
});
