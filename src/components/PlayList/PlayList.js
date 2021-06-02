import React from 'react'
import { connect } from 'react-redux';
import {fbDataBase, fbStorage} from '../../firebase';

const PlayList = (props) => {

    const setVideo = (videoCurrentData) => {
        props.setCurrentVideo(videoCurrentData);
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
                <li key={index}>
                    <button onClick={() => {setVideo(item)}}>{item.videoName}</button>
                    <button onClick={() => {removeElement(item)}}>Delete</button>
                </li>
            )
    
        });
    }

    return (
        <ul>
            {renderList()}
        </ul>
    )
    
}

const mapStateToProps = state => {
    return {
        videoPlaylist: state.videoPlaylist
    }
}

const mapDispathToProps = dispatch => {
    return {
        setCurrentVideo: (value) => dispatch({type: 'SET_CURRENT_VIDEO', value: value}),
    }
}

export default connect(mapStateToProps, mapDispathToProps)(PlayList);