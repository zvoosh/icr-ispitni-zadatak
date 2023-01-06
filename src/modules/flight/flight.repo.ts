import { api } from "../../lib";
import { IFlight, IResponse } from "../../types";

const ROUTES = {
    FLIGHT: 'api/flight/'
}

class FlightRepo {
    getFlights = (): Promise<IResponse<IFlight>> => {
        return api.get(`${ROUTES.FLIGHT}flight`);
    };
    getFlight = (id: string) => {
        return api.get(`${ROUTES.FLIGHT}flight/${id}`);
    };
    createFlight = (obj: any) => {
        return api.post(`${ROUTES.FLIGHT}flight`, obj);
    }
    editFlight = (id: string, obj: any) => {
        return api.put(`${ROUTES.FLIGHT}flight/${id}`, obj);
    }
    reserveFlight = (id: string, obj: { client_id: string }) => {
        return api.put(`${ROUTES.FLIGHT}flight/reserve/${id}`, obj);
    }
    unreserveFlight = (id: string, obj: { client_id: string }) => {
        return api.put(`${ROUTES.FLIGHT}flight/unreserve/${id}`, obj);
    }
    deleteFlight = (id: string) => {
        return api.delete(`${ROUTES.FLIGHT}flight/${id}`);
    }
}

export const flightRepo = new FlightRepo();