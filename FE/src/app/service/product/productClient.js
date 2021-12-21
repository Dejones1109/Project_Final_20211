import {client} from "../../client/client";
import endpoints from "../../../constants/Endpoints";

export class ProductClient {
    async create(payload  , rejectWithValue  )   {
        // payload is form data to login , can  consists of email and password
        const response = await client.post(`${endpoints.cart}`,payload)
            .catch(error => rejectWithValue(error.json()));
        return response.data;
    }
    async updateQuantity(payload  , rejectWithValue  )   {
        // payload is form data to login , can  consists of email and password
        console.log(payload);
        const response = await client.put(`${endpoints.cart}/${payload.id}?query=quantity&quantity=${payload.quantity}`)
            .catch(error => rejectWithValue(error.json()));
        console.log(response.data);

        return response.data;
    }
    async order(payload  , rejectWithValue  )   {
        // payload is form data to login , can  consists of email and password
        const response = await client.post(`${endpoints.order}`,payload)
            .catch(error => rejectWithValue(error.json()));
        console.log(response.data);
        return response.data;
    }
}

export default new ProductClient();
