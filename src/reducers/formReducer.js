const formReducer = (state, action) => {
    const { type } = action;
    switch (type) {
        case 'change-value': {
            const {
                payload: { name, value },
            } = action;
            return {
                ...state,
                [name]: {
                    ...state[name],
                    value,
                },
            };
        }
    }
};

export default formReducer;
