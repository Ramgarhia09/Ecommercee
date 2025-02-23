import { v2 as cloudinary } from 'cloudinary';
import productModel from '../models/productModel.js';  // Adjust path if necessary

// Function to add a product
const addProduct = async (req, res) => {
  try {
    const { name, description, price, category, subCategory, sizes, bestseller } = req.body;

    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];



// console.log(name,description,price,category,subCategory,sizes,bestseller)
//     console.log(image1, image2, image3, image4);
    const images = [image1, image2, image3, image4].filter((item) => item !== undefined);

    // Upload images to Cloudinary and get URLs
    let imagesUrl = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
        return result.secure_url;
      })
    );

    const productData = {
      name,
      description,
      category,
      price: Number(price),
      subCategory,
      bestseller: JSON.parse(bestseller), // If bestseller is sent as a string like 'true'/'false'
      sizes: JSON.parse(sizes),
      images: imagesUrl, // Changed to 'images' for consistency
      date: Date.now(),
    };

    console.log(productData);

    const product = new productModel(productData);
    await product.save();
    res.json({ success: true, message: "Product added" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Function to list all products
const listProducts = async (req, res) => {
  try {
    const products = await productModel.find();
    res.json({ success: true, data: products });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Function to remove a product by ID
const removeProduct = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.body.id);
    
    res.json({ success: true, message: 'Product removed' });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Function to get a single product by ID
const singleProduct = async (req, res) => {
  try {
      const {productId} = req.body;
      const product =await productModel.findById(productId)
    res.json({ success: true,data:product });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Export the functions
export { addProduct, listProducts, removeProduct, singleProduct };
