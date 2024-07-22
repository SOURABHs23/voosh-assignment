const { model } = require("mongoose");
const boards = require("../models/boards.model");

const getBoardsByUserId = async (req, res) => {
  const id = req.params.id;
  try {
    const userBoards = await boards.getBoardsByUserId(id);
    res.status(200).json(userBoards);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const getBoard = async (req, res) => {
  const boardId = req.params.id;
  try {
    const board = await boards.getBoardById(boardId);
    if (board) {
      res.status(200).json(board);
    } else {
      res.status(404).json({ message: "Board not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const createBoard = async (req, res) => {
  // console.log(req.params);
  let boardData = req.body;
  try {
    await boards.createBoard(boardData);
    res.status(201).json({
      message: "Board Created!",
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const updateBoard = async (req, res) => {
  let id = req.params.id;
  let boardData = req.body;
  try {
    const updatedBoard = await boards.updateBoard(id, boardData);
    res.status(200).json({
      message: "Board updated: " + req.body.name,
      board: req.body,
    });
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const deleteBoard = async (req, res) => {
  const id = req.params.id;
  try {
    await boards.deleteBoard(id);
    res.status(200).json({
      message: "Board deleted: " + id,
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

module.exports = {
  getBoardsByUserId,
  getBoard,
  createBoard,
  updateBoard,
  deleteBoard,
};
