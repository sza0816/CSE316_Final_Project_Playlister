import { useContext, useState, useEffect} from 'react';
import AuthContext from '../auth';
import { GlobalStoreContext } from '../store'
import { PageViewTypes, SortingTypes} from '../store'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Person from '@mui/icons-material/PersonOutlined'
import Sort from '@mui/icons-material/Sort'
import Home from '@mui/icons-material/HomeOutlined'
import Groups from '@mui/icons-material/GroupsOutlined'
import Functions from '@mui/icons-material/Functions'
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack'
import MenuItem from '@mui/material/MenuItem'
import Menu from '@mui/material/Menu';
export default function NavBar() {
    
    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);
    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);


    const handleSortMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleSortMenuClose = () => {
        setAnchorEl(null);
    };

    const menuId = 'primary-search-account-menu';
    const sortMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleSortMenuClose}
        >   
            <MenuItem>Name (A-Z)</MenuItem>
            <MenuItem>Publish Date (Newest)</MenuItem>
            <MenuItem>Listens (High-Low)</MenuItem>
            <MenuItem>Likes (High-Low)</MenuItem>
            <MenuItem>Dislikes (High-Low)</MenuItem>
        </Menu>
    );


    return (
        <Box sx={{ flexGrow: 1, position: 'relative'}}>
        <AppBar id="NavBar" position="absolute" elevation={0} sx={{background: "#c4c4c4"}}>
                <Toolbar >
                    <Typography                        
                        variant="h4"
                        noWrap
                        component="div"
                        sx={{ display: { xs: 'none', sm: 'block' } }}                        
                    >
                       
                    </Typography>
                    <Stack direction="row" spacing={1}>
                        <IconButton><Home sx={{fontSize: 30}} variant="outlined"></Home></IconButton>
                        <IconButton><Groups sx={{ fontSize: 30}}></Groups></IconButton>
                        <IconButton><Person sx={{fontSize: 30, paddingRight:8}}></Person></IconButton>
                    </Stack>
                        <Box sx={{flexGrow:1}}>
                            <TextField disabled={store.currentList !== null} sx={{width:"75%",background:"white"}} variant="filled" label="Search"></TextField>
                        </Box>

                        <Typography sx={{fontWeight:"bold", color:"black", fontSize: 20}}> SORT BY </Typography>
                        <IconButton disabled={store.currentList !== null} onClick={handleSortMenuOpen} aria-controls={menuId} ><Sort sx={{ fontSize: 40}}></Sort></IconButton>
                        
                </Toolbar>
            </AppBar>
            {
                sortMenu
            }
        </Box>
    );

}