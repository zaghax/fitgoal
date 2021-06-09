import { render } from '@testing-library/react';
import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux';

const Player = (props) => {

    const [renderVideo, setRenderVideo] = useState(true);

    useEffect(()=> {

        setRenderVideo(false);

        setTimeout(()=> {
            setRenderVideo(true);
        }, 500)
        
    },[props.currentVideo]);


    return (
        
        renderVideo ? 
        (
            <div className="fit-video-container" >
                <h3 className="fit-video-title">{props.currentVideo.videoName}</h3>
                <div className="fit-video-player">
                    <video controls> 
                        <source src={props.currentVideo.videoUrl} type="video/mp4"/>
                    </video>
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
        currentVideo: state.currentVideo
    }
}

export default connect(mapStateToProps)(Player);