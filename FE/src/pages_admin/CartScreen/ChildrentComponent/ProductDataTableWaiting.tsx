
import React, {useEffect} from 'react';
import { DataTable } from 'react-native-paper';
import {useGetListToCartToOrderIdForAdminQuery} from "../../../app/selectors";
import {Checkbox, FlatList, Modal, Pressable} from "native-base";
import Layout from "../../../constants/Layout";
import ButtonBase from "../../../components/ButtonBase";
import {Row} from "../../../components/AutoLayout";
import TextBase from "../../../components/TextBase";
import {useDispatch} from "react-redux";
import {updateOrderStatus} from "../../../app/service/order/orderSlice";
import {adminApi, dashboardApi, orderApi} from "../../../app/controller";
import {useNavigation} from "@react-navigation/native";
import {store} from "../../../app/store";
import {showMessage} from "react-native-flash-message";
import {status} from "../../../helps/Status";

const DataFollowRow = (props:{item:any})=>{
    const {data} = useGetListToCartToOrderIdForAdminQuery(props.item.id); // return array , object have cartCode
    const dataCp = Object.assign([],Object.assign({},data).data);
    const item = Object.assign({},dataCp[0]);
    const {quantity,price,product} = item;
    const {productName} = Object.assign({},product);
    return(
        <DataTable.Row>
            <DataTable.Cell>{props.item.orderCode}</DataTable.Cell>
            <DataTable.Cell numeric>{quantity}</DataTable.Cell>
            <DataTable.Cell numeric>{price}</DataTable.Cell>
        </DataTable.Row>
    )
}
const ProductDataTableWaiting =  (props:{data?:any , dispatch ?: any})=> {
    const [showModal1, setShowModal1] = React.useState(false);
    const [showModal2, setShowModal2] = React.useState(false);
    const dispatch = useDispatch();
    const navigation= useNavigation();
    const confirm = async ()=>{
        let count:number = 0;
        for (const item of props.data) {
            let payload = {
                id: item.id,
                status:302
            };
            // @ts-ignore
            await dispatch(updateOrderStatus(payload));
            if(store.getState().orders.code === 200){
                count ++;
            }
        }
        await dispatch(orderApi.util.invalidateTags(['orderApi']));
        await dispatch(adminApi.util.invalidateTags(['adminApi']));
        await dispatch(dashboardApi.util.invalidateTags(['dashboardApi']));
        if(count !== 0){
            showMessage({
                message: "Xác nhận đơn hàng thành công",
                description: ``,
                type: "success",
            });
            setShowModal1(false);
            navigation.goBack();
        }
    }

    const cancel= async ()=>{
        let count:number = 0;
        for (const item of props.data) {
            let payload = {
                id: item.id,
                status:304
            };
            // @ts-ignore
            await  dispatch(updateOrderStatus(payload));
            if(store.getState().orders.code === 200){
                count ++;
            }
        }
        await dispatch(orderApi.util.invalidateTags(['orderApi']));
        await dispatch(adminApi.util.invalidateTags(['adminApi']));
        await dispatch(dashboardApi.util.invalidateTags(['dashboardApi']));

        if(count !==0){
            showMessage({
                message: "Hủy đơn hàng thành công",
                description: ``,
                type: "success",
            });
            setShowModal1(false);
            navigation.goBack();
        }
    }
    return (
        <>
            {props.data !== null  ?
                <>
                    <DataTable>
                        <DataTable.Header>
                            <DataTable.Title>Mã order</DataTable.Title>
                            <DataTable.Title numeric>Số lượng</DataTable.Title>
                            <DataTable.Title numeric>Giá</DataTable.Title>
                        </DataTable.Header>

                        <FlatList
                            renderItem = {({item})=><DataFollowRow item={item} />}
                            data={props.data}
                            keyExtractor={({index}) => index}
                        />
                    </DataTable>

                    <Row justifyContent={"space-around"} my={3}>
                        <ButtonBase bg={"blue.400"}  onPress={() => setShowModal1(true)} >Xác nhận</ButtonBase>
                        <ButtonBase bg={"red.400"}  onPress={() => setShowModal2(true)}>Hủy đơn hàng</ButtonBase>
                    </Row>
                    <Modal isOpen={showModal1} onClose={() => setShowModal1(false)}>
                        <Modal.Content maxWidth="400px">
                            <Modal.CloseButton />
                            <Modal.Header>Xác nhận lại</Modal.Header>

                            <Modal.Footer>
                                <ButtonBase bg={"blue.400"}  onPress={()=>confirm()} >Đồng ý</ButtonBase>
                            </Modal.Footer>
                        </Modal.Content>
                    </Modal>
                    <Modal isOpen={showModal2} onClose={() => setShowModal2(false)}>
                        <Modal.Content maxWidth="400px">
                            <Modal.CloseButton />
                            <Modal.Header>Xác nhận lại</Modal.Header>
                            <Modal.Footer>
                                <ButtonBase bg={"blue.400"}  onPress={()=>cancel()} >Hủy đơn hàng</ButtonBase>
                            </Modal.Footer>
                        </Modal.Content>
                    </Modal>
                </>
                : <TextBase >Không có đơn hàng nào mới</TextBase>
            }
        </>

    );
}
export default ProductDataTableWaiting;
