const express = require("express");
const joi = require("joi");
const User = require("../modules/user");
const Card = require("../modules/card");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const fav = require("../modules/fav")
const router = express.Router();
const _ = require("lodash")


const userSchema = joi.object({
  name: joi.string().required(),
  lastName: joi.string().required().label("last name"),
  password: joi.string().required().min(8)
    .pattern(/[A-Z]/, 'uppercase')
    .pattern(/[!@#$%^&*(),.?":{}|<>]/, 'special character')
    .messages({
      'string.pattern.base': 'הסיסמה חייבת לכלול לפחות {{#label}} אחת'
    }),
  email: joi.string().required().email(),
  city: joi.string().required(),
  housenumber: joi.number().required(),
  phone: joi.string().required().min(10),
  country: joi.string().required(),
  street: joi.string().required(),
   state:joi.string(),
   zip:joi.number().min(0),
    image:joi.string(),
   role: joi.string().required(),
});

router.post("/", async (req, res) => {
  try {
    // 1. joi validation
    const { error } = userSchema.validate(req.body);
    if (error) return res.status(400).send(error);

    // 2. check if user already exist
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send("User already exist");

    // 3. create the user
    user = new User(req.body);

    // 4. encrypt the password & save user
    let salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();

/*  */  // 5. create user card
   let favs = new fav({ userId: user._id, cards: [], });

    await favs.save();  

    // 6. create the token & response
    const token = jwt.sign(
      { _id: user._id, role: user.role, email:user.email },
      process.env.jwtKey
    );

    res.status(201).send(token);
  } catch (error) {
    res.status(400).send(error);
  }
});
router.post("/login", async (req, res) => {
  try {
   
    // 2. check if user already exist
    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("Wrong email or password");

    // 3. compare the password
    let result = await bcrypt.compare(req.body.password, user.password);
    if (!result) return res.status(400).send("Wrong email or password");

    // 4. create the token
    const token = jwt.sign(
      { _id: user._id, role: user.role, email:user.email },
      process.env.jwtKey
    );

    res.status(200).send(token);
  } catch (error) {
    res.status(400).send(error);
  }
});




const role = (req, res, next) => {
  if (req.user.role === "admin") {
    next();
  } else {
    res.status(403).send("Access failed");
  }
};

// Route to get user information
router.get("/sendbox", async  (req, res) => {
try {
  let allusers= await User.find({});
  res.status(200).send(allusers)
} catch (error) {
  res.status(400).send(error);
}
});



router.delete("/:id", async(req, res) => {
  try {
    const userId = req.params.id;
    await User.findByIdAndDelete(userId)
     res.sendStatus(200);
  } catch (error) {
     res.status(400).send(error);
    
  }

});
router.get("/profile", auth,async (req, res) => {
  try {
    const user = await User.findById(req.payload._id);
    if (!user) return res.status(404).send("No such user");
    res.status(200).send(_.pick(user, ["_id", "name", "email", "role","image"]));
  } catch (error) {
    res.status(400).send(error);
  }
});


// Update user by id 
router.put("/:_id", auth, async (req, res) => {

    try {
        if (req.payload.role != "admin" && req.payload._id != req.params._id)
            return res.status(400).send("Only the administrator or logged in can update user profile")

        //1. joi validation
        const { error } = userSchema.validate(req.body);
        if (error) return res.status(400).send(error);

        //2. Update user 
        const user = await User.findOneAndUpdate({ _id: req.params._id }, req.body, { new: true });
        if (!user) return res.status(400).send("No user")

        //3. return response
        res.status(200).send(`${user.email}  updated successfuly!!`)

    } catch (error) {
        res.status(400).send(error)
    }
})
// get user by _id 
router.get("/:_id", auth, async (req, res) => {

    try {
        if (req.payload.role != "admin" && req.payload._id != req.params._id)
            return res.status(400).send("Only registered users")
        //1. check&get user by req _id
        const user = await User.findById(req.params._id);
        if (!user) return res.status(400).send("No user")

        //2. return response
        res.status(200).send(_.pick(user, ["_id", "name", "phone", "email", "image", "role", ]))

    } catch (error) {
        res.status(400).send(error)
    }
})






module.exports = router;
