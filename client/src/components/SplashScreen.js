import myImage from "./logo.png";
import Button from '@mui/material/Button';
import { useHistory } from 'react-router-dom'
import Typography from '@mui/material/Typography';

export default function SplashScreen() {
    const history = useHistory();
    return (
        <div id="splash-screen">
            <b className="welcome">Welcome to</b>
            <img className="splash-screen-logo" src={myImage} alt="playlister logo" />
            <Typography id="splash-screen-discription">an application for creating and playing playlists of YouTube music videos</Typography>
            <div className="splash-screen-buttons">
                <Button
                    id='login-button'
                    onClick={() => history.push('/login')}
                    variant="contained">
                        Login
                </Button>
                <Button
                    id='create-account-button'
                    onClick={() => history.push('/register')}
                    variant="contained">
                        Create New Account
                </Button>
                <Button
                    id='guest-button'
                    // onClick={handleGuestContinue}
                    variant="contained">
                    Continue as guest
                </Button>
            </div>
            
        </div>
    )
}