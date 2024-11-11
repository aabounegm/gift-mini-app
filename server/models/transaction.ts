import { SchemaTypes } from "mongoose";
import { defineMongooseModel } from "#nuxt/mongoose";
import type { Transaction } from "~~/shared/types";

export const TransactionModel = defineMongooseModel<Transaction>({
  name: "Transaction",
  schema: {
    sender: {
      type: SchemaTypes.BigInt, // 64-bit integer in Mongo, not JavaScript's arbitrarily large BigInt
      ref: UserModel,
      required: true,
    },
    recipient: {
      type: SchemaTypes.BigInt,
      ref: UserModel,
      required() {
        return this.transactionType === "transfer";
      },
    },
    gift: {
      type: SchemaTypes.ObjectId,
      ref: GiftModel,
      required: true,
    },
    // quantity: SchemaTypes.Number, // Hard-coded as 1 for simplicity
    transactionType: {
      type: SchemaTypes.String,
      enum: ["buy", "transfer"],
    },
    timestamp: SchemaTypes.Date,
    price: {
      type: SchemaTypes.Number,
      required() {
        return this.transactionType === "buy";
      },
    },
    currency: {
      type: SchemaTypes.String,
      required() {
        return this.transactionType === "buy";
      },
    },
  },
});
