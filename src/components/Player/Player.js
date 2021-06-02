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
            <div className="videoContainer">
                <video width="640" height="360" controls> 
                    <source src={props.currentVideo.videoUrl} type="video/mp4"/>
                </video>
                <h3>{props.currentVideo.videoName}</h3>
            </div> 
        ):(
            <div className="videoContainer">
                <p>Loading Video...</p>
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