import jwt from "jsonwebtoken";

export const authSeller = async (req, res, next) => {
  const { sellertoken } = req.cookies;
  if (!sellertoken) {
    return res.status(401).json({ message: "Unauthorized", success: false });
  }
  try {
    const decoded = jwt.verify(sellertoken, process.env.JWT_SECRET);
    if (decoded.email === process.env.SELLER_EMAIL) {
      return next();
    } else {
      return res.status(403).json({ message: "Forbidden", success: false });
    }
  } catch (error) {
    return res.status(401).json({ message: "Invalid token", success: false });
  }
};
