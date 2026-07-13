import express from "express";
import cors from "cors";

const app = express();

app.use(express.json());

/**
 * CORS configuration
 * ------------------
 * Instead of hard-coding the server IP, we read the allowed frontend
 * origin(s) from the CLIENT_URL environment variable. This is what makes
 * the app portable across environments (local dev, Hostinger VPS, a real
 * domain, etc.) — you only change one value, never the code.
 *
 * CLIENT_URL can hold a single origin or several separated by commas, e.g.
 *   CLIENT_URL=http://200.97.168.127:3000
 *   CLIENT_URL=http://200.97.168.127:3000,https://yourdomain.com
 *
 * On the Hostinger VPS this is injected by docker-compose (see docker-compose.yml).
 */

// Always-allowed origins for local development.
const devOrigins = [
  "http://localhost:5173", // Vite dev server (default)
  "http://localhost:5174", // Vite dev server (fallback port)
  "http://localhost:3000", // production build served locally
];

// Extra origins supplied at deploy time via the environment.
const envOrigins = (process.env.CLIENT_URL || "")
  .split(",")
  .map((origin) => origin.trim().replace(/\/$/, "")) // trim spaces + drop trailing "/"
  .filter(Boolean);

// De-duplicate into the final allow-list.
const allowedOrigins = [...new Set([...devOrigins, ...envOrigins])];

app.use(
  cors({
    origin(origin, callback) {
      // Requests without an Origin header (curl, health checks, same-origin
      // server-to-server calls) are allowed through.
      if (!origin) return callback(null, true);

      const normalized = origin.replace(/\/$/, "");
      if (allowedOrigins.includes(normalized)) {
        return callback(null, true);
      }

      return callback(new Error(`Origin not allowed by CORS: ${origin}`));
    },
    credentials: true,
    // methods: ["GET", "POST"],
    // allowedHeaders: ["Content-Type", "Authorization"],
  })
);

console.log("CORS allowed origins:", allowedOrigins);

app.get("/api/message", (req, res) => {
  res.json({ message: "Hellow from chaicode server " });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
