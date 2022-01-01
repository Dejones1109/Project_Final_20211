import {client} from "../../client/client";
import endpoints from "../../../constants/Endpoints";

export class CartClient {
    async createCart(payload  , rejectWithValue  )   {
        const response = await client.post(`${endpoints.cart}`,payload)
            .catch(error => rejectWithValue(error.json()));
        return response.data;
    }
    async updateQuantity(payload  , rejectWithValue  )   {
        const response = await client.put(`${endpoints.cart}/${payload.id}?query=quantity&quantity=${payload.quantity}`)
            .catch(error => rejectWithValue(error.json()));

        return response.data;
    }

}

export default new CartClient();