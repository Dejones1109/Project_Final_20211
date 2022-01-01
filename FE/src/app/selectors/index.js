import {adminApi, productApi, storeApi, orderApi, dashboardApi, cartApi} from "../controller/index";

export const  {
    useGetOrderListByStatusForAdminQuery,
    useGetAllCartWaitingForAdminQuery,
    useGetTotalPriceAndTotalQuantityQuery,
    useGetPartnerByQuantityQuery,
    useGetPartnerByTotalPriceQuery,
    useGetListToCartToOrderIdForAdminQuery,
    useGetListCartToPartnerIdQuery,
} = adminApi;

export const { useGetProductByTypeQuery,
    useGetAllProductsQuery,
    useGetProductByViewQuery,
    useCheckExistProductOnCartQuery,
    useGetTotalViewProductByTypeQuery
} = productApi;


export const {
    useGetAllStoreQuery,
    useGetOrderQuantityByStatusOfPartnerQuery
} = storeApi;

export const {
    useGetOrderListByStatusOfUserForAdminQuery,
} = orderApi;

export const {
    useGetDashboardByProductTypeQuery,
} = dashboardApi;

export const {useGetCartListByPartnerQuery,useGetOrderListByStatusQuery,} = cartApi;