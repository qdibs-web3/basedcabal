// /api/votes/[address].js
const { MongoClient, ServerApiVersion } = require("mongodb");
const cors = require("cors");

// Initialize CORS middleware
// Allow requests from Vercel preview URLs, the production domain, and localhost for development
const allowedOrigins = [
  /^https:\/\/basedcabal-.*\.vercel\.app$/,
  'https://basedcabal.vercel.app',
];
if (process.env.NODE_ENV !== 'production') {
  allowedOrigins.push('http://localhost:3000'); // Allow CRA dev server
  allowedOrigins.push('http://localhost:4000'); // Allow if separate server runs
}

const corsMiddleware = cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    // Check if the origin is allowed
    if (allowedOrigins.some(allowedOrigin => 
        typeof allowedOrigin === 'string' ? origin === allowedOrigin : allowedOrigin.test(origin)
    )) {
      return callback(null, true);
    } else {
      return callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST'],
  credentials: true
});

// Helper function to run middleware
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result)
      }
      return resolve(result)
    })
  })
}

// MongoDB connection setup
const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error("Error: MONGODB_URI environment variable is not set.");
  // In a serverless function, throwing an error might be better
  // Or handle this case gracefully depending on requirements
}

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let db;

async function connectToDatabase() {
  if (db && client.topology && client.topology.isConnected()) {
    // Reuse existing connection if available and connected
    return db.collection("coins");
  }
  try {
    await client.connect();
    console.log("Connected to MongoDB Atlas");
    db = client.db("basegems"); // Use the correct database name
    return db.collection("coins");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    // Close the connection if it failed during initialization
    await client.close(); 
    throw error; // Re-throw the error to be caught by the handler
  }
}

// Main handler for GET and POST requests
module.exports = async (req, res) => {
  // Apply CORS middleware
  try {
    await runMiddleware(req, res, corsMiddleware);
  } catch (error) {
    console.error("CORS Error:", error);
    return res.status(403).json({ error: 'CORS Error: Not allowed' });
  }

  const { address } = req.query;

  if (!address) {
    return res.status(400).json({ error: "Coin address is required." });
  }

  try {
    const coinsCollection = await connectToDatabase();

    if (req.method === "POST") {
      // Handle vote increment
      try {
        const result = await coinsCollection.findOneAndUpdate(
          { address },
          { $inc: { votes: 1 } },
          { upsert: true, returnDocument: 'after' } // Create if not exists, return updated doc
        );
        
        // Check if result.value is null in case of an issue with findOneAndUpdate
        const updatedCoin = result.value || await coinsCollection.findOne({ address });
        
        if (!updatedCoin) {
             // If still not found after upsert, something went wrong
             console.error("Error finding/updating coin after upsert:", address);
             return res.status(500).json({ error: "Error updating vote count." });
        }
        
        return res.status(200).json(updatedCoin);

      } catch (error) {
        console.error("Error handling the vote:", error);
        return res.status(500).json({ error: "Error updating vote count." });
      }

    } else if (req.method === "GET") {
      // Handle fetching vote count
      try {
        const coin = await coinsCollection.findOne({ address });
        if (coin) {
          return res.status(200).json(coin);
        } else {
          // Return a default structure if coin not found, including address and 0 votes
          return res.status(200).json({ address: address, votes: 0 });
        }
      } catch (error) {
        console.error("Error retrieving vote count:", error);
        return res.status(500).json({ error: "Error retrieving vote count." });
      }

    } else {
      // Handle unsupported methods
      res.setHeader("Allow", ["GET", "POST"]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

  } catch (dbError) {
    // Catch errors from connectToDatabase
    console.error("Database connection failed:", dbError);
    return res.status(500).json({ error: "Database connection error." });
  }
};

