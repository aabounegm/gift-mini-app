export default defineEventHandler(async (event) => {
  const giftId = getRouterParam(event, "id");
  const gift = await GiftModel.findById(giftId);

  if (gift == null) {
    setResponseStatus(event, 404);
    return { message: "Gift not found" };
  }

  return gift.toJSON();
});
