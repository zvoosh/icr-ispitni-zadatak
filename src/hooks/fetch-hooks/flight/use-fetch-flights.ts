import { useQuery } from "react-query";
import { flightService } from "../../../modules"

const useFetchFlights = (key: string, options?: any) => {
    const fetch = async () => {
        const res = await flightService.getFlights();
        return res.data;
    }

    return useQuery(key, fetch, { ...options });
}

export { useFetchFlights }