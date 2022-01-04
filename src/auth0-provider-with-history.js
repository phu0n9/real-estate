import { Auth0Provider } from "@auth0/auth0-react";
import React from "react";
import { useEnv } from "./context/env.context";
import { useNavigate } from 'react-router-dom'

export const Auth0ProviderWithHistory = ({ children }) => {
  const navigate = useNavigate();
  const { domain, clientId, audience } = useEnv();

  const onRedirectCallback = (appState) => {
    navigate(appState?.returnTo || window.location.pathname)
  }

  if (!(domain && clientId && audience)) {
    return null;
  }

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      audience={audience}
      redirectUri={window.location.origin}
      onRedirectCallback={onRedirectCallback}
      useRefreshTokens={true}
    >
      {children}
    </Auth0Provider>
  );
};
