/**
 * Return a list of all transactions in the DB
 */
export default defineEventHandler(async (event) => {
  const { populateGifts } = getQuery(event);
  let query = TransactionModel.find();
  if (populateGifts == "true") {
    query = query.populate("gift");
  }
  const transactions = await query;

  return transactions.map((gift) => gift.toJSON());
});
