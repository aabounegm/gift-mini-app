import { LeaderboardUser } from "~~/shared/types";

/**
 * Return a list of all users in the DB, for the leaderboard
 */
export default defineEventHandler(async (event) => {
  const users = await UserModel.aggregate<LeaderboardUser>([
    {
      $project: {
        _id: 1,
        name: 1,
        profilePicture: 1,
        receivedGiftsCount: { $size: "$receivedGifts" },
      },
    },
    {
      $sort: { receivedGiftsCount: -1 },
    },
  ]);

  return users;
});
