import React from 'react';
import {Center, IconButton, Input,} from "native-base";
import {Col,Row } from "../../../components/AutoLayout";
import ButtonBase from '../../../components/ButtonBase';
import MainIcon from "../../../assets/icon/Icon";

const SearchView = (props:any) => {
    return (
       <Center bg={"danger.400"}  display={props.display}>
           <Row   my={2} width={"90%"}  justifyContent={"space-around"}  >
               <Input
                   placeholder="Search"
                   bg="#fff"
                   width={"75%"}
                   borderRadius="7"
                   py="3"
                   fontSize="14"
                   _web={{
                       _focus: { borderColor: 'muted.300', },
                   }}
                   InputLeftElement={
                       <MainIcon
                           name="search"
                       />
                   }
               />

               <Col alignItems={"center" } >
                   <IconButton
                       icon={ <MainIcon  name={"cart"} />}
                       borderRadius="full"
                   />

               </Col>
           </Row>
       </Center>
    );
}

export default SearchView;
