import {HStack, Stack, VStack} from 'native-base';
import React from 'react';

const AutoLayout = (props:any) => {
    return (
        <Stack width={"100%"} {...props}  >
            {props.children}
        </Stack>
    );
};

const Row = (props:any) =>{
    return(
        <HStack width={"100%"}   alignItems={"center"}  {...props}>
            {props.children}
        </HStack>
    )
}


const Col = (props:any) =>{
    return(
        <VStack   justifyContent={"center"}  {...props}>
            {props.children}
        </VStack>
    )
}

export {AutoLayout , Row , Col}
