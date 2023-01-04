import { api } from "../../lib";

const ROUTES = {
    CLIENT: 'api/client/'
}

class ClientRepo {
    getClients = () => {
        return api.get(`${ROUTES}client`);
    };
    getClient = (id: string) => {
        return api.get(`${ROUTES}client/${id}`);
    };
    createClient = (obj: any) => {
        return api.post(`${ROUTES}client`, obj);
    }
    editClient = (id: string, obj: any) => {
        return api.put(`${ROUTES}client/${id}`, obj);
    }
    deleteClient = (id: string) => {
        return api.delete(`${ROUTES}delete-client/${id}`);
    }
}

export const clientRepo = new ClientRepo();