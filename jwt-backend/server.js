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

// Validate User
const validateUser = (username, password) => {
  if (!username || !password) {
    return { valid: false, message: "Username and password are required." };
  } else return { valid: true };
};

// Endpoint for user registration
app.post("/signup", (req, res) => {
  const { username, password } = req.body;

  const validation = validateUser(username, password);
  if (!validation.valid) {
    return res.status(400).json({ message: validation.message });
  }

  const existingUser = users.find((user) => user.username === username);
  if (existingUser) {
    return res.status(409).json({ message: "User Already Exists!" });
  }
  users.push({ username, password });
  console.log("Current Users:", users);
  res.status(201).json({ message: "User Successfully Registered" });
});

// Endpoint for login and token issuance
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const validation = validateUser(username, password);
  if (!validation.valid) {
    return res.status(400).json({ message: validation.message });
  }
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
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
