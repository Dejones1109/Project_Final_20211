import {client} from "../../client/client";
import endpoints from "../../../constants/Endpoints";

class OrderClient {
    async updateOrderStatus(payload  , rejectWithValue  )   {
        console.log(payload);
        const response = await client.put(`${endpoints.order}/${payload.id}?query=status&status=${payload.status}`)
            .catch(error => rejectWithValue(error.json()));
        console.log(response.data);
        return response.data;
    }
    async createOrder(payload  , rejectWithValue  )   {
        const response = await client.post(`${endpoints.order}`,payload)
            .catch(error => rejectWithValue(error.json()));
        return response.data;
    }

}

export default new OrderClient();
