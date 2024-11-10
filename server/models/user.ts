import { SchemaTypes } from "mongoose";
import { defineMongooseModel } from "#nuxt/mongoose";
import { User } from "~~/shared/types";

export const UserModel = defineMongooseModel<User>({
  name: "User",
  schema: {
    // @ts-ignore I don't understand Mongoose typings
    _id: {
      type: SchemaTypes.BigInt, // 64-bit integer in Mongo, not JavaScript's arbitrarily large BigInt
      transform: (v: bigint) => Number(v),
    },
    name: SchemaTypes.String,
    /** URL */
    profilePicture: SchemaTypes.String,
    /** Gifts I purchased myself */
    ownedGifts: [
      {
        type: SchemaTypes.ObjectId,
        ref: "Gift",
      },
    ],
    receivedGifts: [
      {
        type: SchemaTypes.ObjectId,
        ref: "Gift",
      },
    ],
  },
});
