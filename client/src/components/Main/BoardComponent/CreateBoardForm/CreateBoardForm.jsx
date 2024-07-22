import React, { useState } from "react";

const CreateBoardForm = ({ board, onCreate, onCancel }) => {
  const [name, setName] = useState(board ? board.name : "");
  const [description, setDescription] = useState(
    board ? board.description : ""
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate({ name, description });
  };

  return (
    <form onSubmit={handleSubmit} className="create-board">
      <h3>Create a new Board</h3>
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
      <div className="create-board-buttons">
        <button className="create-board-button-create" type="submit">
          Create
        </button>
        <button
          className="create-board-button-cancel"
          type="button"
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default CreateBoardForm;
