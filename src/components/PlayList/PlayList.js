import React, {useState, useEffect} from 'react'
import {fbStorage} from '../../firebase'
import { connect } from 'react-redux';

const PlayList = (props) => {

    const[playList, setPlayList] = useState([]);

    useEffect(() => {

        fbStorage.child('videos').listAll().then((res) => {
          
            const getVideoData = async (item, index) => {
            
                await item.getDownloadURL().then((url)=>{
    
                    const videoData = {
                        videoName: item.name,
                        videoUrl: url,
                        dataIndex: index
                    };

                    setPlayList((prevState)=>(
                        [
                            ...prevState,
                            videoData
                        ]
                    ));

                });
            }
        
            res.items.forEach((item, index) => {
        
                getVideoData(item, index);

            })
        
        });

    },[]);
    
    return playList.map((item, index) => {

        return (
            <div key={index}>
                <h1>{props.currentVideoURL}</h1>
                <a href={item.videoUrl} target="_blank" rel="noreferrer">{item.videoName}</a>
            </div>
        )

    });

}

const mapStateToProps = state => {
    return {
        currentVideoURL: state.currentVideoURL
    }
}

const mapDispathToProps = dispatch => {
    return {
        setCurrentVideoURL: (value) => dispatch({type: 'SET_CURRENT_VIDEO_URL', value: value})
    }
}

export default connect(mapStateToProps, mapDispathToProps)(PlayList);