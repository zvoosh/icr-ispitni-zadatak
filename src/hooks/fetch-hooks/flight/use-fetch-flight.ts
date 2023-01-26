import { useQuery } from "react-query";
import { flightService } from "../../../modules"
import { IFlight } from "../../../types";
const useFetchFlight = ([queryKey, id]: [string, string], options?: any) => {
    const fetch = async () => {
        const res = await flightService.getFlight(id);
        return res.data as IFlight;
    }

    return useQuery([queryKey, id], fetch, { ...options });
}

export { useFetchFlight }