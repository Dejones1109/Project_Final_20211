import React, {Component, useState} from 'react';
import {connect} from 'react-redux';
import {
    Center, Box, ScrollView, Container,
} from "native-base"
import ToolNavigate from "./ToolNavigate.Table";
import ShowContentScreen from "./ShowContentScreen.Table";
import {AutoLayout, Col, Row} from "../../components/AutoLayout";
import {SearchView} from "../../pages_app/HomeScreen/ChildrentComponent";

class HeaderTable extends Component{

    render() {
        return (
            <AutoLayout  direction={"row"} width={"100%"} justifyContent={"center"} position={"fixed"}  top={0} zIndex={2}  >
                <Col    width={["100%","100%","25%","20%","35%"]}  alignItems={"flex-end"}   >
                    <Box  width={["100%","100%","100%","90%","50%"]}  height={60} bg={"yellow.400"}>
                        Logo
                    </Box>

                </Col>
                <Row   width={["100%","100%","75%","80%","65%"]} height={60}  >
                    <Box width={["100%","100%","100%","97%","73.07%"]}   >
                        <SearchView/>
                    </Box>
                </Row>
            </AutoLayout>
        )
    }
}

class MainTable extends Component {
    render() {
        return(
            <AutoLayout  direction={"row"} width={"100%"} justifyContent={"center"} position={"relative"}  zIndex={1}  >
                <Col    width={["100%","100%","25%","20%","35%"]} position={"fixed"} top={0} left={0}  alignItems={"flex-end"}   >
                    <ScrollView
                        width={["100%","100%","100%","90%","50%"]}
                        height={1080}
                        bg={"secondary.500"}
                        _contentContainerStyle={{
                            minW: "72",
                        }}

                    >
                        <ToolNavigate />
                    </ScrollView>
                </Col>
                <Col   width={["100%","100%","75%","80%","65%"]}  position={"absolute"} right={0}   >
                    <Center width={["100%","100%","100%","97%","73.07%"]}   >
                        <Container>
                            <ScrollView
                                width={"100%"}
                                _contentContainerStyle={{
                                    minW: "72",
                                    mt:"50px"
                                }}
                                showsVerticalScrollIndicator={false}
                            >
                                <ShowContentScreen/>
                            </ScrollView>
                        </Container>
                    </Center>
                </Col>
            </AutoLayout>
        )
    }
}


class RootTable extends Component {

    render() {
       return (
           <Center width={"100%"} position="relative" >
               <HeaderTable/>
               <MainTable />
           </Center>
       );
   }
}


function mapStateToProps() {
    return {};
}

export default connect(
    mapStateToProps,
)(RootTable);
