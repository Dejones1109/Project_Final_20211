import { NavigatorScreenParams } from '@react-navigation/native';


export type RootStackParamList = {
    Root: NavigatorScreenParams<MainTabParamList> | undefined;
    NotFound: undefined;
};

export type MainTabParamList  = {
    auth : NavigatorScreenParams<AuthTabParamList>;
    bottomTab : NavigatorScreenParams<BottomTabParamList>;
}

export type BottomTabParamList = {
    home: undefined;
    sale: undefined;
    notify: undefined;
    store: undefined;
};

export type AuthTabParamList = {
    login : undefined;
    register : undefined;
    password:undefined;
};

export type HomeTabParamList = {
    homeScreen: undefined;
    addProductScreen:undefined;
};



