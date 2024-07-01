import express, { response } from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import multer from "multer";
import path from "path";
import cors from "cors";
import { type } from "os";

const app = express();

app.use(express.json());
app.use(cors());

//Database connection with mongoDB

mongoose.connect(
  "mongodb+srv://shashikant1809:Umesh1809@cluster0.rvolveq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/e-commerce"
);
const port = 4000;

app.get("/", (req, res) => {
  res.send("hey");
});

// image storage engine

const storage = multer.diskStorage({
  destination: "./upload/images",
  filename: function (req, file, cb) {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage: storage });

//creating upload end point for images
app.use("/images", express.static("upload/images"));
app.post("/upload", upload.single("product"), (req, res) => {
  res.json({
    success: 1,
    image_url: `http://localhost:${port}/images/${req.file.filename}`,
  });
});

// schema fot creating products

const Product = mongoose.model("Product", {
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  new_price: {
    type: Number,
    required: true,
  },
  old_price: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },

  avilable: {
    type: Boolean,
    default: true,
  },
});

app.post("/addproduct", async (req, res) => {
  let products = await Product.find({});
  let id;
  if (products.length > 0) {
    let last_product = products[products.length - 1];
    id = last_product.id + 1;
  } else {
    id = 1;
  }
  const product = new Product({
    id: id,
    name: req.body.name,
    image: req.body.image,
    category: req.body.category,
    new_price: req.body.new_price,
    old_price: req.body.old_price,
  });

  await product.save();
  res.json({
    success: 1,
    name: req.body.name,
    message: "Product added successfully",
  });
  console.log(product);
});

//creating api for deleting products

app.post("/removeproduct", async (req, res) => {
  await Product.findOneAndDelete({
    id: req.body.id,
  });
  console.log("Removed");
  res.json({
    success: 1,
    name: req.body.name,
  });
});

// createing api for getting all the products

app.get("/allproducts", async (req, res) => {
  let products = await Product.find({});
  console.log("all product fetched");
  res.json(products);
});

//schema for userModel
const Users = mongoose.model("Users", {
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  cartData: {
    type: Object,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

//creating end point for resistering the user

app.post("/signup", async (req, res) => {
  let check = await Users.findOne({ email: req.body.email });
  if (check) {
    return res.status(400).json({
      success: false,
      error: "existing user find with same email address",
    });
  }

  let cart = {};
  for (let i = 0; i < 300; i++) {
    cart[i] = 0;
  }

  const user = new Users({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    cartData: cart,
  });

  await user.save();

  const data = {
    user: { id: user._id },
  };

  const token = jwt.sign(data, "secret_ecom");
  res.json({
    success: true,
    message: "User Signed Succesfully",
    token,
  });
});

// creating endpoint for user login

app.post("/login", async (req, res) => {
  let user = await Users.findOne({ email: req.body.email });

  if (user) {
    const passCompare = req.body.password === user.password;
    if (passCompare) {
      const data = {
        user: {
          id: user.id,
        },
      };

      const token = jwt.sign(data, "secret_ecom");
      res.json({ success: true, message: "Logged in succesfully", token });
    } else {
      res.json({ success: false, error: "Wrong Password" });
    }
  } else {
    res.json({ success: false, error: "Please Sign up" });
  }
});

app.get("/newcollection", async (req, res) => {
  let products = await Product.find({});
  let newcollection = products.slice(1).slice(-8);
  console.log("New Collection fetched");
  res.send(newcollection);
});

// creating end point for popular in women category

app.get("/popularinwomen", async (req, res) => {
  let products = await Product.find({ category: "women" });
  let popular_in_women = products.slice(1).slice(-4);
  console.log("popular in women is fetched");
  res.send(popular_in_women);
});

// /creating middlewire to fetch user

const fetchUser = async (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ erorr: "Please authenticate using a valid token" });
  } else {
    try {
      const data = jwt.verify(token, "secret_ecom");
      req.user = data.user;
      next();
    } catch (error) {
      res
        .status(401)
        .send({ erorr: "Please authenticate using a valid token" });
    }
  }
};

// creating end point for adding product in cart data

app.post("/addtocart", fetchUser, async (req, res) => {
  // console.log(req.body, req.user);
  console.log("added", req.body.itemId);

  let userData = await Users.findOne({ _id: req.user.id });
  userData.cartData[req.body.itemId] += 1;
  await Users.findOneAndUpdate(
    { _id: req.user.id },
    { cartData: userData.cartData }
  );
  res.send({ success: true, message: "Added in the users cart" });
});

//creaing end point to remove product from the cart data

app.post("/removefromcart", fetchUser, async (req, res) => {
  console.log("removed", req.body.itemId);
  let userData = await Users.findOne({ _id: req.user.id });
  if (userData.cartData[req.body.itemId] > 0) {
    userData.cartData[req.body.itemId] -= 1;
  }
  await Users.findOneAndUpdate(
    { _id: req.user.id },
    { cartData: userData.cartData }
  );
  res.send({ success: true, message: "Removed from the cart the users cart" });
});

// creating end point to get cart data

app.post("/getCart", fetchUser, async (req, res) => {
  console.log("getcart");
  let userData = await Users.findOne({ _id: req.user.id });
  res.json(userData.cartData);
});

app.listen(port, (error) => {
  if (!error) console.log(`port is running on http://localhost:${port}`);
  else console.log(error);
});
