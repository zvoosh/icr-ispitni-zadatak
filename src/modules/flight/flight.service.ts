import { flightRepo } from "./flight.repo";

class FlightService {
    getFlights = () => {
        return flightRepo.getFlights();
    };
    getFlight = (id: string) => {
        return flightRepo.getFlight(id);
    };
    createFlight = (obj: any) => {
        return flightRepo.createFlight(obj);
    }
    editFlight = (id: string, obj: any) => {
        return flightRepo.editFlight(id, obj);
    }
    reserveFlight = (id: string,obj: {client_id: string}) => {
        return flightRepo.reserveFlight(id, obj);
    }
    unreserveFlight = (id: string, obj: {client_id: string}) => {
        return flightRepo.unreserveFlight(id, obj);
    }
    deleteFlight = (id: string) => {
        return flightRepo.deleteFlight(id);
    }
}

export const flightService = new FlightService();