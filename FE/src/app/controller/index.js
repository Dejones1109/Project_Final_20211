import {adminApi} from "../service/admin/adminAPI";
import {productApi} from "../service/product/productAPI";
import {storeApi} from "../service/store/storeAPI";
import {orderApi} from "../service/order/orderAPI";
import {dashboardApi} from "../service/dashboard/dashboardAPI";
import {cartApi} from "../service/cart/cartAPI";
import {systemApi} from "../service/system/systemApi"
import {orderSlice} from "../service/order/orderSlice";
import {adminSlice} from "../service/admin/adminSlice";
import {productSlice} from "../service/product/productSlice";
import {cartSlice} from "../service/cart/cartSlice";
import {userSlice} from "../service/user/userSlice";
import{token_current} from "../service/user/token";
import {storeSlice} from "../service/store/storeSlice";
export {adminApi,productApi,storeApi, orderApi ,dashboardApi,cartApi, systemApi,userSlice,orderSlice,adminSlice,productSlice,cartSlice,token_current,storeSlice};
