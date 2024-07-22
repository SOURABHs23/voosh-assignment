import React, { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import Card from "./Card";
import CreateCardForm from "./CreateCardForm";

import { Droppable, Draggable } from "react-beautiful-dnd";
import { Button } from "@mui/material";

const List = ({ list, onUpdateList, onDeleteList, onDone }) => {
  //State to control when to refresh the fetching of cards
  const [refreshCards, setRefreshCards] = useState(false);
  //State to control when the cards are ready to be displayed
  const [cardsDataReady, setCardsDataReady] = useState(false);
  //List edit
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(list.name);
  //Card create
  const [cards, setCards] = useState([]);
  const [showAddCardForm, setShowAddCardForm] = useState(false);

  useEffect(() => {
    const fetchCards = async () => {
      if (list._id) {
        try {
          const response = await axios.get(`/api/lists/${list._id}/cards`);
          if (response.data.length > 0) {
            setCards(response.data);
            setRefreshCards(false);
            setCardsDataReady(true);
          }
        } catch (error) {
          console.error("Error fetching cards:", error);
        }
      }
    };

    fetchCards();
  }, [refreshCards]);

  //Edit List
  const handleNameChange = (e) => {
    setEditedName(e.target.value);
  };
  const handleSave = () => {
    onUpdateList(list._id, { ...list, name: editedName });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedName(list.name); // Revert to original name
    setIsEditing(false);
  };

  //Create card
  const handleCreateCard = async (listId, cardData) => {
    try {
      const fullCardData = { ...cardData, list_id: list._id };
      const response = await axios.post(`/api/cards`, fullCardData);
      setCardsDataReady(false);
      setCards([...cards, response.data]);
      setShowAddCardForm(false);
      setRefreshCards(true);
    } catch (error) {
      console.error("Error creating card:", error);
    }
  };
  const handleUpdateCard = async (cardId, updatedCardData) => {
    try {
      const response = await axios.put(`/api/cards/${cardId}`, updatedCardData);
      setCards(
        cards.map((card) => (card._id === cardId ? response.data : card))
      );
      setCardsDataReady(false);
      setRefreshCards(true);
    } catch (error) {
      console.error("Error updating card:", error);
    }
  };
  const handleDeleteCard = async (cardId) => {
    if (window.confirm("Are you sure you want to delete this card?")) {
      try {
        await axios.delete(`/api/cards/${cardId}`);
        setCards(cards.filter((card) => card._id !== cardId));
      } catch (error) {
        console.error("Error deleting card:", error);
      }
    }
  };

  return (
    <article className="list">
      <section className="list-title">
        {isEditing ? (
          <section className="list-edit">
            <input type="text" value={editedName} onChange={handleNameChange} />
            <div className="list-edit-buttons">
              <Button onClick={handleSave}   variant="contained"
            color="primary"
            sx={{textTransform:"capitalize"}} size="small">Save</Button>
              <Button onClick={handleCancel}
                variant="contained"
                color="primary"
                sx={{textTransform:"capitalize"}} size="small">Cancel</Button>
            </div>
          </section>
        ) : (
          <>
            <div className="list-header">
              <DeleteIcon onClick={() => onDeleteList(list._id)} />
              <h2>{list.name}</h2>
              <EditIcon onClick={() => setIsEditing(true)} />
            </div>
          </>
        )}
      </section>
      <section className="list-cards">
        <Droppable droppableId={list._id.toString()}>
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {cardsDataReady
                ? cards.map((card, index) => (
                    <Draggable
                      key={card._id}
                      draggableId={card._id.toString()}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <Card
                            card={card}
                            onUpdateCard={handleUpdateCard}
                            onDeleteCard={handleDeleteCard}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))
                : null}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        {showAddCardForm ? (
          <>
            <section className="create-card">
              <CreateCardForm
                onCardCreate={handleCreateCard}
                onCancel={() => setShowAddCardForm(false)}
                listId={list._id}
              />
            </section>
          </>
        ) : (
          
          <Button
            className="add-card-button"
            onClick={() => setShowAddCardForm(true)}
            variant="contained"
            color="primary"
            sx={{textTransform:"capitalize"}}
>
            Add Card
          </Button>
        )}
      </section>
    </article>
  );
};

export default List;
