import jwt from "jsonwebtoken";

// seller login: /api/seller/login
export const sellerLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (
      email === process.env.SELLER_EMAIL &&
      password === process.env.SELLER_PASSWORD
    ) {
      const token = jwt.sign({ email }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
      res.cookie("sellertoken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "Strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });
      res
        .status(200)
        .json({ message: "Seller logged in successfully", success: true });
    } else {
      res.status(401).json({ message: "Invalid credentials", success: false });
    }
  } catch (error) {
    console.error("Seller login error:", error);
    return res.status(500).json({ message: "Server error", success: false });
  }
};

//logout seller: /api/seller/logout
export const sellerLogout = async (req, res) => {
  try {
    res.clearCookie("sellertoken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "Strict",
    });
    res
      .status(200)
      .json({ message: "Seller logged out successfully", success: true });
  } catch (error) {
    console.error("Seller logout error:", error);
    return res.status(500).json({ message: "Server error", success: false });
  }
};

// check auth seller: /api/seller/is-auth
export const checkAuth = async (req, res) => {
  try {
    res.status(200).json({ message: "Seller is authenticated", success: true });
  } catch (error) {
    console.error("isAuthSeller error:", error);
    return res.status(500).json({ message: "Server error", success: false });
  }
};
