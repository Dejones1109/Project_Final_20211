import {client} from "../../client/client";
import endpoints from "../../../constants/Endpoints";

export class ProductClient {
    async createProduct(payload  , rejectWithValue  )   {
        const response = await client.post(`${endpoints.product}`,payload)
            .catch(error => rejectWithValue(error.json()));
        return response.data;
    }


}

export default new ProductClient();
