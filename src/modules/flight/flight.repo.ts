import { api } from "../../lib";
import { IFlight, IResponse } from "../../types";

const ROUTES = {
    FLIGHT: 'api/flight/'
}

class FlightRepo {
    getFlights = (query: string): Promise<IResponse<IFlight>> => {
        return api.get(`${ROUTES.FLIGHT}flight?${query}`);
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
    setComment = (id: string, obj: { comments: string, rating: number, wroteComment: string }) => {
        return api.put(`${ROUTES.FLIGHT}flight/comments/${id}`, obj)
    }
    reserveFlight = (id: string, obj: { client_id: string, count: number }) => {
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