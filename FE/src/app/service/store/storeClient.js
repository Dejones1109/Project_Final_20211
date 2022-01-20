import {client} from "../../client/client";
import endpoints from "../../../constants/Endpoints";
import {partnerId} from "./storeAPI";

class StoreClient {
    async createPartner (payload  , rejectWithValue){
        const response = await client.post(`${endpoints.partner}`,payload)
            .catch(error => rejectWithValue(error.json()));
        return response.data;
    };
    async updatePartner (payload  , rejectWithValue){
        const response = await client.put(`${endpoints.partner}/${payload.partnerId}`,payload.data)
            .catch(error => rejectWithValue(error.json()));
        return response.data;
    };
    async updateStatusPartner (payload  , rejectWithValue){
        const response = await client.put(`${endpoints.partner}/${payload.id}?query=status&status=${payload.params.status}`,)
            .catch(error => rejectWithValue(error.json()));
        return response.data;
    };
    async createBill (payload  , rejectWithValue){
        const response = await client.post(`/bill/${payload.partnerId}`,payload.data)
            .catch(error => rejectWithValue(error.json()));
        return response.data;
    };
    async updateBill (payload , rejectWithValue){
        const response = await client.put(`/bill/${payload.partnerId}`,payload.data)
            .catch(error => rejectWithValue(error.json()));
        return response.data;
    };
    async updatePassword (payload  , rejectWithValue){
        const response = await client.put(`/partner/6`,{params:payload})
            .catch(error => rejectWithValue(error.json()));
        return response.data;
    };
}
export default new StoreClient();
