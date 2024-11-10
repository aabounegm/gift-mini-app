import { SchemaTypes } from "mongoose";
import { defineMongooseModel } from "#nuxt/mongoose";
import type { Transaction } from "~~/shared/types";

export const TransactionModel = defineMongooseModel<Transaction>({
  name: "Transaction",
  schema: {
    // @ts-ignore BigInt vs Number
    sender: {
      type: SchemaTypes.BigInt, // 64-bit integer in Mongo, not JavaScript's arbitrarily large BigInt
      required: true,
      transform: (v: bigint) => Number(v),
    },
    recipient: {
      type: SchemaTypes.BigInt,
      required() {
        return this.transactionType === "transfer";
      },
      transform: (v: bigint) => Number(v),
    },
    gift: {
      type: SchemaTypes.ObjectId,
      ref: "Gift",
      required: true,
    },
    // quantity: SchemaTypes.Number, // Hard-coded as 1 for simplicity
    transactionType: SchemaTypes.String,
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
