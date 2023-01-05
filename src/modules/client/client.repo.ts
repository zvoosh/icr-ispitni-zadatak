import { api } from "../../lib";
import { IResponse } from "../../types";
import { IClient } from "../../types/client-types";

const ROUTES = {
    CLIENT: 'api/client/'
}

class ClientRepo {
    getClients = (): Promise<IResponse<IClient>> => {
        return api.get(`${ROUTES.CLIENT}client`);
    };
    getClient = (id: string) => {
        return api.get(`${ROUTES.CLIENT}client/${id}`);
    };
    createClient = (obj: any) => {
        return api.post(`${ROUTES.CLIENT}client`, obj);
    }
    editClient = (id: string, obj: any) => {
        return api.put(`${ROUTES.CLIENT}client/${id}`, obj);
    }
    deleteClient = (id: string) => {
        return api.delete(`${ROUTES.CLIENT}delete-client/${id}`);
    }
}

export const clientRepo = new ClientRepo();