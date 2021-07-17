import React from 'react';
import { useAuthState, AuthProvider } from "./src/context/AuthContext";
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <AuthProvider>
        <AppNavigator />
    </AuthProvider>
  );
}