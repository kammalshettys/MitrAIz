import React, { useState } from 'react';
import { Avatar, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, Paper, Typography } from '@mui/material';
// import characterReducer from '../Reducer/Character-reducer';
// import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
// import { makeStyles } from '@mui/styles';
// import './CharacterComponent.css';

const useStyles = () => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    // padding: theme.spacing(3),
  },
  cardMediaWrapper: {
    position: 'relative',
    paddingTop: '100%', // 1:1 aspect ratio (height/width)
  },
  cardMedia: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  card: {
    width: 300,
    // margin: theme.spacing(2),
  },

  cardContent: {
    height: 100,
  },
  dialogContent: {
    display: 'flex',
    flexDirection: 'column',
  },
  dialogActions: {
    justifyContent: 'flex-end',
  },
});

const CharacterComponent = () => {
  const classes = useStyles();
  const [character, setCharacter] = useState([]);


  // const handleCharacterChange = (e) => {
  //   const files = e.target.files;
  //   if (files && files.length > 0) {
  //     const characterArray = Array.from(files).map((file) => URL.createObjectURL(file));
  //     setCharacter((prevImages) => [...prevImages, ...characterArray]);
  //     // characterReducer(SAVE_CHARACTER)

  //   }
  // };
  const handleCharacterChange = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const characterArray = Array.from(files).map((file) => {
        return {
          file: file,
          description: prompt(`Enter description `), // Initialize the description as an empty string
          name: 'Character Name', // Default name, you can modify this
          imageURL: URL.createObjectURL(file)
        };
      });
      setCharacter((prevCharacters) => [...prevCharacters, ...characterArray]);
    //   toast.success('Uploaded successfully!', {
    //     position: 'top-right',
    //     autoClose: 2000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    // });
    }
  };


  // const getCharacters = () => {
  //   return character.map((imageURL, index) => (
  //     <Grid key={index} item xs={12} sm={6} md={4}>
  //       <Card style={{ margin: '20px', padding: '10px', Width: '300px' }}>
  //         <CardMedia
  //           component="img"
  //           image={imageURL}
  //           alt={`Preview ${index + 1}`}
  //           style={{ width: '300px', height: '200px', objectFit: 'cover' }}
  //         />
  //       </Card>
  //     </Grid>
  //   ));
  // };

  const handleTalkToClick = (index) => {
    // Implement the action when the "Talk to" button is clicked
    // For example: alert(`Talking to ${character[index].name}`);
    // Replace the alert with your desired action
  };


  const getCharacters = () => {
    return character.map((characterData, index) => (
      <Grid key={index} item xs={12} sm={6} md={4}>
        <Card style={{ margin: '20px', padding: '10px', width: '300px' }}>
          <CardActionArea>
            <CardMedia
              component="img"
              image={characterData.imageURL}
              alt={`Preview ${index + 1}`}
              style={{ width: '300px', height: '200px', objectFit: 'cover' }}
            />
            {/* <Avatar alt="Remy Sharp" src={characterData.imageURL} /> */}
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {characterData.name}
              </Typography>
              {characterData.description.trim() ? ( // Check if description is not empty
                <Typography variant="body2" color="text.secondary">
                  {characterData.description}
                </Typography>
              ) : (
                <Typography variant="body2" color="text.secondary" fontStyle="italic">
                 
                 <input type='text' placeholder='desc'
                 style={{
                  border: '0px solid #ccc',
                  borderRadius: '0px',
                  padding: '8px 12px',
                  marginBottom: '16px',
                  width: '100%',
                  boxSizing: 'border-box',
                }}
                ></input>
                </Typography>
              )}
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small" color="primary" onClick={() => handleTalkToClick(index)}>
              Talk to
            </Button>
          </CardActions>
        </Card>
      </Grid>
    ));
  };

  return (
    <div>
      <Grid container spacing={2}>
        {getCharacters()}
      </Grid>

      <input
        accept="image/*"
        style={{ display: 'none' }}
        id="upload-button"
        type="file"
        multiple
        onChange={handleCharacterChange}
      />
      <label htmlFor="upload-button">
        <Button variant="contained" color="primary" component="span">
          Choose a Character
        </Button>
      </label>
    </div>
  );
};

export default CharacterComponent;
