import React, {useState, useEffect} from 'react'
import {fbStorage} from '../../firebase'


function GetPlayList () {

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


    return playList;
}

export default function PlayList(){

    const videos = GetPlayList();

    console.log('videos', videos.length, videos)

    const listVideos = () => {
       
        return videos.map((item, index) => {

            return (
                <div key={index}>
                    <a href={item.videoUrl} target="_blank">{item.videoName}</a>
                </div>
            )
        });

        
    };

    
    return(
        <div>
            {listVideos()}
        </div>
    )
}