import { useMutation } from "react-query"
import { flightService } from "../../../modules"

const useFlightMutations = () => {
    const createFlightMutation = useMutation(({ obj }: { obj: any }) => flightService.createFlight(obj));
    const editFlightMutation = useMutation(({ id, obj }: { id: string, obj: any }) => flightService.editFlight(id, obj));
    const setCommentMutation = useMutation(({ id, obj }: { id: string, obj: { comments: string, rating: number, wroteComment: string } }) => flightService.setComment(id, obj))
    const reserveFlightMutation = useMutation(({ id, obj }: { id: string, obj: { client_id: string, count: number } }) => flightService.reserveFlight(id, obj));
    const unreserveFlightMutation = useMutation(({ id, obj }: { id: string, obj: { client_id: string } }) => flightService.unreserveFlight(id, obj));
    const deleteFlightMutation = useMutation(({ id }: { id: string }) => flightService.deleteFlight(id));

    return {
        createFlightMutation,
        editFlightMutation,
        setCommentMutation,
        deleteFlightMutation,
        reserveFlightMutation,
        unreserveFlightMutation
    }
}

export { useFlightMutations }