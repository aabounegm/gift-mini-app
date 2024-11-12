/**
 * Get a user's transaction history
 */
export default defineEventHandler(async (event) => {
  const userId = Number(getRouterParam(event, "id"));

  // TODO: filter by "receivedGifts" length > 0
  const transactions = await TransactionModel.find({
    $or: [{ sender: userId }, { receiver: userId }],
  })
    .populate("gift", "name price currency image")
    .populate("sender", "name profilePicture")
    .populate("recipient", "name profilePicture")
    .sort({ timestamp: -1 });

  return transactions.map((transaction) =>
    transaction.toJSON({
      transform: (doc, ret) => {
        if (typeof ret._id === "bigint") {
          ret._id = Number(ret._id);
        }
        return ret;
      },
    })
  );
});
