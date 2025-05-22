import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(" ")[1]; // Ambil token dari 'Bearer <token>'

  if (!token) {
    return res.status(401).json({ message: "Access token missing" });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid or expired token" });
    }

    // Simpan info user yang sudah terverifikasi di request object
    req.userId = decoded.userId;
    req.username = decoded.username;

    next();
  });
};
