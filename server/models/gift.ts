import { SchemaTypes } from "mongoose";
import { defineMongooseModel } from "#nuxt/mongoose";
import type { Gift } from "~~/shared/types";

/** For gifts in the store. To be copied in other models */
export const GiftModel = defineMongooseModel<Gift>({
  name: "Gift",
  schema: {
    name: {
      type: SchemaTypes.String,
      required: true,
    },
    price: {
      type: SchemaTypes.Number,
      required: true,
    },
    currency: {
      type: SchemaTypes.String,
      enum: ["TON", "ETH", "USDT"],
      required: true,
    },
    /** How much of this gift is in circulation */
    totalSupply: {
      type: SchemaTypes.Number,
      required: true,
    },
    /** How much is currently available for purchase */
    available: {
      type: SchemaTypes.Number,
      required: true,
    },
    /** URL to the image */
    image: SchemaTypes.String,
    /** Hex code */
    color: SchemaTypes.String,
  },
});
