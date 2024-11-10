/**
 * Initialize the database with sample data
 */
export default defineEventHandler(async (event) => {
  if (!import.meta.dev) {
    setResponseStatus(event, 403);
    return { message: "This endpoint is only available in development" };
  }

  // Clear the database
  await GiftModel.deleteMany();
  await TransactionModel.deleteMany();
  await UserModel.deleteMany();

  // Insert sample data
  const users = await UserModel.insertMany([
    {
      _id: 2200482356,
      name: "Test",
      profilePicture: "/images/profile.png",
    },
    {
      _id: 2200482357,
      name: "Test2",
      profilePicture: "/images/profile.png",
    },
  ]);

  const gifts = await GiftModel.insertMany([
    {
      name: "Delicious Cake",
      currency: "USDT",
      price: 10,
      totalSupply: 500,
      available: 3,
      image: "/images/cake.png",
      color: "#FE9F41",
    },
    {
      name: "Green Star",
      currency: "TON",
      price: 5,
      totalSupply: 3000,
      available: 802,
      image: "/images/green-star.png",
      color: "#46D100",
    },
    {
      name: "Blue Star",
      currency: "ETH",
      price: 0.01,
      totalSupply: 5000,
      available: 458,
      image: "/images/blue-star.png",
      color: "#007AFF",
    },
    {
      name: "Red Star",
      currency: "TON",
      price: 1,
      totalSupply: 10000,
      available: 10000,
      image: "/images/red-star.png",
      color: "#007AFF",
    },
  ]);

  await TransactionModel.insertMany([
    {
      sender: users[0]._id,
      recipient: users[1]._id,
      gift: gifts[0]._id,
      transactionType: "transfer",
      timestamp: new Date(),
    },
    {
      sender: users[0]._id,
      gift: gifts[1]._id,
      transactionType: "buy",
      timestamp: new Date(),
      price: 10,
      currency: "USDT",
    },
  ]);

  return { message: "Data inserted successfully" };
});
