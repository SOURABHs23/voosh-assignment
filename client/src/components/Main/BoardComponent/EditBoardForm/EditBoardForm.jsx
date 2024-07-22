import React, { useState } from "react";

const EditBoardForm = ({ board, onEdit, onCancel }) => {
  const [name, setName] = useState(board.name);
  const [description, setDescription] = useState(board.description);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submission data:", { name, description }); // Add this log
    onEdit(board._id, { name, description });
  };

  return (
    <form onSubmit={handleSubmit} className="edit-board">
      <h2>Edit board {board.name}</h2>
      <input
        type="text"
        placeholder="Board Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit">Update</button>
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
};

export default EditBoardForm;
