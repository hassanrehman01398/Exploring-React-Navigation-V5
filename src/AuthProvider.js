import React from 'react';
import { AsyncStorage } from '@react-native-async-storage/async-storage';

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = React.useState(null);
  return (
    <AuthContext.Provider
      value={{
        user,
        login: () => {
          const fakeUser = { username: 'bob' };
          setUser(fakeUser);
          AsyncStorage.setItem('user', JSON.stringify(fakeUser));
        },
        logout: () => {
          setUser(null);
          AsyncStorage.removeItem('user');
        },
      }}>
      {children}
    </AuthContext.Provider>
  );
};
