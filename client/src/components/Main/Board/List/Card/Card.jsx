import React, { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import EditCardForm from "../EditCardForm";
import { Box, Paper } from "@mui/material";
import {TextField} from '@mui/material';

const Card = ({ card, onUpdateCard, onDeleteCard }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(true);

  const handleUpdate = (cardId, updatedCardData) => {
    onUpdateCard(cardId, updatedCardData);
    setIsEditing(false);
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };



  return (
    <article className="card">
      {isEditing ? (
        <>
          <section className="card-edit">
            <EditCardForm
              card={card}
              onCardUpdate={handleUpdate}
              onCancel={() => setIsEditing(false)}
            />
          </section>
        </>
      ) : (
        <>
          <div className="card-header" onClick={toggleCollapse}>
            <DeleteIcon onClick={() => onDeleteCard(card._id)} />
            <h4>{card.name}</h4>
            <EditIcon onClick={() => setIsEditing(true)} />
          </div>
          <p className={`card-content ${isCollapsed ? "hidden" : "visible"}`}>
            {card.description}
          </p>
          
        </>
      )}
    </article>
  );
};

export default Card;
