import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import { GlobalStoreContext } from '../store';
import { useContext, useState } from 'react';
import YouTube from './YouTubePlayer'

// import "../node_modules/video-react/dist/video-react.css";
// import './App.css';


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function TabScreen() {
  const [value, setValue] = React.useState(0);
  const { store } = useContext(GlobalStoreContext);

  let songInfobox;
  let YouTubePlayer;
  if(store.currentList){

    console.log(store.currentList.songs[0]);
    songInfobox=
        <ul component="span">
            <li>
                <Typography>Playlist: {store.currentList.name}</Typography>

            </li>
            <li>
            <Typography>Song #:     current song number
                {/* {store.currentList.songs[0]} */}
            </Typography>
            </li>
            <li>
            <Typography>Title:       current song title
                {/* {store.currentList.songs[0].title} */}
                </Typography>
            </li>
            <li>
            <Typography>Artist:        current song artist
                {/* {store.currentList.songs[0].artist} */}
                </Typography>
            </li>
        </ul>
    ;
    YouTubePlayer=<YouTube></YouTube>
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Player" {...a11yProps(0)} />
          <Tab label="Comments" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Box id="youtube-player-box">{YouTubePlayer}</Box>
        <Box id="player-button-box" component="span">
            <Typography sx={{fontWeight:"bold", color:"black", fontSize: 20, textAlign:"center"}}>Now Playing</Typography>
            {songInfobox}
        </Box>
        
      </TabPanel>






      <TabPanel value={value} index={1}>
       comments area
      </TabPanel>
    </Box>
  );
}