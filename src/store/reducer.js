import { createStore } from 'redux';

const initialSatate = {
    currentVideoURL: 'GIO'
};

const reducer = (state = initialSatate, action) => {
    switch(action.type){
        case 'SET_CURRENT_VIDEO_URL' :
            return {
                ...state,
                currentVideoURL: action.value
            }
        default :
            return {
                ...state
            }
    }
}

export const store = createStore(
    reducer
)