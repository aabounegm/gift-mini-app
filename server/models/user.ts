import { SchemaTypes, Schema } from "mongoose";
import { defineMongooseModel } from "#nuxt/mongoose";
import { User } from "~~/shared/types";

export const ownedGiftSchema = new Schema({
  gift: {
    type: SchemaTypes.ObjectId,
    ref: "Gift",
  },
  purchaseDate: SchemaTypes.Date,
});

export const receivedGiftModel = new Schema({
  gift: {
    type: SchemaTypes.ObjectId,
    ref: "Gift",
  },
  sender: {
    type: SchemaTypes.BigInt,
    ref: "User",
  },
  receiveDate: SchemaTypes.Date,
});

export const UserModel = defineMongooseModel<User>({
  name: "User",
  schema: {
    _id: SchemaTypes.BigInt, // 64-bit integer in Mongo, not JavaScript's arbitrarily large BigInt
    name: SchemaTypes.String,
    /** URL */
    profilePicture: SchemaTypes.String,
    /** Gifts I purchased myself */
    ownedGifts: [ownedGiftSchema],
    receivedGifts: [receivedGiftModel],
  },
});
