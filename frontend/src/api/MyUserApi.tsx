import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "react-query";
import { GetTokenSilentlyOptions } from "@auth0/auth0-react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

type CreateUserRequest = {
    auth0Id: string;
    email: string;
}


export const useCreateMyUser = () =>    {
    const { getAccessTokenSilently } = useAuth0();

    const createMyUserRequest = async (user: CreateUserRequest) => {
        const accessToken = await getAccessTokenSilently({
             audience: import.meta.env.VITE_AUTH0_AUDIENCE
        } as unknown as GetTokenSilentlyOptions);
        const response = await fetch(`${API_BASE_URL}/api/my/user`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-type": "application/json",
            },
            body: JSON.stringify(user)
        })

        if(!response.ok){
            throw new Error("Failed to create user")
        }
    }

    const { 
        mutateAsync: createUser, 
        isLoading, 
        isError, 
        isSuccess} = useMutation(createMyUserRequest);

        return {
            createUser,
            isLoading,
            isError,
            isSuccess
        }
}