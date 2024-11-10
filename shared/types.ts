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
