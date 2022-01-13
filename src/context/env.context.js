import React from "react";

const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
const audience = process.env.REACT_APP_AUTH0_AUDIENCE;
const apiServerUrl = process.env.REACT_APP_API_SERVER_URL;
const api_key = process.env.REACT_APP_API_KEY_GOOGLE_MAPS

const isEnvValid = domain && clientId && audience && apiServerUrl && api_key;

if (!isEnvValid) {
  console.log(domain)
  console.log(clientId)
  console.log(audience)
  console.log(apiServerUrl)
  console.log(api_key)
  throw new Error("Missing environment variables.");
}

const dotenv = {
  domain: domain,
  clientId: clientId,
  audience: audience,
  apiServerUrl: apiServerUrl,
  api_key : api_key
};

export const EnvContext = React.createContext(dotenv);

export const useEnv = () => {
  const context = React.useContext(EnvContext);
  if (!context) {
    throw new Error(`useEnv must be used within a EnvProvider`);
  }
  return context;
};

export const EnvProvider = (props) => {
  return <EnvContext.Provider value={dotenv} {...props} />;
};
