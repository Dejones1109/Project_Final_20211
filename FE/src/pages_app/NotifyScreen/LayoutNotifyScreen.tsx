import React from 'react';
import { Row } from '../../components/AutoLayout';
import {ContactView, NotifyElementsView} from './ChildrentComponents';
import {Center, ScrollView} from "native-base";

export type LayoutNotify ={
    NotifyElementsView : JSX.Element,
    ContactView:JSX.Element,
}
const LayoutNotifyScreen = (props:LayoutNotify) => {
    return (
        <ScrollView
            bg={"white"}
        >
            <Center>
                <Center width={"95%"}  >
                    {props.NotifyElementsView}
                    {props.ContactView}
                </Center>
            </Center>
        </ScrollView>
    );
};
LayoutNotifyScreen.defaultProps = {
    NotifyElementsView : <NotifyElementsView/>,
    ContactView:<ContactView />,
}


export default LayoutNotifyScreen;
