import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import { Typography } from '@mui/material'

/*
    Our Status bar React component goes at the bottom of our UI.
    
    @author McKilla Gorilla
*/
function Statusbar() {
    const { store } = useContext(GlobalStoreContext);
    let text ="";
    if (store.currentList)
        text = store.currentList.name;
    else
        text="Your Lists";
    return (
        <div id="playlister-statusbar">
            <Typography variant="h2">{text}</Typography>
        </div>
    );
}

export default Statusbar;