import {client} from "../../client/client";
import endpoints from "../../../constants/Endpoints";

class AdminClient {
    async login(payload  , rejectWithValue  )   {
        const response = await client.post("admin?query=login",payload)
            .catch(error => rejectWithValue(error.json()));
        return response.data;
    }
}

export default new AdminClient();
