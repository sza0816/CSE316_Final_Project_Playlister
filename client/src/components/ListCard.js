import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import Box from '@mui/material/Box';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import DeleteIcon from '@mui/icons-material/Delete';

import Button from '@mui/material/button'
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import AuthContext from '../auth';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Stack from '@mui/material/Stack';
import {ThumbUpOutlined, ThumbDownOutlined, DeleteOutlined, ForkRightTwoTone} from '@mui/icons-material'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';

import WorkspaceScreen from './WorkspaceScreen';
import EditToolbar from './EditToolbar';

/*
    This is a card in our list of top 5 lists. It lets select
    a list for editing and it has controls for changing its 
    name or deleting it.
    
    @author McKilla Gorilla
*/
function ListCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const [editActive, setEditActive] = useState(false);
    const [text, setText] = useState("");
    const { idNamePair, selected } = props;
    const [Expanded, setExpanded] = useState(false);
    const { auth } = useContext(AuthContext);


    function handleLoadList(event, id) {
        console.log("handleLoadList for " + id);
        if(!Expanded){
            if (!event.target.disabled) {
                let _id = event.target.id;
                if (_id.indexOf('list-card-text-') >= 0)
                    _id = ("" + _id).substring("list-card-text-".length);

                // console.log("load " + event.target.id);

            // CHANGE THE CURRENT LIST
                store.setCurrentList(id);
            }
        }
                
        // if(!Expanded){
        //     //# of views +1
        //     //set current list
        // }
        else if(Expanded){
            store.closeCurrentList();
            
        }
        setExpanded(!Expanded);
    }

    // console.log(store.currentList);       //get the current list object of the card

    function handleToggleEdit(event) {
        event.stopPropagation();
        toggleEdit();
    }

    function toggleEdit() {
        let newActive = !editActive;
        if (newActive) {
            store.setIsListNameEditActive();
        }
        setEditActive(newActive);
    }

    async function handleDeleteList(event, id) {
        event.stopPropagation();
        let _id = event.target.id;
        _id = ("" + _id).substring("delete-list-".length);
        store.markListForDeletion(id);
    }

    function handleKeyPress(event) {
        if (event.code === "Enter") {
            let id = event.target.id.substring("list-".length);
            store.changeListName(id, text);
            toggleEdit();
        }
    }
    function handleUpdateText(event) {
        setText(event.target.value);
    }

    let createdAuthor="By: ";
    if(auth.getUsername()!=undefined)
        createdAuthor+=auth.getUsername();
    // console.log(createdAuthor);

    function addLike(event){
        console.log("like added");
    }

    function addDislike(event){
        console.log("Dislike added");
    }

    function handlePlaySongs(event){
        if(event.detail===1 ){
            event.stopPropagation()
            store.findAndStoreListById(idNamePair._id);
            console.log("handle play song in listcard"+ idNamePair._id);
        }
    }

    let selectClass = "unselected-list-card";
    if (selected) {
        selectClass = "selected-list-card";
    }
    let cardStatus = false;
    if (store.isListNameEditActive) {
        cardStatus = true;
    }

    let workspace;
    if (store.currentList){
        workspace=<WorkspaceScreen></WorkspaceScreen>
    }

    let editToolbar = "";
    if (auth.loggedIn) {
        if (store.currentList) {
            editToolbar = <EditToolbar />;
        }
    }

    //let likeDislike stack;
    //let publishListens box;
    // if the current song is published 
        //set up like and dislike buttons
        //set up published and listens line

    let cardElement =
        <Card
            sx={{ borderRadius: 5,border:2, margin:"10px", marginRight: '20px', display: 'flex'}} 
            id={idNamePair._id}
            key={idNamePair._id}
            style={{ width: '96%', borderRadius:"20px", padding: 0, background: "rgb(255,255,242)", display:"block"}}
            onClick={handlePlaySongs}
            >
            <CardHeader
                title={idNamePair.name}
                subheader={createdAuthor}
                action={
                    <div id="buttonbox">
                        <Stack 
                        direction = "row" 
                        justifyContent="space-between" 
                        spacing={1}
                        sx={{p:1}}>
                            {/* edit button */}
                            <IconButton onClick={handleToggleEdit} aria-label='edit'>
                                <EditIcon style={{fontSize:'20pt'}} />
                            </IconButton>

                            {/* display like and dislike buttons if published */}
                            <Stack direction="row" justifyContent="space-between" >
                            <IconButton onClick={addLike}>
                                <ThumbUpOutlined sx={{fontSize:'20pt'}}></ThumbUpOutlined>
                            </IconButton>
                            <Typography># likes</Typography>
                            <IconButton onClick={addDislike}>
                                <ThumbDownOutlined sx={{fontSize:'20pt'}}></ThumbDownOutlined>
                            </IconButton>
                            <Typography>#dislikes</Typography>
                            </Stack>
                        </Stack>
                    </div>
                }
            >
            </CardHeader>

            <Accordion style={{margin:0, minHeight:0}}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon onClick={(event)=>{handleLoadList(event, idNamePair._id)}}/>}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        style={{minHeight:0 }}
                    >

                        {/* add the box to display time and listens if published */}
                        <Box style={{display:"flex", flexDirection:"row"}}>
                            <Typography>published: </Typography>
                            <Typography>TIME </Typography>
                            <Typography>Listens: </Typography>
                            <Typography># listens</Typography>
                        </Box>
                    </AccordionSummary>
                    <AccordionDetails style={{margin: 0}}>
                       {workspace}
                     
                        <Box display="inline">{editToolbar}</Box>
                        <Box>
                        <Button 
                            onClick={(event) => {
                            handleDeleteList(event, idNamePair._id)
                            }} aria-label='delete'
                            variant="contained"
                            display="inline">
                            Delete List
                        </Button>
                        </Box>
                    </AccordionDetails>

            </Accordion>
        </Card>

    if (editActive) {
        cardElement =
            <TextField
                margin="normal"
                required
                fullWidth
                id={"list-" + idNamePair._id}
                label="Playlist Name"
                name="name"
                autoComplete="Playlist Name"
                className='list-card'
                onKeyPress={handleKeyPress}
                onChange={handleUpdateText}
                defaultValue={idNamePair.name}
                inputProps={{style: {fontSize: 28, backgroundColor:"white", borderRadius: 10}}}
                InputLabelProps={{style: {fontSize: 24}}}
                autoFocus
            />
    }
    return (
        cardElement
    );
}

export default ListCard;