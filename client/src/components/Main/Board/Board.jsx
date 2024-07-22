import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { useParams } from "react-router-dom";
import axios from "axios";
import { DragDropContext } from "react-beautiful-dnd";
import Confetti from "react-confetti";

import List from "./List";
import CreateListForm from "./CreateListForm";

const Board = () => {
  const { id } = useParams(); // Get the board ID from the URL
  const [board, setBoard] = useState(null);
  const [lists, setLists] = useState([]);
  //State to control when to refresh the fetching of lists
  const [refreshLists, setRefreshLists] = useState(false);
  //State to control when the lists are ready to be displayed
  const [listsDataReady, setListsDataReady] = useState(false);
  const [showCreateListForm, setShowCreateListForm] = useState(false);
  //Show confetti easter egg
  const [confetti, setConfetti] = useState(false);

  useEffect(() => {
    const fetchBoardData = async () => {
      try {
        const response = await axios.get(`/api/boards/${id}`);
        setBoard(response.data);
      } catch (error) {
        console.error("Error fetching board data:", error);
      }
    };
    fetchBoardData();
  }, [id]);

  useEffect(() => {
    const fetchLists = async () => {
      try {
        const response = await axios.get(`/api/boards/${id}/lists`);
        setLists(response.data);
        setListsDataReady(true);
        setRefreshLists(false);
      } catch (error) {
        console.error("Error fetching lists:", error);
      }
    };

    fetchLists();
  }, [refreshLists]);

  const handleCreateList = async (listData) => {
    try {
      // Include board_id in the data sent to the server
      const fullListData = { ...listData, board_id: board._id };
      const response = await axios.post(`/api/lists`, fullListData);
      setListsDataReady(false);
      setLists([...lists, response.data]);
      setShowCreateListForm(false);
      setRefreshLists(true);
    } catch (error) {
      console.error("Error creating list:", error);
    }
  };

  const handleUpdateList = async (listId, updatedListData) => {
    try {
      const response = await axios.put(`/api/lists/${listId}`, updatedListData);
      setListsDataReady(false);
      setLists(
        lists.map((list) => (list._id === listId ? response.data : list))
      );
      setRefreshLists(true);
    } catch (error) {
      console.error("Error updating list:", error);
    }
  };

  const handleDeleteList = async (listId) => {
    if (window.confirm("Are you sure you want to delete this list?")) {
      try {
        await axios.delete(`/api/lists/${listId}`);
        setLists(lists.filter((list) => list._id !== listId));
      } catch (error) {
        console.error("Error deleting list:", error);
      }
    }
  };

  const onDragEnd = async (result) => {
    const { source, destination } = result;
    // Do nothing if the card is dropped outside a droppable area or dropped in the same place
    if (
      !destination ||
      (source.droppableId === destination.droppableId &&
        source.index === destination.index)
    ) {
      return;
    }
    // Prepare the data for the API call
    const newCardData = {
      newListId: destination.droppableId,
      newOrder: destination.index,
    };
    // API call to update the backend
    try {
      await axios.put(`/api/cards/${result.draggableId}/move`, newCardData);
      setListsDataReady(false);
      setRefreshLists(true);
    } catch (error) {
      console.error("Error moving card:", error.message);
    }
    //Check if confetti present to show confetti for n seconds
    if (result.destination) {
      const destinationListId = result.destination.droppableId;
      const destinationList = lists.find(
        (list) => list._id === destinationListId
      );
      if (destinationList && destinationList.name.includes("🎉")) {
        setConfetti(true); // Activate confetti
        setTimeout(() => {
          setConfetti(false);
        }, 4000); //Duration of confetti
      }
    }
  };

  if (!board) {
    return <div>Loading board...</div>;
  }

  return (
    <>
      <section className="board-header">
        <h1>{board.name}</h1>
        <p>{board.description}</p>
      </section>
      <DragDropContext onDragEnd={onDragEnd}>
        <section className="board-lists">
          {listsDataReady
            ? lists.map((list) => (
                <List
                  key={list._id}
                  list={list}
                  onUpdateList={handleUpdateList}
                  onDeleteList={handleDeleteList}
                />
              ))
            : null}
          {showCreateListForm ? (
            <CreateListForm
              onListCreate={handleCreateList}
              onCancel={() => setShowCreateListForm(false)}
            />
          ) : (
            <section
              className="create-list-button"
              onClick={() => setShowCreateListForm(true)}
            >
              <AddIcon />
              <h2>Create New List</h2>
            </section>
          )}
        </section>
      </DragDropContext>
      {confetti ? <Confetti /> : null}
      <Confetti run={false} opacity={0} />
    </>
  );
};

export default Board;

