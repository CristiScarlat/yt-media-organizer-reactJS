import { useContext } from "react";
import { Ctx } from "../../context/store";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({children}) => {
    const { user } = useContext(Ctx);

    if(user){
        return <>{children}</>
    }
    else {
        return <Navigate to="/login" />
    }
}

export default PrivateRoute;