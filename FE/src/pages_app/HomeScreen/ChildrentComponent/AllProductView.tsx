import React from 'react';
import {ProductListView} from "../../CommonScreen";

const AllProductView = (props:{data:any}) => {
    return (
        <ProductListView data={props.data}/>
    );
};

export default AllProductView;
