import { useContext } from "react";
import { Navigate, Outlet } from "react-router";
import { Context } from "../context";


const ProtectedRoute = () => {
    const context = useContext(Context);
    return context?.client ? <Outlet/> : <Navigate to={'/'}/>
}

export { ProtectedRoute }