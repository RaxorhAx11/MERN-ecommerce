const express = require("express");

const { upload } = require("../../helpers/cloudinary");

const {
  handleImageUpload,
  addProduct,
  editProduct,
  fetchAllProducts,
  deleteProduct,
} = require("../../controllers/admin/products-controller");



const router = express.Router();
router.post("/upload", upload.single("image"), handleImageUpload);
router.post("/upload-image", upload.single("my_file"), handleImageUpload);
router.post("/add", addProduct);
router.put("/edit/:id", editProduct);
router.delete("/delete/:id", deleteProduct);
router.get("/get", fetchAllProducts);

module.exports = router; 


/* const express = require("express");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const router = express.Router();

// Configure Cloudinary
cloudinary.config({
  cloud_name: "dfgkpkv4b",
  api_key: "247351486986242",
  api_secret: "**********",
});

// Configure Multer with Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "products",
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});
const upload = multer({ storage });

// Add Product Route
router.post("/add-product", upload.single("image"), async (req, res) => {
  try {
    const { title, description, price, salePrice, totalStock, category, brand } = req.body;
    const imageUrl = req.file ? req.file.path : null; // Cloudinary URL

    // Save to MongoDB (example schema)
    const product = new Product({
      title,
      description,
      price,
      salePrice,
      totalStock,
      category,
      brand,
      image: imageUrl,
    });
    await product.save();

    res.json({ success: true, product });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ success: false, message: "Failed to add product" });
  }
});

module.exports = router; */