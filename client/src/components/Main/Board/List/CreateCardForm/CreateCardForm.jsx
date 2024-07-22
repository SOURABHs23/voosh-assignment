import { Button, TextareaAutosize, TextField,Box } from "@mui/material";
import React, { useState } from "react";

const CreateCardForm = ({ onCardCreate, onCancel, listId }) => {
  const [cardName, setCardName] = useState("");
  const [cardDescription, setCardDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onCardCreate(listId, { name: cardName, description: cardDescription });
    setCardName("");
    setCardDescription("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box  
      width={200}
      sx={{margin:"0px 0px 20px 0px"}}
      >
      <TextField
        type="text"
        placeholder="Card Name"
        value={cardName}
    size="small"
        onChange={(e) => setCardName(e.target.value)}

          sx={{
            mb: 2, // Margin bottom
            "& .MuiInputBase-input": {
              backgroundColor: "#bcd0ec", // Input background color
              color:"black"
            },
            "& .MuiInputLabel-root": {
              // backgroundColor: "#fff", // Label background color to maintain visibility
              padding: "0 4px", // Padding to prevent label from overlapping input
            },
          }}
        
      />
      <TextField
      sx={{marignTop:"110px",  "& .MuiInputBase-input": {
        backgroundColor: "#bcd0ec", // Input background color
        color:"black"
      },
      "& .MuiInputLabel-root": {
              // backgroundColor: "#fff", // Label background color to maintain visibility
              padding: "0 4px", // Padding to prevent label from overlapping input
            },
    }}
      
      minRows={2}
        placeholder="Description"
        value={cardDescription}
        onChange={(e) => setCardDescription(e.target.value)}

        maxRows={2}
      />
      </Box>
      <div className="create-card-buttons">
        <Button type="submit"     variant="contained"
            color="primary"
            sx={{textTransform:"capitalize"}}>Create</Button>
        <Button type="button" onClick={onCancel}     variant="contained"
            color="primary"
            sx={{textTransform:"capitalize"}}>
          Cancel
        </Button>
        
      </div>
    </form>
  );
};

export default CreateCardForm;
