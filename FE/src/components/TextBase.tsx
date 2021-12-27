import React from 'react';
import {Text} from "native-base";
const TextBase = (props:any) => {
    return (
        <Text
            my={1}
              fontSize={["sm","md","lg"]}
              fontStyle={"normal"}
              {...props}
        >
            {props.children}
        </Text>
    );
};

export default TextBase;
