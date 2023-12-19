const User = require("../models/user");
const { hashPassword, comparePassword } = require("../helpers/auth");
const jwt = require("jsonwebtoken");
const test = (req, res) => {
  res.json("test is working");
};
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    //check if name was entered
    if (!name) {
      return res.json({ error: "Please enter a name" });
    }
    //check if password is long enough

    if (!password || password.length < 6) {
      return res.json({ error: "Password must be at least 6 characters long" });
    }
    //check email already exists
    const exists = await User.findOne({ email });
    if (exists) {
      return res.json({ error: "Email already exists" });
    }

    const hashedPassword = await hashPassword(password);

    const user = await User.create({ name, email, password: hashedPassword });
    return res.json(user);
  } catch (err) {
    console.log(err);
  }
};

// login auth
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    //if user exist
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ error: "No user found" });
    }
    // check if password match
    const match = await comparePassword(password, user.password);
    if (match) {
      jwt.sign(
        { email: user.email, id: user._id, name: user.name },
        process.env.JWT_SECRET,
        {},
        (err, token) => {
          if (err) throw err;
          res.cookie("token", token).json(user);
          console.log("token :😃", token);
        }
      );
    }
    if (!match) {
      res.json({ error: "password not match" });
    }
  } catch (error) {
    console.log(error);
  }
};

// get profile auth
const getProfile = (req, res) => {
  const { token } = req.cookies;
  console.log("token :🚀", token);
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
      if (err) throw err;
      res.json(user);
    });
  } else {
    res.json(null);
  }
};

module.exports = {
  test,
  registerUser,
  loginUser,
  getProfile,
};
