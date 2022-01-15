import {adminApi, productApi, storeApi, orderApi, dashboardApi, cartApi, systemApi} from "../controller/index";

export const  {
    useGetOrderListByStatusForAdminQuery,
    useGetAllCartWaitingForAdminQuery,
    useGetTotalPriceAndTotalQuantityQuery,
    useGetPartnerByQuantityQuery,
    useGetPartnerByTotalPriceQuery,
    useGetListToCartToOrderIdForAdminQuery,
    useGetListCartToPartnerIdQuery,
    useEditPostMutation
} = adminApi;

export const { useGetProductByTypeQuery,
    useGetAllProductsQuery,
    useGetProductByViewQuery,
    useCheckExistProductOnCartQuery,
    useGetTotalViewProductByTypeQuery,
    useSearchProductByKeyQuery
} = productApi;


export const {
    useGetAllStoreQuery,
    useGetOrderQuantityByStatusOfPartnerQuery,
    useGetPartnerByCodeQuery
} = storeApi;

export const {
    useGetOrderListByStatusOfUserForAdminQuery,
    useGetOrderByCodeQuery,
} = orderApi;

export const {
    useGetDashboardByProductTypeQuery,useGetOrderQuantityByStatusOfAdminQuery
} = dashboardApi;

export const {useGetCartListByPartnerQuery,useGetOrderListByStatusQuery, useCreateCartMutation} = cartApi;
export const {useGetListSaleNoUseQuery, useCreateSaleMutation, useGetAllSaleQuery, useUpdateStatusSaleMutation} = systemApi;
