import React, {useState} from 'react';
import {fbStorage, fbDataBase} from '../../firebase'


export default function UploadVideos(){

    //Component State

    const[state, setState] = useState({
        uploaderValue: 0,
        videoName: '',
        videoFile: '',
        videoFileName: '',
        videoType: '',
        showProgressBar: false
    });

    //Get the input value to set the file name 

    const getVideoName = (e) => {
        setState(prevState => {
            return {
                ...prevState, 
                videoName: e.target.value
            }
        });
    }

    //Get the input value file to set the video

    const getVideoFile = (e) => {

        const videoType = e.target.files[0].type;
        const fileExtension = videoType.split('/')[1];
        
        setState(prevState => {
            return {
                ...prevState, 
                videoFile: e.target.files[0], 
                videoType: fileExtension 
            }
        })  
          
    }

    let inputFileElement = '';

    const getInputFile = (e) => {
        
        if ( e !== null) {
            inputFileElement = e;
        }

    }

    //Upload video action

    const uploadVideo = async (event) => {

        event.preventDefault();

        setState( prevState => {
            return {...prevState, showProgressBar: true }
        })

        const fileRef = fbStorage.child("videos").child(state.videoName);

        //Upload file process to the firebase storage folder "videos"

        await fileRef.put(state.videoFile).on('state_changed', 
            function progress (snapshot) {

                //Set percentaje value for the uploader bar

                let percentaje = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                
                setState( prevState => {
                    return {...prevState, uploaderValue: percentaje }
                })
            },
            function error (err) {
                console.log(err);
            },
            function complete () {

                //Put the video info inside the firebase database collection "playList" to create the playlist 

                fileRef.put(state.videoFile).snapshot.ref.getDownloadURL().then(function(downloadURL) {

                    const db = fbDataBase.collection("playList");
                    const fbId = new Date().getTime().toString(); //Set an id based in the date to give a playlist order
                    const videoData = {
                        videoName: state.videoName,
                        videoUrl: downloadURL,
                        fbId: fbId,
                        videoType: state.videoType
                    }

                    db.doc(fbId).set(videoData).then(() => {
                    
                        //Clear State and Fields
                        setState({
                            uploaderValue: 0,
                            videoName: '',
                            videoFile: '',
                            videoFileName: '',
                            videoType: '',
                            showProgressBar: false
                        })

                        inputFileElement.value = "";

                        console.log("Document Uploaded");

                    }).catch((error) => {
                        console.error("Error adding document: ", error);
                    })

                });

            }
        );
    }

    return (

        //Print the form 

        <form 
            className="fit-upld-form"
            onSubmit={uploadVideo}
        >
            <div className="fit-row">
                <div className="fit-col fit-col-6">
                    <h3 className="fit-upld-title">Upload your video</h3>
                </div>
                <div className="fit-col fit-col-6">
                    <div className="fit-upld-fields">
                        <label>Video Name:</label>
                        <input type="text" onChange={getVideoName} value={state.videoName} className="fit-upld-input"/>
                        <input type="file" onChange={getVideoFile} className="fit-upld-btn" accept="video/*" ref={(e)=>{getInputFile(e)}}/>
                        {state.showProgressBar ? <progress className="fit-upld-progress-bar" value={state.uploaderValue} max="100">0%</progress> : null}
                        <button type="submit" disabled={state.videoName !== '' && state.videoFile !== '' ? false : true }>Upload</button>
                    </div>   
                </div>
            </div>
            
        </form>
    )

}