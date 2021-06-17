import React from 'react'
import { connect } from 'react-redux';
import {fbDataBase, fbStorage} from '../../firebase';

const PlayList = (props) => {

    const setVideo = (videoCurrentData, currentlyPlaying) => {
        props.setCurrentVideo(videoCurrentData);
        props.setCurrentVideoIndex(currentlyPlaying);
    }

    const removeElement = (item) => {
        const playListDb = fbDataBase.collection('playList');
        const playListStorage = fbStorage.child("videos").child(`${item.videoName}`);
        playListDb.doc(item.fbId).delete();
        playListStorage.delete();
    }

    const renderList = () => {
        return props.videoPlaylist.map((item, index) => {

            return (
                <li className="fit-playlist-item" key={index}>
                    <a className={`fit-video-link  ${props.currentVideoIndex == index ? 'active': null}`} onClick={() => {setVideo(item, index)}}>{item.videoName}</a>
                    <button className="fit-remove-video-btn" onClick={() => {removeElement(item)}}>Delete</button>
                </li>
            )
    
        });
    }

    return (
        <div className="fit-playlist">
            <ul className="fit-playlist-ul">
                {renderList()}
            </ul>
        </div>
    )
    
}

const mapStateToProps = state => {
    return {
        videoPlaylist: state.videoPlaylist,
        currentVideoIndex: state.currentVideoIndex
    }
}

const mapDispathToProps = dispatch => {
    return {
        setCurrentVideo: (value) => dispatch({type: 'SET_CURRENT_VIDEO', value: value}),
        setCurrentVideoIndex: (value) => dispatch({type: 'SET_CURRENT_VIDEO_INDEX', value: value}),
    }
}

export default connect(mapStateToProps, mapDispathToProps)(PlayList);