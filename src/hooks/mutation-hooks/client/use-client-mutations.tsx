import { useMutation } from "react-query"
import { clientService } from "../../../modules"

const useClientMutations = () => {
    const createClientMutation = useMutation(({ obj }: { obj: any }) => clientService.createClient(obj));
    const editClientMutation = useMutation(({ id, obj }: { id: string, obj: any }) => clientService.editClient(id, obj));
    const deleteClientMutation = useMutation(({ id }: { id: string }) => clientService.deleteClient(id));

    return {
        createClientMutation,
        editClientMutation,
        deleteClientMutation
    }
}

export { useClientMutations }