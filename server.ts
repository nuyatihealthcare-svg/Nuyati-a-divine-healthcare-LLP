import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import Razorpay from "razorpay";
import shortid from "shortid";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Razorpay Initialization
  // Using lazy initialization as per guidelines
  let razorpayInstance: Razorpay | null = null;

  function getRazorpay() {
    if (!razorpayInstance) {
      const keyId = process.env.RAZORPAY_KEY_ID;
      const keySecret = process.env.RAZORPAY_KEY_SECRET;
      
      if (!keyId || !keySecret) {
        throw new Error("Razorpay API keys are missing in the environment");
      }
      
      razorpayInstance = new Razorpay({
        key_id: keyId,
        key_secret: keySecret,
      });
    }
    return razorpayInstance;
  }

  // API Route to create an order
  app.post("/api/razorpay", async (req, res) => {
    try {
      const { amount, currency = "INR" } = req.body;

      const rzp = getRazorpay();
      
      const options = {
        amount: (amount * 100).toString(), // amount in the smallest currency unit (paise)
        currency,
        receipt: shortid.generate(),
      };

      const order = await rzp.orders.create(options);
      res.json(order);
    } catch (error) {
      console.error("Razorpay Order Creation Error:", error);
      res.status(500).json({ 
        error: "Failed to create Razorpay order",
        details: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
