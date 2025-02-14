const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");
const cors = require("cors");
const path = require("path");
const app = express();

// Check if MongoDB URI is loaded correctly
console.log("MongoDB URI:", process.env.MONGODB_URI);

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// Enable CORS for all routes
app.use(cors({
  origin: process.env.NODE_ENV === 'production' ? 'https://basedcabal.vercel.app' : 'http://localhost:4000',
  methods: ['GET', 'POST'],
  credentials: true
}));

app.use(express.json());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'build')));

let db;

async function connectToDatabase() {
  if (!db) {
    try {
      await client.connect();
      console.log("Connected to MongoDB Atlas");
      db = client.db("basegems");
    } catch (error) {
      console.error("Error connecting to MongoDB:", error);
      throw error;
    }
  }
  return db.collection("coins");
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.post("/api/votes/:address", async (req, res) => {
  const address = req.params.address;
  const coinsCollection = await connectToDatabase();

  try {
    const coin = await coinsCollection.findOne({ address });
    if (!coin) {
      const newCoin = { address, votes: 1 };
      await coinsCollection.insertOne(newCoin);
    } else {
      await coinsCollection.updateOne({ address }, { $inc: { votes: 1 } });
    }
    const updatedCoin = await coinsCollection.findOne({ address });
    res.json(updatedCoin);
  } catch (error) {
    console.error("Error handling the vote:", error);
    res.status(500).json({ error: "Error updating vote count." });
  }
});

app.get("/api/votes/:address", async (req, res) => {
  const address = req.params.address;
  const coinsCollection = await connectToDatabase();

  try {
    const coin = await coinsCollection.findOne({ address });
    if (coin) {
      res.json(coin);
    } else {
      res.status(404).json({ error: "Coin not found" });
    }
  } catch (error) {
    console.error("Error retrieving vote count:", error);
    res.status(500).json({ error: "Error retrieving vote count." });
  }
});

// Handle React routing, return all requests to React app
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Only listen on port if running directly (not through Vercel)
if (require.main === module) {
  const port = process.env.PORT || 5000;
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

module.exports = app;
