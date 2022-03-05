import {ScrollView, View } from 'native-base';
import React, {useContext} from 'react';
import { List } from 'react-native-paper';
import {useGetListQuestionByIdQuery, useGetListQuestionQuery} from "../../app/selectors";
import LoadingScreen, {LoadingContext} from "../../helps/LoadingScreen";
import TextBase from "../../components/TextBase";
import {Flow} from "react-native-animated-spinkit";
const AnswerItem = (props:{id:any,title:any}) =>{
    const {isSuccess,data} = useGetListQuestionByIdQuery(props.id);
    return (
        <>
            {isSuccess ?
                <TextBase mx={2} key={props.id}>{data.data.remark}</TextBase>
                :<Flow size={80} color="#FFFFFF" animating={true} />
            }
        </>
    )
}
const PrivateLoadingScreen = ()=>{
    const {context}:any  = useContext(LoadingContext);
    let {data} = context[0];
    let list = data.data ;

    return (
        <ScrollView>
            <List.AccordionGroup >
                {list && list.map((e:any,i:number)=>{
                    return(
                        <List.Accordion title={e} id={i+1} >
                            <AnswerItem id={i+1} title={e}/>
                        </List.Accordion>

                    )
                })}

            </List.AccordionGroup>
        </ScrollView>
    )
}
const PrivateScreen = () => {
    // @ts-ignore
    const list = useGetListQuestionQuery();
    return (
        <LoadingScreen data={[list]}>
            <PrivateLoadingScreen />
        </LoadingScreen>
    )
};

export default PrivateScreen;
