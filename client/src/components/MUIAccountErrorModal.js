import { useContext } from 'react'
import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import auth from './auth/index.js';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function AccountErrorModal(){

    console.log(auth.errMsg);

    let er=auth.errMsg;
    console.log(er);

    return(
        <Modal
            open={er}
        >
            <Box sx={style}>
                <div className="modal-dialog">
                    <header className='dialog-header'>
                        ERROR! Please try again!
                    </header>
                    <div id="confirm-cancel-container">
                        <button
                            id='modal-ok-button'
                            className='modal-button'
                        >OK</button>
                    </div>
                </div>
            </Box>
        </Modal>
    );
    
}