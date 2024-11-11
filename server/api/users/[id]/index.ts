import { validate, parse } from "@telegram-apps/init-data-node";

/**
 * Get a user (for the profile screen)
 */
export default defineEventHandler(async (event) => {
  const userId = Number(getRouterParam(event, "id"));
  const { telegram } = useRuntimeConfig(event);
  const { initData } = getQuery(event);

  let user = await UserModel.findById(userId)
    .select("name profilePicture receivedGifts")
    .populate("receivedGifts.gift")
    .populate("receivedGifts.sender", "name profilePicture");

  if (user == null) {
    if (typeof initData === "string") {
      try {
        validate(initData, telegram.botToken);
      } catch (e) {
        setResponseStatus(event, 400);
        return { message: "Invalid initData" };
      }
      const { user: tgUser } = parse(initData);

      if (tgUser == null) {
        setResponseStatus(event, 400);
        return { message: "Init data does not contain user info" };
      }

      if (tgUser.id !== userId) {
        setResponseStatus(event, 403);
        return { message: "User IDs from path and initData do not match" };
      }

      user = await UserModel.create({
        _id: userId,
        name: tgUser.firstName,
        profilePicture:
          tgUser.photoUrl ??
          "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png",
      });
    } else {
      setResponseStatus(event, 404);
      return { message: "User not found" };
    }
  }

  return user.toJSON({
    transform: (doc, ret) => {
      if (typeof ret?._id === "bigint") {
        ret._id = Number(ret._id);
      }
    },
  });
});
