import {adminApi, productApi, storeApi, orderApi, dashboardApi} from "../controller/index";

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
    useGetCartListByPartnerQuery,
    useGetOrderListByStatusQuery,
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
