import React, {useContext, useState} from 'react';
import LoadingScreen, {LoadingContext, WaitingScreen} from "../../helps/LoadingScreen";
import {Box, Center, CheckIcon, Heading, Input, Row, ScrollView, Select, StatusBar, View} from "native-base";
import DateTimePicker from "@react-native-community/datetimepicker";
import Layout from "../../constants/Layout";
import TextBase from "../../components/TextBase";
import {LineChart, PieChart} from "react-native-chart-kit";
import FrameBase from "../../components/FrameBase";
import { Platform, TouchableOpacity} from "react-native";
import {useGetDashboardByProductTypeQuery} from "../../app/selectors";
import {RankTableMoneyView, RankTableQuantityView} from "./ChildrentComponent";

const LayoutStatisticsScreen = () => {
    let start = new Date();
    start.setUTCDate(1);
    start.setUTCMonth(11);
    start.setUTCFullYear(2021);
    console.log(start);
    const [date1, setDate1] = useState(start);

    const [date2, setDate2] = useState(new Date());
    const [show1, setShow1] = useState(false);
    const [show2, setShow2] = useState(false);

    const onChange1 = (event:any, selectedDate :any) => {

        const currentDate = selectedDate || date1;
        setShow1(Platform.OS === 'ios');
        setDate1(currentDate);
    };
    const onChange2 = (event:any, selectedDate :any) => {

        const currentDate = selectedDate || date2;
        setShow2(Platform.OS === 'ios');
        setDate2(currentDate);
    };
    const showMode1 = (currentMode:any) => {
        setShow1(true);
    };
    const showMode2 = (currentMode:any) => {
        setShow2(true);
    };
    const show1Datepicker = () => {
        showMode1('date');
    };
    const show2Datepicker = () => {
        showMode2('date');
    };
    let startDate =`${date1.getUTCFullYear()}-${date1.getUTCMonth()+1}-${date1.getUTCDate()}`;
    // let startDate =`2021-12-01`;
    // let startDate =`2021-12-13`;
    let endDate = `${date2.getUTCFullYear()}-${date2.getUTCMonth()+1}-${date2.getUTCDate()}`;
    // get data for pie chart
    const statisticsData =  useGetDashboardByProductTypeQuery({start:startDate, end:endDate});
    const chartConfig = {
        backgroundGradientFrom: "#f5f5f4",
        backgroundGradientTo: "#f5f5f4",
        // backgroundGradientToOpacity: 0,
        color: (opacity = 1) => `rgba(52, 255, 146, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 102, 102, ${opacity})`,
        strokeWidth: 1,
        barPercentage: 0.5,
    };
    const [service, setService] = React.useState("1");
    // @ts-ignore
    const {context} = useContext(LoadingContext);
    const total = context[0];
    const dataTableQuantity = context[1].data;
    const dataTableMoney = context[2].data;
    let pieChart :Array<any> = [];
    let labels:Array<any>  =[];
    let lineData:Array<any> = [];
    let lineChart = {
        labels: labels,
        datasets: [
            {
                data: lineData,
                color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
                strokeWidth: 2 // optional,
            }
        ],
        legend: ["Doanh thu"] // optional
    };;

    if(statisticsData.status ==="pending" ){
        return(
            <WaitingScreen/>
        )
    }
    else{
        const data = statisticsData.data.data ;

        try{
            if(data){
                data.forEach((item: any) => {
                    pieChart.push({
                        name: item.productType,
                        percent: item.percent,
                        price: item.price,
                        color: item.color,
                        legendFontColor: item.legendFontColor,
                        legendFontSize: 13,
                    })
                    labels.push(item.productType);
                    lineData.push(item.price);
                    // lineData.push({price:item.price, name:item.productType});
                })
            };
        }
        catch (e){};
    }
    return (
        <ScrollView bg={"white"}
            showsVerticalScrollIndicator={false}
        >
            <>
                <StatusBar backgroundColor="white" barStyle="light-content"  />
                <Center>
                    <Row width={"95%"} justifyContent={"space-between"} my={2}>
                        <Heading>Thống kê</Heading>
                        <Box width={120} m={0}>
                            <Select
                                selectedValue={service}
                                minWidth="50"
                                height={9}
                                accessibilityLabel="Chọn sản phẩm"
                                placeholder="Chọn sản phẩm"
                                _selectedItem={{
                                    bg: "teal.600",
                                    endIcon: <CheckIcon size="5" />,
                                }}
                                borderRadius={6}
                                onValueChange={(itemValue) => setService(itemValue)}
                            >
                                <Select.Item label={"Sản lượng"} value="1" />
                                <Select.Item label={"Doanh thu"} value="2" />
                            </Select>
                        </Box>
                    </Row>
                </Center>
            </>

            <View>
                {show1 && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={date1}
                        mode={"date"}
                        timeZoneOffsetInMinutes={60}
                        is24Hour={true}
                        maximumDate={new Date()}
                        display="default"
                        onChange={onChange1}
                    />
                )}
            </View>
            <View>
                {show2 && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={date2}
                        mode={"date"}
                        timeZoneOffsetInMinutes={60}
                        is24Hour={true}
                        maximumDate={new Date()}
                        display="default"
                        onChange={onChange2}
                    />
                )}
            </View>
            <Box   >
                <Center>
                    <Box  position={"absolute"} height={50} top={1} borderTopRadius={20} width={0.95*Layout.window.width}  bg={"red.200"} >
                        <Row justifyContent={"space-between"} >
                            <TouchableOpacity  onPress={show1Datepicker} ><TextBase mx={2}>{startDate}</TextBase></TouchableOpacity>
                            <TouchableOpacity  onPress={show2Datepicker} ><TextBase mx={2}>{endDate}</TextBase></TouchableOpacity>
                        </Row>
                    </Box>
                </Center>

                <>
                    <Box position={"absolute"}  top={34} bg={"light.100"} borderRadius={20} width={"100%"}>
                        <TextBase fontSize={16} mt={3}  ml={3}>Tổng {service === "1" ? "sản lượng" : "doanh thu" } : <TextBase color={"red.500"}>{service === "1" ? `${total.data.data[1]} g` : `${total.data.data[0]} đ` }</TextBase> </TextBase>
                        {service ==="1" ?
                            <PieChart
                                data={pieChart}
                                width={0.95*Layout.window.width}
                                height={180}
                                chartConfig={chartConfig}
                                paddingLeft="0"
                                yLabelsOffset={3}
                                yAxisInterval={3}
                                accessor={"percent"}
                                backgroundColor={"transparent"}
                                hasLegend={true}
                                center={[0,0]}
                                absolute
                            />
                        :
                            <ScrollView
                                overflow={"hidden"}
                                width={'100%'}
                                height={280}
                                bg={"light.100"}
                                scrollEnabled
                                horizontal={true}
                                contentOffset={{ x: 10000, y: 0 }}
                                showsHorizontalScrollIndicator={false}
                            >
                                <Box mx={'2.5%'}>
                                    <LineChart
                                        data={lineChart}
                                        width={1000}
                                        height={220}
                                        chartConfig={chartConfig}
                                        xLabelsOffset={1}
                                        // withHorizontalLines={false}
                                        // withVerticalLines={false}
                                        // withHorizontalLabels={false}
                                        // withInnerLines={false}
                                        // withOuterLines={false}
                                    />
                                </Box>
                            </ScrollView>
                           }

                    </Box>
                </>
            </Box>

            <View mt={service ==="1" ? 260 :360 }  >
                <Center borderWidth={1} p={2}   m={2} borderColor={"light.200"} bg={"primary.100"} borderRadius={5} >
                    <FrameBase
                        default
                        viewOptions={{
                            leftElement:<TextBase color={"blue.500"}>Cao nhất</TextBase>,
                            rightElement: <TextBase color={"red.500"}>{ pieChart[0] ? pieChart[0].name : null}</TextBase>,
                        }}
                    />

                    <FrameBase
                        default
                        viewOptions={{
                            leftElement:<TextBase color={"blue.500"} >Tổng sản lượng</TextBase>,
                            rightElement: <TextBase color={"red.500"}>{total.data.data[1]} g</TextBase>,
                        }}
                    />
                    <FrameBase
                        default
                        viewOptions={{
                            leftElement:<TextBase color={"blue.500"}>Tổng doanh thu</TextBase>,
                            rightElement: <TextBase color={"red.500"}> {total.data.data[0]} vnđ</TextBase>,
                        }}
                    />
                </Center>
                <View >
                    {service ==="1" ?<RankTableQuantityView data={dataTableQuantity.data}/> :<RankTableMoneyView data={dataTableMoney.data}/>}
                </View>
            </View>

</ScrollView>
);
};

export default LayoutStatisticsScreen;
