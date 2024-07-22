import axios from "axios";
import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import BoardItem from "./BoardItem";
import CreateBoardForm from "./CreateBoardForm";
import EditBoardForm from "./EditBoardForm";
import { v4 as uuidv4 } from "uuid";

const BoardComponent = () => {
  const [boards, setBoards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshBoards, setRefreshBoards] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editingBoard, setEditingBoard] = useState(null);

  useEffect(() => {
    const fetchBoards = async () => {
      try {
        const currentEmail = localStorage.getItem("email");
        setIsLoading(true); // Start loading
        const userResponse = await axios.get(`/api/users/${currentEmail}`);
        const userId = userResponse.data._id;
        const boardsResponse = await axios.get(`/api/users/${userId}/boards`);
        setBoards(boardsResponse.data);
        setIsLoading(false); // Stop loading after fetching
      } catch (error) {
        console.error(
          "Error fetching boards:",
          error.response ? error.response : error
        );
        setIsLoading(false); // Stop loading if error fetching (temp)
      }
    };
    fetchBoards();
    setRefreshBoards(false);
  }, [refreshBoards]);

  const printBoardItems = () => {
    if (boards.length === 0) {
      return <div>No boards available. Create one!</div>;
    }
    return boards.map((board) => (
      <BoardItem
        key={board._id}
        board={board}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
    ));
  };

  const handleCreate = async (boardData) => {
    if (!boardData.name || !boardData.description) {
      alert("Please fill in all fields");
      return;
    }
    const userEmail = localStorage.getItem("email");
    const userResponse = await axios.get(`/api/users/${userEmail}`);
    const userId = userResponse.data._id;
    const newBoardData = {
      ...boardData,
      user_id: userId,
    };
    try {
      const response = await axios.post("/api/boards", newBoardData);
      setBoards([...boards, response.data]);
      setShowCreateForm(false);
      setRefreshBoards(true);
    } catch (error) {
      console.error("Error creating board:", error);
    }
  };

  const handleEdit = (board) => {
    setEditingBoard(board);
    setShowEditForm(true);
  };

  const handleUpdate = async (boardId, updatedBoardData) => {
    try {
      const response = await axios.put(
        `/api/boards/${editingBoard._id}`,
        updatedBoardData
      );
      setBoards(
        boards.map((board) =>
          board._id === editingBoard._id ? response.data : board
        )
      );
      setShowEditForm(false);
      setEditingBoard(null);
      setRefreshBoards(true);
    } catch (error) {
      console.error("Error updating board:", error);
      setShowEditForm(false);
    }
  };

  const handleDelete = async (boardId) => {
    if (window.confirm("Are you sure you want to delete this board?")) {
      try {
        await axios.delete(`/api/boards/${boardId}`);
        setBoards(boards.filter((board) => board._id !== boardId));
        setRefreshBoards(true);
      } catch (error) {
        console.error("Error deleting board:", error);
      }
    }
  };

  return (
    <section id="boards-page">
      <h1>My Boards</h1>
      {isLoading ? (
        <div>Loading...</div> //LOADING SPINNER...
      ) : (
        <section className="board-list">
          {boards.length > 0 ? printBoardItems() : null}
          {showCreateForm ? (
            <CreateBoardForm
              onCreate={handleCreate}
              onCancel={() => setShowCreateForm(false)}
            />
          ) : (
            <section
              className="create-board-button"
              onClick={() => setShowCreateForm(!showCreateForm)}
            >
              <h2>New Board</h2>
              <AddIcon />
            </section>
          )}
          {showEditForm && editingBoard && (
            <EditBoardForm
              board={editingBoard}
              onEdit={handleUpdate}
              onCancel={() => setShowEditForm(false)}
            />
          )}
        </section>
      )}
    </section>
  );
};

export default BoardComponent;
