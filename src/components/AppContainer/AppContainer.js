import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import UploadVideos from '../UploadVideos/UploadVideos';
import PlayList from '../PlayList/PlayList';
import Player from '../Player/Player';
import {fbDataBase} from '../../firebase';


const AppContainer = (props) =>{ 

    useEffect(() => {

        const playListDB = fbDataBase.collection('playList');
       
        playListDB.onSnapshot(()=> {

            const playList = [];
            
            playListDB.get().then(snap => {
                snap.forEach(doc => {
                    const res = doc.data();
                    playList.push(res)
                })
            }).then(()=> {
                props.setVideoPlayList(playList);
                let currentVideo = playList.length - 1;
                props.setCurrentVideo(playList[currentVideo])
            })

            
        })

    },[]);


    return (
        <div>
            <Player/>
            <UploadVideos/>
            <PlayList/>
        </div>
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
        setVideoPlayList: (value) => dispatch({type: 'SET_VIDEO_PLAYLIST', value: value})
    }
}

export default connect(mapStateToProps, mapDispathToProps)(AppContainer);