export interface Gift {
  name: string;
  price: number;
  /** Can be "TON", "ETH", or "USDT" */
  currency: "TON" | "ETH" | "USDT";
  /** How much of this gift is in circulation */
  totalSupply: number;
  /** How much is currently available for purchase */
  available: number;
  /** URL to the image */
  image: string;
  /** Hex code */
  color: string;
}

export interface User {
  /** Telegram Chat ID */
  _id: number;
  name: string;
  /** URL */
  profilePicture: string;
  /** Gifts I purchased myself */
  ownedGifts: string[] | Gift[];
  receivedGifts: string[] | Gift[];
}

interface TransactionBase {
  sender: number | User;
  gift: string | Gift;
  timestamp: Date;
}

export interface TransferTransaction extends TransactionBase {
  transactionType: "transfer";
  recipient: number | User;
}

export interface BuyTransaction extends TransactionBase {
  transactionType: "buy";
  price: number;
  currency: "TON" | "ETH" | "USDT";
}

export type Transaction = TransferTransaction | BuyTransaction;
