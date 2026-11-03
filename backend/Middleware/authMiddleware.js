const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");
    if (!authHeader) return res.status(401).json({ message: "Authentication is required" });

    const [scheme, token] = authHeader.split(" ");
    if (scheme !== "Bearer" || !token) return res.status(401).json({ message: "Invalid authorization header" });
    if (!process.env.JWT_SECRET) return res.status(500).json({ message: "Authentication is not configured" });

    req.user = jwt.verify(token, process.env.JWT_SECRET, { algorithms: ["HS256"] });
    return next();
  } catch {
    return res.status(401).json({ message: "Your session is invalid or has expired" });
  }
};

module.exports = authMiddleware;
