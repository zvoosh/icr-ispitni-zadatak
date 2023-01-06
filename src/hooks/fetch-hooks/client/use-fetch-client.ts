import { useQuery } from "react-query";
import { clientService } from "../../../modules"
const useFetchClient = ({ key, id }: { key: string, id: string }, options?: any) => {
    const fetch = async () => {
        const res = await clientService.getClient(id);
        return res.data;
    }

    return useQuery([key, id], fetch, { ...options });
}

export { useFetchClient }