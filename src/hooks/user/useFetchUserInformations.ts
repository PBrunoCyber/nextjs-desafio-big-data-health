import { jwtDecode } from "jwt-decode";
import {parseCookies, destroyCookie} from "nookies";
import { SetStateAction, useEffect, useState } from "react";
import { useGetUser } from "./useGetUser";
import { useRouter } from "next/router";

const useFetchUserInformations = () => {
    const [userDecode, setUser] = useState<any>(null);
    const [token, setToken] = useState("");
    const router = useRouter();
    const { data: user, isLoading } = useGetUser(userDecode?.sub);

    useEffect(() => {
        const { token } = parseCookies();
        setToken(token ?? "");
        if (token) {
            setUser(jwtDecode(token));
        }
    }, []);

    const handleLogout = (setAnchorEl: React.Dispatch<SetStateAction<any>>) => {
        destroyCookie(null, "token", {path: "/"});
        destroyCookie(null, "token", {path: "/*"});
        setToken('');
        setUser(null);
        setAnchorEl(null);
        router.push('/');
    }

    return { user, isLoading , token, handleLogout }
}

export default useFetchUserInformations