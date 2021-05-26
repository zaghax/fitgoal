import React, {Component} from 'react'
import { connect } from 'react-redux';

class Player extends Component {
    render(){
        return (
            <div>
                <video width="640" height="480" controls> 
                    <source src={this.props.currentVideoUrl} type="video/mp4"/>
                </video>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        currentVideoUrl: state.currentVideoUrl
    }
}

export default connect(mapStateToProps)(Player);