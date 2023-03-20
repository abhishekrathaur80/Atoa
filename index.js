require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const authRoute = require("./router/auth.route");
const AuthService = require("./services/auth.service");
const AuthServiceInstance = new AuthService();

app.use(express.json());

const DB_URI = "mongodb://127.0.0.1:27017/authUser";

mongoose
  .connect(DB_URI)
  .then(() => console.log("Connected to DB at", DB_URI))
  .catch((error) => console.log("Failed to connect to DB\n", error));

const transactions = [
  {
    id: "1",
    name: "Transaction 1",
    imageUrl: "https://example1.com/image.jpg",
    amount: 100,
    type: "Debit",
    currencySymbol: "$",
  },
  {
    id: "2",
    name: "Transaction 2",
    imageUrl: "https://example2.com/image.jpg",
    amount: 50,
    type: "Credit",
    currencySymbol: "$",
  },
  {
    id: "3",
    name: "Transaction 3",
    imageUrl: "https://example3.com/image.jpg",
    amount: 75,
    type: "Debit",
    currencySymbol: "$",
  },
];

//signUP and login Api
app.use("/auth", authRoute);

// Transaction List API with pagination support
app.get("/transactions", (req, res) => {
  const { accessToken, count, lastTransactionId } = req.query;

  // Check if access token is valid
  if (!AuthServiceInstance.validToken(accessToken)) {
    return res.status(401).json({ message: "Invalid access token" });
  }

  // Get transactions based on pagination parameters
  const startIndex = lastTransactionId
    ? transactions.findIndex((t) => t.id === lastTransactionId) + 1
    : 0;
  const endIndex = startIndex + count;
  const paginatedTransactions = transactions.slice(startIndex, endIndex);

  // Return paginated transactions
  res.status(200).json(paginatedTransactions);
});

app.listen(3000, () => {
  console.log(`listening on port no ${3000}`);
});
