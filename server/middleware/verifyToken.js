import jwt from "jsonwebtoken";

export default function verifyToken(req, res, next) {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    if (!token) {
      return res.status(401).json({ error: "Access denied" });
    }
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (verified) {
      next();
    } else {
      return res.status(401).json({ error: "Access denied" });
    }
  } catch (error) {
    return res.status(400).json({ error: "Invalid token" });
  }
}
