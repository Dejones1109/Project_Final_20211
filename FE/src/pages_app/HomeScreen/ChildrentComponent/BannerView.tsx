import React from 'react';
import {HStack, Image} from "native-base";
import {Row} from "../../../components/AutoLayout";
// @ts-ignore
// import {Bannerhome} from '../../../assets/logo/bannerhome.png';

const BannerView = () => {
    return (
        <Row justifyContent={"center"}  mt={5} >
            <Image
                source={require('../../../assets/logo/bannerhome.png')}
                alt="Alternate Text"
                height={[150,190]}
                rounded={10}
                // width={150}
                width={{base:"95%",md:"100%"}}
            />

        </Row>
    );
};

export default BannerView;
