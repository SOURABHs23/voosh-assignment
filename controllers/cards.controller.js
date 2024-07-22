const { model } = require("mongoose");
const cards = require("../models/cards.model");

const getCardsByListId = async (req, res) => {
  const id = req.params.id;
  try {
    const cardsData = await cards.getCardsByListId(id);
    res.status(200).json(cardsData);
  } catch (error) {
    res.status(400).json(error.message);
  }
};
const getCard = async (req, res) => {
  const cardId = req.params.id;
  try {
      const card = await cards.getCardById(cardId);
      if (card) {
          res.status(200).json(card);
      } else {
          res.status(404).json({ message: "Card not found" });
      }
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};

const createCard = async (req, res) => {
  let cardData = req.body;
  try {
    await cards.createCard(cardData);
    res.status(201).json({
      message: "Card Created!",
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const updateCard = async (req, res) => {
  let id = req.params.id;
  let cardData = req.body;
  try {
    const updatedCard = await cards.updateCard(id, cardData);
    res.status(200).json({
      message: "Card updated: " + req.body.name,
      card: req.body,
    });
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const deleteCard = async (req, res) => {
  const id = req.params.id;
  try {
    await cards.deleteCard(id);
    res.status(200).json({
      message: "Card deleted: " + id,
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const moveCard = async (req, res) => {
  try {
    const { id } = req.params;
    const { newListId, newOrder } = req.body;
    await cards.moveCard(id, newListId, newOrder);
    res.status(200).json({ message: 'Card moved successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  getCardsByListId,
  getCard,
  createCard,
  updateCard,
  deleteCard,
  moveCard
};
