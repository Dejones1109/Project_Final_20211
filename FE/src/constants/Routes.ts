import { NavigatorScreenParams } from '@react-navigation/native';


export type RootStackParamList = {
    Root: NavigatorScreenParams<MainTabParamList> | undefined;
    NotFound: undefined;
};

export type MainTabParamList  = {
    auth : NavigatorScreenParams<AuthTabParamList>;
    bottomTabUser : NavigatorScreenParams<BottomTabUserParamList>;
    bottomTabAdmin:NavigatorScreenParams<BottomTabAdminParamList>;
}
// Main
export type BottomTabUserParamList = {
    home: undefined;
    sale: undefined;
    notify: undefined;
    store: undefined;
};
export type BottomTabAdminParamList = {
    home: undefined;
    carts: undefined,
    info : undefined,
    statistics: undefined,
};

export type AuthTabParamList = {
    login : undefined;
    register : undefined;
    password:undefined;
};
// For User
export type HomeTabUserParamList = {
    homeScreen: undefined;
    addProductScreen:undefined;
    cartProductScreen: undefined;
    productDetailInfoScreen: undefined;
    productTypeScreen: undefined;
};

export type StoreTabUserParamList = {
    storeScreen:undefined;
    orderHistoryScreen: undefined;
    cartStatisticsScreen: undefined;
}

export type SaleTabUserParamList = {
    saleScreen:undefined;
    saleInfoScreen:undefined;
    addProductScreen:undefined;
}

// For Admin

export type HomeTabAdminParamList = {
    homeScreen: undefined;
    billScreen: undefined;
}

export type CartTabAdminParamList = {
    cartScreen: undefined;

}

export type StatisticsTabAdminParamList = {
    statisticsScreen: undefined;
}

export type InfoTabAdminParamList = {
    infoScreen: undefined;
    storeList:undefined;
    storeDetailInfo:undefined;
    productList:undefined;
    productDetailInfo:undefined;
}
