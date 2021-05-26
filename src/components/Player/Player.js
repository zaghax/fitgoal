import React from 'react'
import { connect } from 'react-redux';

const Player = (props) => {
    return (
        <div>
            <h3>{props.currentVideoURL}</h3>
            <video width="640" height="480" controls> 
                <source src={props.currentVideoURL} type="video/mp4"/>
            </video>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        currentVideoURL: state.currentVideoURL
    }
}

export default connect(mapStateToProps)(Player);