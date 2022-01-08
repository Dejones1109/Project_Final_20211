import {client} from "../../client/client";
import endpoints from "../../../constants/Endpoints";

class AuthService {
    // api login
    async login(payload  , rejectWithValue  )   {
        // payload is form data to login , can  consists of email and password
        const response = await client.post(`${endpoints.partner}?query=login`,payload)
            .catch(error => rejectWithValue(error.json()));
        return response.data;
    }

    // api register
    async register(payload , rejectWithValue  ){
        // payload is form data to register , can consists of name, email and password
        const response = await client.post(`${endpoints.partner}`,payload)
            .catch(error =>  rejectWithValue(error.json()))
        return response.data;
    }

    // api logout
    async logout(payload  ,rejectWithValue   ) {
        // payload is value to remove session from database
        localStorage.removeItem(`${endpoints.user}`);
        const response = await client.post(`${endpoints.logout}`,payload)
            .catch(error => rejectWithValue(error.json()))
        return response.data;
    }
    // api change password

    async change_password(payload ,rejectWithValue   ) {
       return {}
    }
    // get password
    async get_password(payload ,rejectWithValue  )  {
        return {}
    }
}
export default  new AuthService();
