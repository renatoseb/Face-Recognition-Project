import { useEffect, useState } from 'react';
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



const itemData = [
  {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: 'Breakfast',
    author: '@bkristastucchio',
    rows: 2,
    cols: 2,
    featured: true,
  },
  {
    img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    title: 'Burger',
    author: '@rollelflex_graphy726',
  },
  {
    img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
    title: 'Camera',
    author: '@helloimnik',
  },
  {
    img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
    title: 'Coffee',
    author: '@nolanissac',
    cols: 2,
  },
  {
    img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
    title: 'Hats',
    author: '@hjrc33',
    cols: 2,
  },
  {
    img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
    title: 'Honey',
    author: '@arwinneil',
    rows: 2,
    cols: 2,
    featured: true,
  },
  {
    img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
    title: 'Basketball',
    author: '@tjdragotta',
  },
  {
    img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
    title: 'Fern',
    author: '@katie_wasserman',
  },
  {
    img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
    title: 'Mushrooms',
    author: '@silverdalex',
    rows: 2,
    cols: 2,
  },
  {
    img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
    title: 'Tomato basil',
    author: '@shelleypauls',
  },
  {
    img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
    title: 'Sea star',
    author: '@peterlaster',
  },
  {
    img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
    title: 'Bike',
    author: '@southside_customs',
    cols: 2,
  },
];

const Input = styled('input')({
  display: 'none',
});

const Home = () => {
  const [images, setImages] = useState([]);
  const [image, setImage] = useState(null);

  const getImages = async () => {
    // const response = await fetch('/api/images');
    // const data = await response.json();
    setImages(itemData);
  }

  const uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'react-app');

  }
  const clearImages = () => {
    setImages([]);
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
          />
          <label htmlFor="contained-button-file">
            <Button variant="contained" component="span">
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

            </Grid>
          </Grid>

          <ImageList sx={{ width: '100%', height: '94%', marginTop: '0px' }}>

            {images.map((item) => (

              <ImageListItem key={item.img}>
                <img
                  src={`${item.img}?w=248&fit=crop&auto=format`}
                  srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                  alt={item.title}
                  loading="lazy"
                />
                <ImageListItemBar
                  title={item.title}
                  subtitle={item.author}
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