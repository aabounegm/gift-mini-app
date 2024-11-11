import { z } from "zod";

const querySchema = z.object({
  populateGifts: z.boolean({ coerce: true }).optional(),
  gift: z.string().optional(),
});

/**
 * Return a list of all transactions in the DB
 */
export default defineEventHandler(async (event) => {
  const { gift, populateGifts } = await getValidatedQuery(
    event,
    querySchema.parse
  );

  let query = TransactionModel.find();

  if (populateGifts) {
    query = query.populate("gift");
  }

  if (gift) {
    query = query
      .where("gift")
      .equals(gift)
      .populate("sender", "name profilePicture")
      .populate("recipient", "name profilePicture");
  }

  const transactions = await query;

  return transactions.map((transaction) =>
    transaction.toJSON({
      transform: (doc, ret) => {
        if (typeof ret._id === "bigint") {
          ret._id = Number(ret._id);
        }
        if (typeof ret.sender === "bigint") {
          ret.sender = Number(ret.sender);
        }
        if (typeof ret.recipient === "bigint") {
          ret.recipient = Number(ret.recipient);
        }
        return ret;
      },
    })
  );
});
