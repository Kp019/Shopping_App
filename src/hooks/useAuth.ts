// src/hooks/useAuth.js

import { useAuth0 } from '@auth0/auth0-react';

const useAuth = () => {
  const {
    isAuthenticated,
    user,
    loginWithRedirect,
    logout,
    getIdTokenClaims,
    getAccessTokenSilently,
    isLoading,
  } = useAuth0();

  return {
    isAuthenticated,
    user,
    loginWithRedirect,
    logout,
    getIdTokenClaims,
    getAccessTokenSilently,
    isLoading,
  };
};

export default useAuth;
