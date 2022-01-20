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
    selectSaleScreen: undefined;
    isBillScreen:undefined;
    authOrder:undefined;
    searchScreen:undefined;
};

export type StoreTabUserParamList = {
    storeScreen:undefined;
    orderHistoryScreen: undefined;
    cartStatisticsScreen: undefined;
    settingScreen:undefined;
    isBillScreen:undefined;
    payOrderScreen:undefined;
    infoOrderScreen:undefined;
    createBillScreen:undefined;
    changeInfoScreen:undefined;
}

export type SaleTabUserParamList = {
    saleScreen:undefined;
    saleInfoScreen:undefined;
    addProductScreen:undefined;
}
export type NotifyTabUserParamList = {
    notifyScreen:undefined;
    message:undefined;
    saleScreen:undefined;
    saleInfoScreen:undefined;
    notificationScreen:undefined;
    payOrderScreen:undefined;
}
// For Admin

export type HomeTabAdminParamList = {
    homeScreen: undefined;
    billScreen: undefined;
    infoOrderScreen:undefined;
}

export type CartTabAdminParamList = {
    cartScreen: undefined;
    billScreen: undefined;
    infoOrderScreen: undefined;
}

export type StatisticsTabAdminParamList = {
    statisticsScreen: undefined;
    quantityStatisticsScreen: undefined;
    moneyStatisticsScreen: undefined;
    storeDetailInfo:undefined;
}

export type InfoTabAdminParamList = {
    infoScreen: undefined;
    storeList:undefined;
    storeDetailInfo:undefined;
    productList:undefined;
    productDetailInfo:undefined;
    message:undefined;
    listMessageStore:undefined;
    saleList:undefined;
    saleDetailInfo:undefined;
    settingScreen:undefined;

}
