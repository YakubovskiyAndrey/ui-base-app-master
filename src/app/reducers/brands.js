const initialState = {
    isLoading: false,
    isError: false,
    list: [],
}

export default (state = initialState, action) => {
    switch (action.type){
        case 'ERROR_RECEIVE_BRANDS': {
            return {
                ...state,
                isLoading: false,
                isError: true,
            }
        }

        case 'REQUEST_BRANDS': {
            return {
                ...state,
                isLoading: true,
            }
        }

        case 'REQUEST_ADD_BRAND': {
            return {
                ...state,
                isLoading: true,
            };
        }

        case 'RECEIVE_BRANDS': {
            const {
                brands,
            } = action;
            return {
                ...state,
                isLoading: false,
                list: brands
            };
        }
        default: return state;
    }
}