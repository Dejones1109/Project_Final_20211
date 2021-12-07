import {login ,register} from "../database/user/userSlice";

export const userDispatchToProps = (dispatch) => {
    return {
        // dispatching plain actions
        login: (params) => dispatch(login(params)),
        signUp: (params) => dispatch(register(params)),
        // logout: () => dispatch(),
    }
}

