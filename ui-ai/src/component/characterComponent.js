import React, { useState } from "react";
import {
  Avatar,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Paper,
  Typography,
  TextField,
  Select,
  MenuItem
} from "@mui/material";
import AspectRatio from '@mui/joy/AspectRatio';
import { ToastContainer, toast } from "react-toastify";
import CardCover from "@mui/joy/CardCover";
import Box from "@mui/joy/Box";

const CharacterComponent = () => {
  const [character, setCharacter] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [characterName, setCharacterName] = useState("");
  const [characterGender, setCharacterGender] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const handleCharacterChange = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      // Display the form to input character details
      setShowForm(true);
      // Set the selected file
      setSelectedFile(files[0]);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Hide the form
    setShowForm(false);

    // Create a FormData object to hold the character data
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("name", characterName);
    formData.append("gender", characterGender);

    // Save the character data to the characters state
    setCharacter((prevCharacters) => [
      ...prevCharacters,
      {
        name: characterName,
        gender: characterGender,
        file:selectedFile,
        imageURL: URL.createObjectURL(selectedFile),
      },
    ]);

    // Clear the form fields
    setCharacterName("");
    setCharacterGender("");
    setSelectedFile(null);
  };

  const handleCharacterSelect = (characterData) => {
    console.log("Selected Character:", characterData);
  };

  const getCharacters = () => {
    return character.map((characterData, index) => (
      <Card
        variant="outlined"
        orientation="horizontal"
        sx={{
          width: 150,
          display: "inline-block", 
          margin: "0 10px", 
          position: "relative", 
        }}
        key={index}
      >
        <div style={{ position: "relative", width: "100%", paddingBottom: "100%"}}>
          {/* Maintain aspect ratio */}
          <img
            src={characterData.imageURL}
            srcSet={characterData.file}
            loading="lazy"
            alt=""
            style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover" }}
          />
    
    <div style={{ position: "relative", bottom: "-150px", left: "10px" }}>
          <Typography
            level="h2"
            fontSize="lg"
            id="card-description"
            color={"white"}
            
         
          >
            {characterData.name}
          </Typography>
            <Button
              size="sm"
              variant="contained"
              color="primary"
              onClick={() => handleCharacterSelect(characterData)}
            >
              Choose
            </Button>
          </div>
        </div>
      </Card>
    ));
    
    
  };

  return (
    <div>
      <Grid container spacing={1}>
        {getCharacters()}
      </Grid>

      <input
        accept="image/*"
        style={{ display: "none" }}
        id="upload-button"
        type="file"
        multiple
        onChange={handleCharacterChange}
      />
      <label htmlFor="upload-button">
        <Button variant="contained" color="primary" component="span">
          Upload a Character
        </Button>
      </label>

      {showForm && (
       <form onSubmit={handleFormSubmit}>
       <div style={{ display: "flex", justifyContent: "space-between" }}>
         <div style={{ flex: 1, marginRight: "10px" }}>
           <TextField
             label="Character Name"
             value={characterName}
             onChange={(e) => setCharacterName(e.target.value)}
             required
             fullWidth
           />
         </div>
         <div style={{ flex: 1, marginLeft: "10px" }}>
      <Select
        label="Gender"
        value={characterGender}
        onChange={(e) => setCharacterGender(e.target.value)}
        required
        fullWidth
      >
        <MenuItem value="male">Male</MenuItem>
        <MenuItem value="female">Female</MenuItem>
      </Select>
    </div>
       </div>
       <Button type="submit" variant="contained" color="primary">
         save
       </Button>
     </form>
      )}
    </div>
  );
};

export default CharacterComponent;

// import React, { useState } from 'react';
// import { Avatar, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, Paper, Typography } from '@mui/material';
// // import characterReducer from '../Reducer/Character-reducer';
// // import { useDispatch, useSelector } from "react-redux";
// import { ToastContainer, toast } from 'react-toastify';
// // import { makeStyles } from '@mui/styles';
// // import './CharacterComponent.css';

// const useStyles = () => ({
//   root: {
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     // padding: theme.spacing(3),
//   },
//   cardMediaWrapper: {
//     position: 'relative',
//     paddingTop: '100%', // 1:1 aspect ratio (height/width)
//   },
//   cardMedia: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     width: '100%',
//     height: '100%',
//     objectFit: 'cover',
//   },
//   card: {
//     width: 300,
//     // margin: theme.spacing(2),
//   },

//   cardContent: {
//     height: 100,
//   },
//   dialogContent: {
//     display: 'flex',
//     flexDirection: 'column',
//   },
//   dialogActions: {
//     justifyContent: 'flex-end',
//   },
// });

// const CharacterComponent = () => {
//   const classes = useStyles();
//   const [character, setCharacter] = useState([]);

//   const handleCharacterChange = (e) => {
//     const files = e.target.files;
//     if (files && files.length > 0) {
//       const characterArray = Array.from(files).map((file) => {
//         return {
//           file: file,
//           description: prompt(`Enter description `), // Initialize the description as an empty string
//           name: 'Character Name', // Default name, you can modify this
//           imageURL: URL.createObjectURL(file)
//         };
//       });
//       setCharacter((prevCharacters) => [...prevCharacters, ...characterArray]);

//     }
//   };

//   // const handleCharacterChangeSave = (e) => {
//   //   const files = e.target.files;
//   //   if (files && files.length > 0) {
//   //     const formData = new FormData();
//   //     formData.append('file', files[0]);
//   //     formData.append('description', characterDescription);
//   //     formData.append('name', characterName);

//   //     axios.post('http://localhost:8000/save_character/', formData)
//   //       .then((response) => {
//   //         // Handle the response here if needed
//   //         console.log('Character saved successfully:', response.data);
//   //         // Update your state or perform any other action as needed
//   //       })
//   //       .catch((error) => {
//   //         console.error('Error saving character:', error);
//   //         // Handle errors here if needed
//   //       });
//   //   }
//   // };

//   // const getCharacters = () => {
//   //   return character.map((imageURL, index) => (
//   //     <Grid key={index} item xs={12} sm={6} md={4}>
//   //       <Card style={{ margin: '20px', padding: '10px', Width: '300px' }}>
//   //         <CardMedia
//   //           component="img"
//   //           image={imageURL}
//   //           alt={`Preview ${index + 1}`}
//   //           style={{ width: '300px', height: '200px', objectFit: 'cover' }}
//   //         />
//   //       </Card>
//   //     </Grid>
//   //   ));
//   // };

//   const handleTalkToClick = (index) => {
//     // Implement the action when the "Talk to" button is clicked
//     // For example: alert(`Talking to ${character[index].name}`);
//     // Replace the alert with your desired action
//   };

//   const getCharacters = () => {
//     return character.map((characterData, index) => (
//       <Grid key={index} item xs={12} sm={6} md={4}>
//         <Card style={{ margin: '20px', padding: '10px', width: '300px' }}>
//           <CardActionArea>
//             <CardMedia
//               component="img"
//               image={characterData.imageURL}
//               alt={`Preview ${index + 1}`}
//               style={{ width: '300px', height: '200px', objectFit: 'cover' }}
//             />
//             {/* <Avatar alt="Remy Sharp" src={characterData.imageURL} /> */}
//             <CardContent>
//               <Typography gutterBottom variant="h5" component="div">
//                 {characterData.name}
//               </Typography>
//               {characterData.description.trim() ? ( // Check if description is not empty
//                 <Typography variant="body2" color="text.secondary">
//                   {characterData.description}
//                 </Typography>
//               ) : (
//                 <Typography variant="body2" color="text.secondary" fontStyle="italic">

//                  <input type='text' placeholder='desc'
//                  style={{
//                   border: '0px solid #ccc',
//                   borderRadius: '0px',
//                   padding: '8px 12px',
//                   marginBottom: '16px',
//                   width: '100%',
//                   boxSizing: 'border-box',
//                 }}
//                 ></input>
//                 </Typography>
//               )}
//             </CardContent>
//           </CardActionArea>
//           <CardActions>
//             <Button size="small" color="primary" onClick={() => handleTalkToClick(index)}>
//               Talk to
//             </Button>
//           </CardActions>
//         </Card>
//       </Grid>
//     ));
//   };

//   return (
//     <div>
//       <Grid container spacing={1}>
//         {getCharacters()}
//       </Grid>

//       <input
//         accept="image/*"
//         style={{ display: 'none' }}
//         id="upload-button"
//         type="file"
//         multiple
//         onChange={handleCharacterChange}
//       />
//       <label htmlFor="upload-button">
//         <Button variant="contained" color="primary" component="span">
//           Choose a Character
//         </Button>
//       </label>

//     </div>
//   );
// };

// export default CharacterComponent;
