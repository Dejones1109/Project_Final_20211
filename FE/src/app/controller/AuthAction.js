import {useGetProductByTypeQuery} from "../service/product/productAPI";

export const userDispatchToProps = (dispatch) => {
    return {
        // dispatching plain actions
        // login: (params) => dispatch(login(params)),
        // signUp: (params) => dispatch(register(params)),
        product:()=> dispatch(useGetProductByTypeQuery()),
        // logout: () => dispatch(),
    }
}

