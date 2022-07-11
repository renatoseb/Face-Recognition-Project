import { useState } from 'react';
import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid'
import Item from '../utils/Item';
import { boxStyleCols } from '../utils/styles';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import MuiAlert from '@mui/material/Alert';
import Autocomplete from '@mui/material/Autocomplete';


const queryTypes = [
  { label: "Sequential" },
  { label: "RTree" }
]

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const Input = styled('input')({
  display: 'none',
});

const Home = () => {
  const [images, setImages] = useState([]);
  const [image, setImage] = useState(null);
  const [input, setInput] = useState('');
  const [time, setTime] = useState(0)
  const [type, setType] = React.useState('');


  const getImages = async () => {
    const data = new FormData();
    data.append('file', image);

    axios.post(`http://127.0.0.1:5000/top-k-similars/${input}/${type}`, data).then(
      res => {
        console.log("Query received!")
        console.log(res.data.images_paths)
        setImages(res.data.images_paths)
        setTime(res.data.time)
      }
    ).catch(err => console.log(err));

  }

  const uploadImage = async (e) => {
    const files = e.target.files;
    setImage(files[0])
  }

  //const clearImages = () => {
  // setImages([]);
  //}

  const handleInput = (e) => {
    setInput(e.target.value);
  }

  const handleType = (e) => {
    setType(e.target.value);
  }

  return (
    <div style={{ height: '99.7vh' }}>
      <Box sx={{ height: '100%', width: '100%', display: 'flex' }}>

        <Box style={boxStyleCols("100%", "50%", false)}>

          <Typography variant="h2" gutterBottom>
            Facial Recognition
          </Typography>
          <TextField
            id="topK"
            label="Top K"
            variant="outlined"
            sx={{ marginBottom: '10px' }}
            onChange={handleInput}
          />

          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={queryTypes}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Query Type" />}
            onChange={handleType}

          />

          <label htmlFor="contained-button-file">
            <Button variant="contained" component="span" sx={{ marginTop: '10px' }}>
              <Input
                accept="image/*"
                id="contained-button-file"
                multiple
                type="file"
                onChange={uploadImage}
              />
              Upload Image
            </Button>
          </label>

          <IconButton color="primary" >
            <PhotoCamera />
          </IconButton>

          <Button
            variant="contained"
            color="success"
            onClick={() => getImages()}>
            Recognize
          </Button>
        </Box>

        <Box style={boxStyleCols("100%", "50%")}>

          <Grid container>
            <Grid item xs={12}>
              <Item elevation={4}>
                Top K Similar Characters
              </Item>
              <Alert severity="info">Query took: {time} seconds</Alert>
            </Grid>
          </Grid>

          <ImageList sx={{ width: '100%', height: '94%', marginTop: '0px' }}>

            {images.map((item) => (

              <ImageListItem key={item.img}>
                <img
                  src={`${item.img}`}
                  srcSet={`${item.img}`}
                  alt={""}
                  loading="lazy"
                />
                <ImageListItemBar
                  title={item.name}
                  subtitle={""}
                />
              </ImageListItem>
            ))}

          </ImageList>

        </Box>
      </Box>
    </div >
  )
}

export default Home;