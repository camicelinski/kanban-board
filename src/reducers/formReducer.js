import { createInitStateObj } from '../helpers/helpersFunctions';

const formReducer = (state, action) => {
    const { type } = action;
    switch (type) {
        case 'change-value': {
            const {
                payload: { name, value },
            } = action;
            return {
                ...state,
                [name]: value,
            };
        }
        /*case FORM_ACTIONS.SET_INVALID: {
            const {
                payload: { name },
            } = action;
            return {
                ...state,
                [name]: {
                    ...state[name],
                    isValid: false,
                    isFill: true,
                },
            };
        }
        case FORM_ACTIONS.SET_VALID: {
            const {
                payload: { name },
            } = action;
            return {
                ...state,
                [name]: {
                    ...state[name],
                    isValid: true,
                    isFill: true,
                },
            };
        }*/
        case 'reset':
            return createInitStateObj();
        default:
            return state;
    }
};

export default formReducer;
