const model = require("./Card");

async function getCardsByListId(id) {
  const cards = await model.Card.find({ list_id: id }).sort("order").exec();
  return cards;
}

async function getCardById(id) {
  try {
    const card = await model.Card.findById(id).exec();
    return card;
  } catch (error) {
    throw error;
  }
}

async function createCard(cardData) {
  const { name, description, list_id } = cardData;
  //Count how many cards already are in the list, to give it a order number
  const cardCount = await model.Card.countDocuments({ list_id });

  const card = new model.Card({
    name,
    description,
    list_id,
    order: cardCount, // The new card goes to the end of the list
  });
  const result = await card.save();
  console.log("Card created:", result);
}

async function updateCard(id, cardData) {
  const updatedCard = await model.Card.findByIdAndUpdate(id, cardData, {
    new: true,
  });
  return updatedCard;
}

async function deleteCard(id) {
  const cardToDelete = await model.Card.findById(id);
  await model.Card.findByIdAndDelete(id);
  // Update the order of remaining cards
  await model.Card.updateMany(
    //gte: mongoose-> greater than or equal
    //inc: mongoose -> increment
    { list_id: cardToDelete.list_id, order: { $gt: cardToDelete.order } },
    { $inc: { order: -1 } }
  );
}

async function moveCard(cardId, newListId, newOrder) {
  const card = await model.Card.findById(cardId);
  const oldListId = card.list_id;

  if (oldListId.toString() !== newListId.toString()) {
    // Card is moving to a different list
    // First, make room for the new card
    await model.Card.updateMany(
      //gte: mongoose-> greater than or equal
      //inc: mongoose -> increment
      { list_id: newListId, order: { $gte: newOrder } },
      { $inc: { order: 1 } }
    );
    // Then update the card's list and order
    card.list_id = newListId;
    card.order = newOrder;
    await card.save();
    // Reorder both the old and new lists
    await reorderCards(oldListId);
    await reorderCards(newListId);
  } else {
    // Card stays in the same list
    const increment = newOrder > card.order ? -1 : 1;
    const rangeStart = Math.min(card.order, newOrder);
    const rangeEnd = Math.max(card.order, newOrder);
    // Update order of cards between the old and new positions
    await model.Card.updateMany(
      //gte: mongoose-> greater than or equal
      //lte: mongoose-> lesser than or equal
      //inc: mongoose -> increment
      { list_id: oldListId, order: { $gte: rangeStart, $lte: rangeEnd } },
      { $inc: { order: increment } }
    );
    // Update the moved card's order
    card.order = newOrder;
    await card.save();

    await reorderCards(oldListId);
  }
}

async function reorderCards(listId) {
  const cards = await model.Card.find({ list_id: listId }).sort("order");
  for (let i = 0; i < cards.length; i++) {
    cards[i].order = i;
    await cards[i].save();
  }
}

module.exports = {
  getCardsByListId,
  getCardById,
  createCard,
  updateCard,
  deleteCard,
  moveCard,
};
