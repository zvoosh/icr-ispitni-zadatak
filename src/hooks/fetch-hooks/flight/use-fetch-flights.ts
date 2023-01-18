import { useQuery } from "react-query";
import { flightService } from "../../../modules"
import { IQueryObj } from "../../../types";

const useFetchFlights = ([queryKey, queryObj]: [string, IQueryObj | null], options?: any) => {
    const fetch = async () => {
        const res = await flightService.getFlights(queryObj);
        return res.data;
    }

    return useQuery([queryKey, queryObj], fetch, { ...options });
}

export { useFetchFlights }