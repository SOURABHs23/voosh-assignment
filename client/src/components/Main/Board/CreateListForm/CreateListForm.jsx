import { TextField,Button } from "@mui/material";
import React, { useState } from "react";

const CreateListForm = ({ onListCreate, onCancel }) => {
  const [listName, setListName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onListCreate({ name: listName });
    setListName("");
  };

  return (
    <form className="create-list" onSubmit={handleSubmit}>
      <TextField
        type="text"
        placeholder="List Name"
        value={listName}
        onChange={(e) => setListName(e.target.value)}
      />
      <div className="create-list-buttons">
        <Button type="submit" variant="contained">Create List</Button>
        <Button type="button" onClick={onCancel} variant="contained">
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default CreateListForm;
