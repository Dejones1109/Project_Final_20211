
import React, {useEffect} from 'react';
import { DataTable } from 'react-native-paper';
import {useGetListToCartToOrderIdForAdminQuery} from "../../../app/selectors";
import {Checkbox, FlatList, Modal, Pressable} from "native-base";
import Layout from "../../../constants/Layout";
import ButtonBase from "../../../components/ButtonBase";
import {Row} from "../../../components/AutoLayout";
import TextBase from "../../../components/TextBase";

const DataFollowRow = (props:{item:any})=>{
    const {data} = useGetListToCartToOrderIdForAdminQuery(props.item.id);
    const dataCp = Object.assign([],Object.assign({},data).data);
    const item = Object.assign({},dataCp[0]);
    const {quantity,price,product} = item;
    const {productName} = Object.assign({},product);

    return(
        <DataTable.Row>
            <DataTable.Cell>{productName}</DataTable.Cell>
            <DataTable.Cell numeric>{quantity}</DataTable.Cell>
            <DataTable.Cell numeric>{price}</DataTable.Cell>
            <DataTable.Cell numeric><Checkbox value={props.item.id +"+" + productName } /></DataTable.Cell>
        </DataTable.Row>
    )
}
const ProductDataTableWaiting =  (props:{data?:any , dispatch ?: any})=> {
    const [groupValue, setGroupValue] = React.useState([]);
    const [showModal, setShowModal] = React.useState(false);

    return (
        <Checkbox.Group
            colorScheme="green"
            defaultValue={groupValue}
            accessibilityLabel="pick an item"
            onChange={(values) => {
                setGroupValue(values || [])
                console.log("abc", values);
            }}
            height={500}
            width={Layout.window.width}
        >
            <DataTable>
                <DataTable.Header>
                    <DataTable.Title>Sản phẩm</DataTable.Title>
                    <DataTable.Title numeric>Số lượng</DataTable.Title>
                    <DataTable.Title numeric>Giá</DataTable.Title>
                    <DataTable.Title numeric>Xác nhận</DataTable.Title>
                </DataTable.Header>

                <FlatList
                    renderItem = {({item})=><DataFollowRow item={item} />}
                    data={props.data}
                    keyExtractor={({index}) => index}
                />
            </DataTable>

            <Row justifyContent={"space-around"} my={3}>
                <ButtonBase bg={"blue.400"}  onPress={() => setShowModal(true)} >Xác nhận</ButtonBase>
                <ButtonBase bg={"red.400"}  > Cancel</ButtonBase>
            </Row>
            <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                <Modal.Content maxWidth="400px">
                    <Modal.CloseButton />
                    <Modal.Header>Xác nhận lại</Modal.Header>
                    <Modal.Body>
                        {groupValue.map((item,index)=><TextBase key={index}>{item.split("+")[1]}</TextBase>)}
                    </Modal.Body>
                    <Modal.Footer>
                        <ButtonBase bg={"blue.400"}  onPress={()=>{}} >Đồng ý</ButtonBase>
                    </Modal.Footer>
                </Modal.Content>
            </Modal>
        </Checkbox.Group>

    );
}
export default ProductDataTableWaiting;
