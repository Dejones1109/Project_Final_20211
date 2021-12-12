import React from 'react';
import {HStack, Image} from "native-base";
import {Row} from "../../../components/AutoLayout";

const BannerView = () => {
    return (
        <Row justifyContent={"center"}  mt={5} >
            <Image
                source={{
                    uri: "https://wallpaperaccess.com/full/317501.jpg",
                }}
                alt="Alternate Text"
                height={[100,120]}
                rounded={10}
                width={{base:"95%",md:"100%"}}
            />
        </Row>
    );
};

export default BannerView;
