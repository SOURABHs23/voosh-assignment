const { model } = require("mongoose");
const lists = require("../models/lists.model");

const getListsByBoardId = async (req, res) => {
  const id = req.params.id;
  try {
    const listsData = await lists.getListsByBoardId(id);
    res.status(200).json(listsData);
  } catch (error) {
    res.status(400).json(error.message);
  }
};
const getList = async (req, res) => {
  const listId = req.params.id;
  try {
      const list = await lists.getListById(listId);
      if (list) {
          res.status(200).json(list);
      } else {
          res.status(404).json({ message: "List not found" });
      }
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};

const createList = async (req, res) => {
  let listData = req.body;
  try {
    await lists.createList(listData);
    res.status(201).json({
      message: "List Created!",
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const updateList = async (req, res) => {
  let id = req.params.id;
  let listData = req.body;
  try {
    const updatedList = await lists.updateList(id, listData);
    res.status(200).json({
      message: "List updated: " + req.body.name,
      list: req.body,
    });
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const deleteList = async (req, res) => {
  const id = req.params.id;
  try {
    await lists.deleteList(id);
    res.status(200).json({
      message: "List deleted: " + id,
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

module.exports = {
  getListsByBoardId,
  getList,
  createList,
  updateList,
  deleteList,
};
