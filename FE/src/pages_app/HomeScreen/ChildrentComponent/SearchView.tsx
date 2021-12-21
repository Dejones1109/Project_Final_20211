import React from 'react';
import { VStack, HStack, Button, IconButton, Icon, Text, NativeBaseProvider, Center, Box, StatusBar, Input, Spacer } from "native-base";
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Col, Row} from '../../../components/AutoLayout';
import MainIcon from '../../../assets/icon/Icon';

const SearchView = (props:{navigation?:any}) => {

    return (
        <>
            <StatusBar backgroundColor="white" barStyle="light-content"  />
            <Row width="95%" bg={"bg='#6200ee'"} m={2}  justifyContent={"space-between"}    >
                <Input
                    placeholder="Search"
                    bg="#fff"
                    width={"75%"}
                    borderRadius="7"
                    p="3"

                    fontSize="14"
                    _web={{
                        _focus: { borderColor: 'muted.300', },
                    }}
                    InputLeftElement={
                        <Box >
                            <MainIcon
                                name="search"
                            />
                        </Box>
                    }
                />
                <Col alignItems={"center" } >
                    <IconButton
                        icon={ <MainIcon  name={"cart"} />}
                        borderRadius="full"
                        onPress={()=>props.navigation.navigate("cartProductScreen")}
                    />
                </Col>
            </Row>
        </>
    );
}

export default SearchView;
