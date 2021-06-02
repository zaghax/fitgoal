import React, {useState} from 'react';
import {fbStorage, fbDataBase} from '../../firebase'


export default function UploadVideos(){

    //Component State

    const[state, setState] = useState({
        uploaderValue: 0,
        videoName: '',
        videoFile: {},
        videoFileName: '',
        videoType: ''
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
                // videoFileName: e.target.files[0].name,
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
                            videoType: ''
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
            className="form"
            onSubmit={uploadVideo}
        >
            <h3>Upload Video</h3>
            <label>Name:</label>
            <input type="text" onChange={getVideoName} value={state.videoName}/>
            <label>Select your file</label>
            <input type="file" onChange={getVideoFile} className="upld-btn" accept="video/*" ref={(e)=>{getInputFile(e)}}/>
            <progress className="progressBar" value={state.uploaderValue} max="100">0%</progress>
            <button type="submit" disabled={state.videoName !== '' && state.videoFile !== {} ? false : true }>Upload</button>
        </form>
    )

}