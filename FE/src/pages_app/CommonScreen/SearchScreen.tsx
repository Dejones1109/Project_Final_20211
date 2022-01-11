import React, {useContext} from 'react';
import LoadingScreen, {LoadingContext} from "../../helps/LoadingScreen";
import AllProductView from "../HomeScreen/ChildrentComponent/AllProductView";
import {useSearchProductByKeyQuery} from "../../app/selectors";
import TextBase from "../../components/TextBase";
const ShowListSearching =()=>{
    let {context}:any = useContext(LoadingContext);
    let data =context[0].data.data;
    return(
        <>
            {data ? <AllProductView data={data}/> : <TextBase bold color={"yellow.500"}>không có kết quả tìm kiếm</TextBase>}
        </>
    )
}
const SearchScreen = (props:{route:any}) => {
    let {search} = props.route.params;
    const dataSearch:any = useSearchProductByKeyQuery(search);
    return (
        <LoadingScreen data={[dataSearch]}>
            <ShowListSearching />
        </LoadingScreen>
    );
};

export default SearchScreen;
