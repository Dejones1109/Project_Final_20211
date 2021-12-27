import React from 'react';
import {Button} from "native-base";

const ButtonBase = (props:any) => {
    return (
        <Button
        mx={1}
        bg={"light"}
        _hover={{
            bg: 'light.300'
        }}
        _pressed={{
            bg: '#FFFFFF'
        }}
        _focus ={{
            bg: 'success.400'
        }}
        {...props}
    >
            {props.children}
    </Button>
);
}

export default ButtonBase;
