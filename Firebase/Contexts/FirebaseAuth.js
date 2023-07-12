import React from "react";
import FirebaseAuthService from "../Services/FirebaseAuthService";

const FirebaseAuth = React.createContext({
  user: null,
});

export const FirebaseAuthProvider = ({ children }) => {
  const [user, setUser] = React.useState(null);

  FirebaseAuthService.subscribeToAuthChanges(setUser);

  return (
    <FirebaseAuth.Provider value={{ user }}>{children}</FirebaseAuth.Provider>
  );
};

export default FirebaseAuth;
