import { createStore } from 'redux';

const initialSatate = {
    currentVideoUrl: '123123123'
};

const reducer = (state = initialSatate, action) => {
    switch(action.type){
        case 'SET_CURRENT_VIDEO_URL' :
            return {
                ...state,
                currentVideoUrl: action.value
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