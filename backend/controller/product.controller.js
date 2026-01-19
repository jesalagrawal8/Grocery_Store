import Product from "../models/product.model.js";
import { v2 as cloudinary } from "cloudinary";

//add product : /api/product/add
export const addProduct = async (req, res) => {
  try {
    const { name, description, price, offerPrice, category } = req.body;
    const files = req.files;

    if (
      !name ||
      !price ||
      !offerPrice ||
      !description ||
      !category ||
      !files ||
      files.length === 0
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields including images are required",
      });
    }

    // Convert description to array by splitting on newlines
    const descriptionArray = description
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0);

    // Upload images to Cloudinary
    const imageUrls = [];
    for (const file of files) {
      const result = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: "grocery-products",
            resource_type: "image",
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          },
        );
        uploadStream.end(file.buffer);
      });
      imageUrls.push(result.secure_url);
    }

    await Product.create({
      name,
      description: descriptionArray,
      price,
      offerPrice,
      category,
      image: imageUrls,
    });
    res
      .status(201)
      .json({ message: "Product added successfully", success: true });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

//get products : /api/product/get
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({}).sort({ createdAt: -1 });
    res.status(200).json({ products, success: true });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

//get single product : /api/product/:id
export const getProductById = async (req, res) => {
  try {
    const { id } = req.body;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ product, success: true });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// change stock  :/api/product/stock
export const changeStock = async (req, res) => {
  try {
    const { id, inStock } = req.body;
    const product = await Product.findByIdAndUpdate(
      id,
      { inStock },
      { new: true },
    );
    res
      .status(200)
      .json({ success: true, product, message: "Stock updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
