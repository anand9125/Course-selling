import { Navigate, Outlet, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { userEndPoint } from "../config";

const ProtectedResetPassword = () => {
  const { token } = useParams();
  const [isValid, setIsValid] = useState<boolean | null>(null); 

  useEffect(() => {
    const validateToken = async () => {
      try {
        const response = await axios.get(`${userEndPoint}/user/verify-token/${token}`);
        
        setIsValid(response.data.valid);
      } catch (error) {
        setIsValid(false);
      }
    };

    validateToken();
  }, [token]);

  if (isValid === null) return <p>Loading...</p>;

  return isValid ? <Outlet /> : <Navigate to="/error" replace />;   //<Outlet /> is a placeholder for child routes. It tells React Router where to render the matched child components inside a protected parent route.
};

export default ProtectedResetPassword;
