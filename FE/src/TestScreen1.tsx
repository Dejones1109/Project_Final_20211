import React, {useEffect} from 'react';
import TextBase from './components/TextBase';
import ButtonBase from "./components/ButtonBase";
import {useCreateCartMutation, useGetCartListByPartnerQuery, useGetPartnerByCodeQuery} from "./app/selectors";
import Database from "./firebase/database";

const TestScreen1 = () => {
    // @ts-ignore
    const key :any= [];
    const {data , isSuccess, refetch} = useGetPartnerByCodeQuery(key[0]);
    useEffect(async () =>{
        await Database.listen(
            `message`,
            'child_added',
            (snap:any) => {
                // console.log(snap.val());
                key.push(snap.key);
                console.log(key);
                refetch();
                console.log(data);
            }
        );
    },[])
    return (
        <>

        </>
    );
};

export default TestScreen1;
