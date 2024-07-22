const model = require("./List");

async function getListsByBoardId(id) {
  const lists = await model.List.find({
    board_id: id,
  }).exec();
  return lists;
}

async function getListById(id) {
  try {
    const list = await model.List.findById(id).exec();
    return list;
  } catch (error) {
    throw error;
  }
}

async function createList(listData) {
  const { name, board_id } = listData;
  const list = new model.List({
    name,
    board_id,
  });
  const result = await list.save();
  console.log({
    message: "List created!",
    result,
  });
}

async function updateList(id, listData) {
  const updatedList = await model.List.findByIdAndUpdate(id, listData, {
    new: true,
  });
  return updatedList;
}

async function deleteList(id) {
  await model.List.findByIdAndDelete(id);
}

module.exports = {
  getListsByBoardId,
  getListById,
  createList,
  updateList,
  deleteList,
};
