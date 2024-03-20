import { useState, useEffect } from 'react';
import type { RootState } from "@/store/index";

import { useSelector } from "react-redux";


export default function useAuthentication() {
  const [authenticated, setAuthenticated] = useState(false);
  const userToken = useSelector((state:RootState) => state.userInfoReducer.token)

  useEffect(() => {
    if(userToken) setAuthenticated(true)
    else setAuthenticated(false)    


  }, [userToken]);

 
  return authenticated;
}



// // Example function to validate JWT token (replace it with your actual validation logic)
// function validateToken(token) {
//   // Here you can implement your JWT validation logic
//   // For example, you can decode the token and check its expiration date or other claims
//   // For simplicity, let's assume a token is considered valid if it exists
//   return !!token;
// }