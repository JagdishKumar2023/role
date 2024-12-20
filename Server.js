/* eslint-disable no-undef */
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://127.0.0.1:27017/testing")
  .then(() => console.log("mongoose is connected"))
  .catch((err) => console.log("connection in problem in mongodb", err));

const formSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const User = mongoose.model("tests", formSchema);

app.post("/testing", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ message: "User is exist" });
    }

    const newUser = await User.create({ name, email, password });
    res.json({ message: "user is created", user: newUser });
  } catch (err) {
    res.json("Enternal server error", err);
  }
});

const PORT = 4006;
app.listen(PORT, () => {
  console.log(`server is running in port ${PORT}`);
});
