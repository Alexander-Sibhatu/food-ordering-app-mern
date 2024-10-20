import { useCreateMyUser } from "@/api/MyUserApi";
import { AppState, Auth0Provider, User } from "@auth0/auth0-react";
import { Navigate, useNavigate } from "react-router-dom";

type Props = {
    children: React.ReactNode;
}
const Auth0ProviderWithNavigate = ({ children }: Props) => {
    const navigate = useNavigate()


    const domain = import.meta.env.VITE_AUTHO_DOMAIN;
    const clientId = import.meta.env.VITE_AUTHO_CLIENT_ID;
    const redirectUri = import.meta.env.VITE_AUTH0_CALLBACK_URL;

    if (!domain || !clientId || !redirectUri) {
        throw new Error('unable to initialize auth')
    }

    const onRedirectCallback = (appState?: AppState, user?: User) => {
        navigate("/auth-callback")
       
    }

    return (
        <Auth0Provider 
            domain={domain} 
            clientId={clientId} 
            authorizationParams={{
                redirect_uri: redirectUri,
            }}
            onRedirectCallback={onRedirectCallback}
        >
            {children}
        </Auth0Provider>
    )
}

export default Auth0ProviderWithNavigate
