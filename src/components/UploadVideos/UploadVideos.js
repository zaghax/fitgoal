import React, {useState} from 'react';
import {fbStorage} from '../../firebase'

export default function UploadVideos(){

    const[uploaderValue, setUploaderValue] = useState(null);

    const onFileChange = async (e) => {
        const file = e.target.files[0];
        const fileRef = fbStorage.child("videos").child(file.name);
        await fileRef.put(file).on('state_changed', 
            function progress (snapshot) {
                let percentaje = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setUploaderValue(percentaje);
            },
            function error (err) {
                
            },
            function complete () {

            }
        );
    }

    return (
        <form className="form">
            <h3>Upload Video</h3>
            <progress className="progressBar" value={uploaderValue} max="100">0%</progress>
            <input type="file" onChange={onFileChange} className="upld-btn"/>
        </form>
    )

}