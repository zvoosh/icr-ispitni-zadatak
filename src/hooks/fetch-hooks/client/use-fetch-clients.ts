import { useQuery } from "react-query";
import { clientService } from "../../../modules"

const useFetchClients = (key: string, options?: any) => {
    const fetch = async () => {
        const res = await clientService.getClients();
        return res.data[0];
    }

    return useQuery(key, fetch, { ...options });
}

export { useFetchClients }