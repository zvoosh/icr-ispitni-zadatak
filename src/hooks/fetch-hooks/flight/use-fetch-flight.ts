import { useQuery } from "react-query";
import { flightService } from "../../../modules"
const useFetchFlight = ({ key, id }: { key: string, id: string }, options?: any) => {
    const fetch = async () => {
        const res = await flightService.getFlight(id);
        return res.data;
    }

    return useQuery([key, id], fetch, { ...options });
}

export { useFetchFlight }