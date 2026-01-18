import Order from "../models/order.model.js";
import Product from "../models/product.model.js";
import Stripe from "stripe";
// Place order COD: /api/order/place
export const placeOrderCOD = async (req, res) => {
  try {
    const userId = req.user;
    const { items, address } = req.body;
    if (!address || !items || items.length === 0) {
      return res
        .status(400)
        .json({ message: "Invalid order details", success: false });
    }
    // calculate amount using items;
    let amount = await items.reduce(async (acc, item) => {
      const product = await Product.findById(item.product);
      return (await acc) + product.offerPrice * item.quantity;
    }, 0);

    // Add tax  2%
    amount += Math.floor((amount * 2) / 100);
    await Order.create({
      userId,
      items,
      address,
      amount,
      paymentType: "COD",
      isPaid: false,
    });
    res
      .status(201)
      .json({ message: "Order placed successfully", success: true });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Place order STRIPE: /api/order/stripe
export const placeOrderStripe = async (req, res) => {
  try {
    const userId = req.user;
    const { items, address } = req.body;
    const origin =
      req.headers.origin ||
      req.headers.referer ||
      process.env.FRONTEND_URL ||
      "http://localhost:5173";

    if (!address || !items || items.length === 0) {
      return res
        .status(400)
        .json({ message: "Invalid order details", success: false });
    }

    if (!process.env.STRIPE_SECRET_KEY) {
      return res.status(500).json({
        message: "Stripe configuration is missing",
        success: false,
      });
    }

    let productData = [];
    // calculate amount using items;
    let amount = await items.reduce(async (acc, item) => {
      const product = await Product.findById(item.product);
      if (!product) {
        throw new Error(`Product not found: ${item.product}`);
      }
      productData.push({
        name: product.name,
        quantity: item.quantity,
        price: product.offerPrice,
      });
      return (await acc) + product.offerPrice * item.quantity;
    }, 0);

    // Add tax  2%
    amount += Math.floor((amount * 2) / 100);

    const order = await Order.create({
      userId,
      items,
      address,
      amount,
      paymentType: "Online",
      isPaid: true, // Set to true initially, will be updated after payment
    });

    //stripe gateway initialization
    const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);

    //create line items for stripe
    const line_items = productData.map((item) => {
      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
          },
          unit_amount: Math.floor(item.price * 100),
        },
        quantity: item.quantity,
      };
    });

    //create stripe session
    const session = await stripeInstance.checkout.sessions.create({
      line_items,
      mode: "payment",
      success_url: `${origin}/loader?next=my-orders`,
      cancel_url: `${origin}/cart`,
      metadata: {
        orderId: order._id.toString(),
        userId: userId.toString(),
      },
    });

    res.status(201).json({
      message: "Order placed successfully",
      success: true,
      url: session.url,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
      success: false,
    });
  }
};

// oredr details for individual user :/api/order/user
export const getUserOrders = async (req, res) => {
  try {
    const userId = req.user;
    const orders = await Order.find({
      userId,
      $or: [{ paymentType: "COD" }, { isPaid: true }],
    })
      .populate("items.product address")
      .sort({ createdAt: -1 });
    res.status(200).json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// get all orders for admin :/api/order/all
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      $or: [{ paymentType: "COD" }, { isPaid: true }],
    })
      .populate("items.product address")
      .sort({ createdAt: -1 });
    res.status(200).json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
