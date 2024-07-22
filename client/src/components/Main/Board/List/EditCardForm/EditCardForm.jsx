// import React, { useState } from "react";

// const EditCardForm = ({ card, onCardUpdate, onCancel }) => {
//   const [editedName, setEditedName] = useState(card.name);
//   const [editedDescription, setEditedDescription] = useState(card.description);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onCardUpdate(card._id, {
//       name: editedName,
//       description: editedDescription,
//     });
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         type="text"
//         value={editedName}
//         onChange={(e) => setEditedName(e.target.value)}
//         placeholder="Card Name"
//       />
//       <textarea
//         value={editedDescription}
//         onChange={(e) => setEditedDescription(e.target.value)}
//         placeholder="Description"
//       />
//       <div className="card-edit-buttons">
//         <button type="submit">Update</button>
//         <button type="button" onClick={onCancel}>
//           Cancel
//         </button>
//       </div>
//     </form>
//   );
// };

// export default EditCardForm;


import React, { useState } from "react";
// import { TextField, Button, Box, Grid } from "@material-ui/core";
import {TextField, Button, Box, Grid} from '@mui/material';

const EditCardForm = ({ card, onCardUpdate, onCancel }) => {
  const [editedName, setEditedName] = useState(card.name);
  const [editedDescription, setEditedDescription] = useState(card.description);

  const handleSubmit = (e) => {
    e.preventDefault();
    onCardUpdate(card._id, {
      name: editedName,
      description: editedDescription,
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} p={2}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            variant="outlined"
            label="Card Name"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
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
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            variant="outlined"
            label="Description"
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            multiline
            rows={4}
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
        </Grid>
        <Grid item xs={12} container justify="flex-end" spacing={2} >
          <Button
            variant="contained"
            color="primary"
            type="submit"
            style={{ marginRight: '8px' , textTransform: 'capitalize' }} 

          >
            Update
          </Button>
          <Button variant="contained" onClick={onCancel}
          style={{ textTransform: 'capitalize' }}

          >
            Cancel
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EditCardForm;
