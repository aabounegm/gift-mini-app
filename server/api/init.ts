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
  const gifts = await GiftModel.insertMany([
    {
      name: "Delicious Cake",
      currency: "USDT",
      price: 10,
      totalSupply: 500,
      available: 3,
      image: "https://gift-mini-app.abounegm.com/images/cake.png",
      color: "#FE9F41",
    },
    {
      name: "Green Star",
      currency: "TON",
      price: 5,
      totalSupply: 3000,
      available: 802,
      image: "https://gift-mini-app.abounegm.com/images/green-star.png",
      color: "#46D100",
    },
    {
      name: "Blue Star",
      currency: "ETH",
      price: 0.01,
      totalSupply: 5000,
      available: 458,
      image: "https://gift-mini-app.abounegm.com/images/blue-star.png",
      color: "#007AFF",
    },
    {
      name: "Red Star",
      currency: "TON",
      price: 1,
      totalSupply: 10000,
      available: 10000,
      image: "https://gift-mini-app.abounegm.com/images/red-star.png",
      color: "#FF4747",
    },
  ]);

  const users = await UserModel.insertMany([
    {
      _id: 1,
      name: "Bob",
      profilePicture:
        "https://xsgames.co/randomusers/assets/avatars/male/51.jpg",
      ownedGifts: [
        {
          gift: gifts[0]._id,
          purchaseDate: new Date(),
        },
        {
          gift: gifts[1]._id,
          purchaseDate: new Date(),
        },
      ],
    },
    {
      _id: 2,
      name: "Alice",
      profilePicture:
        "https://xsgames.co/randomusers/assets/avatars/female/39.jpg",
      ownedGifts: [
        {
          gift: gifts[2]._id,
          purchaseDate: new Date(),
        },
      ],
      receivedGifts: [
        {
          gift: gifts[1]._id,
          sender: 1, // users[0]._id,
          receiveDate: new Date(),
        },
      ],
    },
  ]);

  await TransactionModel.insertMany([
    // Bob bought a cake
    {
      sender: users[0]._id,
      gift: gifts[0]._id,
      transactionType: "buy",
      timestamp: new Date(),
      price: gifts[0].price,
      currency: gifts[0].currency,
    },
    // Bob bought a green star
    {
      sender: users[0]._id,
      gift: gifts[1]._id,
      transactionType: "buy",
      timestamp: new Date(),
      price: gifts[1].price,
      currency: gifts[1].currency,
    },
    // Alice bought a blue star
    {
      sender: users[1]._id,
      gift: gifts[2]._id,
      transactionType: "buy",
      timestamp: new Date(),
      price: gifts[2].price,
      currency: gifts[2].currency,
    },
    // Bob transferred a green star to Alice
    {
      sender: users[0]._id,
      recipient: users[1]._id,
      gift: gifts[1]._id,
      transactionType: "transfer",
      timestamp: new Date(),
    },
  ]);

  return { message: "Data inserted successfully" };
});
