import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux';
import ReactPlayer from 'react-player';

const Player = (props) => {

    const [renderVideo, setRenderVideo] = useState(false);
    const [playState, setPlayState] = useState(false);


    // When the video ends the player trigger the onPlayerEnd method to call and set the next video in the playlist 

    const onPlayerEnd = () => {
    
        const nextVideoIndex = props.currentVideoIndex + 1;
        const nextVideoData = props.videoPlaylist[nextVideoIndex];

        if (nextVideoIndex < props.videoPlaylist.length){
            props.setCurrentVideo(nextVideoData);
            props.setCurrentVideoIndex(nextVideoIndex);
        }

    }

    const playHandle = () => {
        setPlayState(true)
    }

    useEffect(()=> {

        // Check in if there is a video to play and set a boolean value to render the video player

        Object.keys(props.currentVideo).length !== 0 ? setRenderVideo(true) : setRenderVideo(false);

    },[props.currentVideo]);


    return (

        renderVideo ? 
        (
            <div className="fit-video-container" >
                <h3 className="fit-video-title">{props.currentVideo.videoName}</h3>
                <div className="fit-video-player">
                    <ReactPlayer 
                        url={props.currentVideo.videoUrl} 
                        controls
                        onEnded={onPlayerEnd}
                        playing={playState}
                        width="640"
                        height="300"/>
                        
                    {!playState ? <button className="fit-play-btn icon-play3" onClick={playHandle} /> : null} 
                </div>   
            </div> 
        ):(
            <div className="fit-video-container">
                <h3 className="fit-video-title">Loading Video...</h3>
                <div className="fit-video-player">
                    <p>Loading Video...</p>
                </div>
            </div>
        )
    )
    
}

const mapStateToProps = state => {
    return {
        currentVideo: state.currentVideo,
        currentVideoIndex: state.currentVideoIndex,
        videoPlaylist: state.videoPlaylist
    }
}

const mapDispathToProps = dispatch => {
    return {
        setCurrentVideo: (value) => dispatch({type: 'SET_CURRENT_VIDEO', value: value}),
        setCurrentVideoIndex: (value) => dispatch({type: 'SET_CURRENT_VIDEO_INDEX', value: value}),
    }
}

export default connect(mapStateToProps, mapDispathToProps)(Player);