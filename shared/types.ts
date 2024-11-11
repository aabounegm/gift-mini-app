export interface Gift {
  _id: string;
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

export interface OwnedGift {
  gift: Gift | Gift["_id"];
  purchaseDate: Date;
}

export interface ReceivedGift {
  gift: Gift | Gift["_id"];
  sender: User | User["_id"];
  receiveDate: Date;
}

export interface User {
  /** Telegram Chat ID */
  _id: number;
  name: string;
  /** URL */
  profilePicture: string;
  /** Gifts I purchased myself */
  ownedGifts: OwnedGift[];
  /** Gifts I received */
  receivedGifts: ReceivedGift[];
}

export type LeaderboardUser = Pick<User, "_id" | "name" | "profilePicture"> & {
  receivedGiftsCount: number;
};

interface TransactionBase {
  _id: string;
  /** Or "buyer" */
  sender: bigint | User;
  gift: string | Gift;
  timestamp: Date;
}

export interface TransferTransaction extends TransactionBase {
  transactionType: "transfer";
  recipient: bigint | User;
}

export interface BuyTransaction extends TransactionBase {
  transactionType: "buy";
  price: number;
  currency: "TON" | "ETH" | "USDT";
}

export type Transaction = TransferTransaction | BuyTransaction;
