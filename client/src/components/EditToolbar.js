import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import RedoIcon from '@mui/icons-material/Redo';
import UndoIcon from '@mui/icons-material/Undo';

/*
    This toolbar is a functional React component that
    manages the undo/redo/close buttons.
    
    @author McKilla Gorilla
*/
function EditToolbar(props) {
    const { store } = useContext(GlobalStoreContext);

    function handleAddNewSong() {
        store.addNewSong();
    }
    function handleUndo() {
        store.undo();
    }
    function handleRedo() {
        store.redo();
    }
    // function handleClose() {
    //     store.closeCurrentList();
    // }

    // if the current list is published
        // toolBar= only delete list button and duplicate buttons

    let modalOpen=store.isDeleteListModalOpen()|| store.isEditSongModalOpen()||store.isRemoveSongModalOpen();
    console.log(modalOpen);
    return (
        <div id="edit-toolbar">
            <Button
                disabled={modalOpen}
                id='add-song-button'
                onClick={handleAddNewSong}
                variant="contained">
                <AddIcon />
            </Button>
            <Button 
                disabled={!store.canUndo()||modalOpen}
                id='undo-button'
                onClick={handleUndo}
                variant="contained">
                    <UndoIcon />
            </Button>
            <Button
                disabled={!store.canRedo()||modalOpen}
                id='redo-button'
                onClick={handleRedo}
                variant="contained">
                    <RedoIcon />
            </Button>
            {/* <Button 
                disabled={modalOpen}
                id='close-button'
                onClick={handleClose}
                variant="contained">
                    <CloseIcon />
            </Button> */}
        </div>
    )
}

export default EditToolbar;