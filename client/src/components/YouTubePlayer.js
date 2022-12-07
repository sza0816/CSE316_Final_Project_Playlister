import React from 'react';
import YouTube from 'react-youtube';
import { GlobalStoreContext } from '../store';
import { useContext,useRef,useState, useEffect } from 'react';
import { Box } from '@mui/system';
import { IconButton } from '@mui/material';
import FastRewindIcon from '@mui/icons-material/FastRewind';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import FastForwardIcon from '@mui/icons-material/FastForward';
import StopIcon from '@mui/icons-material/Stop';
import { ContactSupportOutlined } from '@mui/icons-material';
import Typography from '@mui/material/Typography';

export default function YouTubePlayerExample() {
    // THIS EXAMPLE DEMONSTRATES HOW TO DYNAMICALLY MAKE A
    // YOUTUBE PLAYER AND EMBED IT IN YOUR SITE. IT ALSO
    // DEMONSTRATES HOW TO IMPLEMENT A PLAYLIST THAT MOVES
    // FROM ONE SONG TO THE NEXT
    const {store}=useContext(GlobalStoreContext);
    const [isPlaying,setisPlaying]=useState(true);     // whether is playing 
    const [player,setplayer]=useState(null);         //event.taget
    const playerRef = useRef(null);

    // THIS HAS THE YOUTUBE IDS FOR THE SONGS IN OUR PLAYLIST
    let songIdArray=[];

    let list=store.listToPlay;
    let songArray=list.songs;       //define song array in order to show song info

    for(let i=0;i<list.songs.length;i++){
        let song=list.songs[i].youTubeId;
        songIdArray.push(song);
    }

    // console.log("list now playing: " + list);
    // console.log("song Array now playing: " + songArray);
    let playlist=songIdArray;

    // THIS IS THE INDEX OF THE SONG CURRENTLY IN USE IN THE PLAYLIST
    let currentSong = 0;

    const playerOptions = {
        position: "absolute",
        height: '100%',
        width: '100%',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 0,
        },
    };

    // THIS FUNCTION LOADS THE CURRENT SONG INTO
    // THE PLAYER AND PLAYS IT
    function loadAndPlayCurrentSong(player) {
        let songId = playlist[currentSong];
        player.loadVideoById(songId);
        player.playVideo();
    }

    // THIS FUNCTION INCREMENTS THE PLAYLIST SONG TO THE NEXT ONE
    function incSong() {
        currentSong++;
        currentSong = currentSong % playlist.length;
    }

    function onPlayerReady(event) {
        loadAndPlayCurrentSong(event.target);
        event.target.playVideo();
        // console.log(playlist.name,playlist[currentSong],currentSong+1,playlist[currentSong].title,playlist[currentSong].artist);
        setplayer(event.target);
    }

    function PauseSong(event){
        if(isPlaying){
            playerRef.current.getInternalPlayer().pauseVideo();
        }
        else{
            console.log("song already paused");
        }
        setisPlaying(!isPlaying);
    }

    function playSong(event){
        if(!isPlaying){
            playerRef.current.getInternalPlayer().playVideo();
        }
        else{
            console.log("song already playing");
        }
        setisPlaying(!isPlaying);
    }

    // THIS IS OUR EVENT HANDLER FOR WHEN THE YOUTUBE PLAYER'S STATE
    // CHANGES. NOTE THAT playerStatus WILL HAVE A DIFFERENT INTEGER
    // VALUE TO REPRESENT THE TYPE OF STATE CHANGE. A playerStatus
    // VALUE OF 0 MEANS THE SONG PLAYING HAS ENDED.
    function onPlayerStateChange(event) {
        let playerStatus = event.data;
        let player = event.target;
        if (playerStatus === -1) {
            // VIDEO UNSTARTED
            console.log("-1 Video unstarted");
        } else if (playerStatus === 0) {
            // THE VIDEO HAS COMPLETED PLAYING
            console.log("0 Video ended");
            incSong();
            loadAndPlayCurrentSong(player);
        } else if (playerStatus === 1) {
            // THE VIDEO IS PLAYED
            console.log("1 Video played");
        } else if (playerStatus === 2) {
            // THE VIDEO IS PAUSED
            console.log("2 Video paused");
        } else if (playerStatus === 3) {
            // THE VIDEO IS BUFFERING
            console.log("3 Video buffering");
        } else if (playerStatus === 5) {
            // THE VIDEO HAS BEEN CUED
            console.log("5 Video cued");
        }
    }       

    return <div style={{padding:"0px"}}>
        <YouTube
        videoId={playlist[currentSong]}
        opts={playerOptions}
        onReady={onPlayerReady}
        onStateChange={onPlayerStateChange}
        songInfo={songArray[currentSong]}
        songId={currentSong}
        ref={playerRef} />;

        <Box id="player-button-box">
            <Typography sx={{fontWeight:"bold", color:"black", fontSize: 20, textAlign:"center"}}>Now Playing</Typography>
            <Box component={'span'} style={{display:"flex",flexDirection:"column",paddingLeft:"20px"}}>
                <Typography>Playlist:<span>&nbsp;</span>{list.name}</Typography>
                <Typography>Song #:<span>&nbsp;</span> {currentSong+1}</Typography>
                <Typography>Title:<span>&nbsp;</span> {songArray[currentSong].title}</Typography>
                <Typography>Artist: <span>&nbsp;</span>{songArray[currentSong].artist}</Typography>
            </Box>
            <Box id="player-buttons" style={{display:"flex", flexDirection:"row", alignSelf:"center", color:"black"}}>
              <IconButton style={{color:"black"}}><FastRewindIcon></FastRewindIcon></IconButton>
              <IconButton style={{color:"black"}} onClick={PauseSong}><StopIcon></StopIcon></IconButton>
              <IconButton style={{color:"black"}} onClick={playSong}><ArrowRightIcon></ArrowRightIcon></IconButton>
              <IconButton style={{color:"black"}}><FastForwardIcon></FastForwardIcon></IconButton>
            </Box>
        </Box>
    </div>
}
