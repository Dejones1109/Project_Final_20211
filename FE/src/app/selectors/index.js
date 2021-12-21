import {adminApi, productApi, storeApi,orderApi} from "../controller/index";

export const  {
    useGetOrderListByStatusForAdminQuery,
    useGetAllCartWaitingForAdminQuery
} = adminApi;

export const { useGetProductByTypeQuery,
    useGetAllProductsQuery,
    useGetProductByViewQuery,
    useCheckExistProductOnCartQuery,
    useGetCartListByPartnerQuery,
    useGetOrderListByStatusQuery,
    useGetTotalViewProductByTypeQuery
} = productApi;


export const {
    useGetAllStoreQuery,
} = storeApi;

export const {
    useGetOrderListByStatusOfUserForAdminQuery,
    useGetListToCartToOrderIdForAdminQuery
} = orderApi;
