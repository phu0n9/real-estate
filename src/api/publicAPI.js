import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useState } from "react";
import { useEnv } from "../context/env.context";

export const usePublicAPI = ({url,params}) =>{
    
    const [apiResponse, setApiResponse] = useState("")
    const { getAccessTokenSilently } = useAuth0()
    const { apiServerUrl } = useEnv()

    const getPublicResource = async () => {
        await axios.get(`${apiServerUrl}/api/v1/${url}`,{
            headers: {
            "content-type": "application/json",
          },
          params:params
        })
        const config = {
          url: `${apiServerUrl}/api/v1/${url}`,
          method: "GET",
          headers: {
            "content-type": "application/json",
          },
          params:params
        };
    
        const data = await makeRequest({ config });
    
        setApiResponse(JSON.stringify(data, null, 2));
      };

    return {
        apiResponse
    }
}