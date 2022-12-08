import React, { useContext, useEffect,useState } from 'react'
import { GlobalStoreContext } from '../store'
import ListCard from './ListCard.js'
import MUIDeleteModal from './MUIDeleteModal'
import MUIEditSongModal from './MUIEditSongModal'
import MUIRemoveSongModal from './MUIRemoveSongModal'
import NavBar from './NavBar'

import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab'
import List from '@mui/material/List';
import Typography from '@mui/material/Typography'
import { borderBottom, borderRadius, Box } from '@mui/system'

import TabScreen from "./TabScreen";

/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const HomeScreen = () => {
    const { store } = useContext(GlobalStoreContext);

    useEffect(() => {
        store.loadIdNamePairs();
    }, []);

    function handleCreateNewList() {
        store.createNewList();
    }

    let editSongModal,removeSongModal;
    if (store.currentSong){
        editSongModal=<MUIEditSongModal></MUIEditSongModal>;
        // removeSongModal=<MUIRemoveSongModal></MUIRemoveSongModal>;
    }

    let listCard = "";
    if (store) {
        listCard = 
            <List sx={{ width: '100%',overflow:"scroll", borderRadius:"2%"}}>
            {
                store.idNamePairs.map((pair) => (
                    <ListCard
                        key={pair._id}
                        idNamePair={pair}
                        selected={false}
                    />
                    
                ))
            }
            
            {editSongModal}
            {/* {removeSongModal} */}
            </List>;
    }

    // const TabStyle={
    //     cursor: 'pointer',
    //     opacity: '0.6',
    //     background:'white',
    //     border: 0,
    //     outline: 0,
    //     color: 'black'
    // };

    // const ActiveTabStyle={
    //     cursor: 'pointer',
    //     opacity: '0.6',
    //     background:'white',
    //     border: 0,
    //     outline: 0,
    //     color:'black',
    //     borderBottom: "2px solid black",
    //     opacity: 1
    // }

    return (
        <div id="playlist-selector">
            
            <NavBar/>

            <Box id="main-screen"> 
                <div id="list-selector-list">
                    {
                        listCard
                    }
                    <MUIDeleteModal />
                </div>

                {/********* youtube API *********/}
                <Box id="player-comment-box">
                    <TabScreen id="tab-screen"></TabScreen>
                </Box>
 
            </Box>
            <div id="list-selector-heading">
            <Fab 
                color="primary" 
                aria-label="add"
                id="add-list-button"
                onClick={handleCreateNewList}
                style={{background:"transparent",
                    color: "black", 
                    position: "absolute",
                    bottom: "0%",
                    left: "37%",
                }}
            >
                <AddIcon />
            </Fab>
            </div>
        </div>)
}

export default HomeScreen;