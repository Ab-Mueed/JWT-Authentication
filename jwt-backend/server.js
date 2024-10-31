const express = require("express");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const app = express();
const cors = require("cors");

dotenv.config();

app.use(cors());
app.use(express.json());

const users = [];
let refreshTokens = [];

console.log("users: " + users);

// Endpoint for user registration
app.post("/signup", (req, res) => {
  const { username, password } = req.body;
  users.push({ username, password });
  console.log("Current Users:", users);
  res.status(201).json({ message: "User Successfully Registered" });
});

// Endpoint for login and token issuance
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find((item) => item.username === username);

  if (!user || user.password !== password) {
    return res.status(401).json({ message: "Invalid Username or Password" });
  }

  const accessToken = jwt.sign({ username }, process.env.SECRET_KEY, {
    expiresIn: "30s",
  });
  const refreshToken = jwt.sign({ username }, process.env.REFRESH_SECRET_KEY, {
    expiresIn: "2m",
  });

  refreshTokens.push(refreshToken);
  res.json({ accessToken, refreshToken });
});

// Endpoint for refreshing access token
app.post("/token", (req, res) => {
  const { token } = req.body;
  if (!token || !refreshTokens.includes(token)) {
    return res.sendStatus(403);
  }

  jwt.verify(token, process.env.REFRESH_SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);

    const accessToken = jwt.sign(
      { username: user.username },
      process.env.SECRET_KEY,
      { expiresIn: "30s" }
    );
    res.json({ accessToken });
  });
});

// Endpoint for accessing protected resource
app.get("/protected", (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Access Denied" });

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err)
      return res.status(403).json({ message: "Token Expired or Invalid" });

    res.json({ message: "Access Granted", user });
  });
});

// Start the server
app.listen(5000, () => {
  console.log("Server is running on http://localhost:5000");
});
