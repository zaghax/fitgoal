import { createStore } from 'redux';

const initialSatate = {
    currentVideo: {},
    videoPlaylist: []
};

const reducer = (state = initialSatate, action) => {
    switch(action.type){
        case 'SET_CURRENT_VIDEO' :
            return {
                ...state,
                currentVideo: action.value
            }
        case 'SET_VIDEO_PLAYLIST' :
            return {
                ...state,
                videoPlaylist: action.value
            }
        default :
            return {
                ...state
            }
    }
}

export const store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)