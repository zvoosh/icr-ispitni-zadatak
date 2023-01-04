import { clientRepo } from "./client.repo";

class ClientService {
    getClients = () => {
        return clientRepo.getClients();
    };
    getClient = (id: string) => {
        return clientRepo.getClient(id);
    };
    createClient = (obj: any) => {
        return clientRepo.createClient(obj);
    }
    editClient = (id: string, obj: any) => {
        return clientRepo.editClient(id, obj);
    }
    deleteClient = (id: string) => {
        return clientRepo.deleteClient(id);
    }
}

export const clientService = new ClientService();