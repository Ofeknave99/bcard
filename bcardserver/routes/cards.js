const express = require("express");
const router = express.Router();
const joi = require("joi");
const auth = require("../middleware/auth");
const Card = require("../modules/card");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const cardSchema = joi.object({
  title: joi.string().required(),
  sutitle: joi.string(),
  description: joi.string(),
  phone: joi.string(), 
  email: joi.string().email(),
  web: joi.string().min(0),
  image: joi.string(),
  state: joi.string().min(0),
  country: joi.string(),
  city: joi.string(),
  street: joi.string(),
  Hosenumber: joi.number().min(0),
  zip: joi.number().min(0),
  owner: joi.string(),
});


// Get all cards
router.get("/", async (req, res) => {
  try {
    const cards = await Card.find();
    if (!cards || cards.length === 0)
      return res.status(400).send("There are no tickets");
    res.status(200).send(cards);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get mycards
router.get("/MyCard", auth, async (req, res) => {
  try {
    const cards = await Card.find({ owner: req.payload.email });
    if (!cards || cards.length === 0)
      return res.status(400).send("There are no tickets");
    res.status(200).send(cards);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get card by _id
router.get("/:_id", async (req, res) => {
  try {
    const card = await Card.findOne({ _id: req.params._id });
    if (!card)
      return res.status(400).send("The card details are not available");
    res.status(200).send(card);
  } catch (error) {
    res.status(400).send(error);
  }
});


router.post("/", auth, async (req, res) => {
  try {
    if (req.payload.role !== "admin" && req.payload.role !== "business")
      return res
        .status(400)
        .send("הכרטיס נכשל");

    // Joi validation
    const { error } = cardSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Check if card exists by title and owner
    const card = await Card.findOne({ title: req.body.title, owner: req.body.owner });
    if (card) return res.status(400).send("Card already exists");

    // Add the new card and save
    const newCard = new Card(req.body);
    await newCard.save();

    // Return response
    res.status(201).send(`Card "${newCard.title}" added successfully.`);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Update card by owner/Admin
router.put("/:_id", auth, async (req, res) => {
  try {
    if (req.payload.role !== "admin" && req.payload.email !== req.body.owner)
      return res
        .status(400)
        .send("Only Admin or busniess");

    // 1. Joi validation
    const { error } = cardSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // 2. Verify & Update card by req _id
    const card = await Card.findByIdAndUpdate(req.params._id, req.body, { new: true });
    if (!card) return res.status(400).send("No such card");

    // 3. Return response
    res.status(200).send(`${card.title} updated successfully!!`);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete card
router.delete("/:_id", async (req, res) => {
  try {
    const card = await Card.findByIdAndDelete(req.params._id);
    if (!card) return res.status(400).send("This card does not exist");
    res.status(200).send(card);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
