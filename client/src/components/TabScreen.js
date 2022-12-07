import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import { GlobalStoreContext } from '../store';
import { useContext, useState } from 'react';
import YouTube from './YouTubePlayer'
import { IconButton } from '@mui/material';
import FastRewindIcon from '@mui/icons-material/FastRewind';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import FastForwardIcon from '@mui/icons-material/FastForward';
import StopIcon from '@mui/icons-material/Stop';
import { ContactSupportOutlined } from '@mui/icons-material';


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
        <Box>
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

export default function TabScreen(props) {
  const [value, setValue] = React.useState(0);
  const { store } = useContext(GlobalStoreContext);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  let youtube;
  if(store.listToPlay){
    if(store.listToPlay.songs.length>0){
      youtube=<YouTube style={{padding:"0px"}}></YouTube>
      console.log(store.listToPlay.songs);
    }
  }

 

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Player" {...a11yProps(0)} />
          <Tab label="Comments" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0} component={"Box"} style={{Padding:"0px"}}>
        {youtube}
      </TabPanel>






      <TabPanel value={value} index={1} component={"Box"}>
       comments area
      </TabPanel>
    </Box>
  );
}