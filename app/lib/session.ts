import client from "~/lib/interceptor";
import Cookies from "js-cookie";
import { storageKeys } from "./keys";

export default function useSession() {

    async function validateSession() {
        try {
            const response = await client.get(`api/user`);
            storeUser(response?.data);
            return response?.data;
        } catch (error) {
            Cookies.remove(storageKeys.user);
            throw error;
        }
    }

    async function getUserType() {
        try {
            const user: User = await getUser();

            if (!user) return null;

            return user.accountType;
        } catch (error) {
            throw error;
        }
    }

    async function storeUser(user: User) {
        try {
            const data = JSON.stringify(user);
            Cookies.set(storageKeys.user, data, { expires: 1, sameSite: 'Lax', secure: true });
        } catch (error) {
            throw error;
        }
    }

    function getUser() {
        try {
            const data = Cookies.get(storageKeys.user);
            const user = data ? JSON.parse(data) : validateSession();
            return user;
        } catch (error) {
            throw error;
        }
    }

    async function intendedRoute(path: string) {
        if (path === "/") path = "/dashboard";
        Cookies.set(storageKeys.route, path, { expires: 1, sameSite: 'Lax', secure: true });
    }

    async function getIntentedRoute(): Promise<string> {
        const route = Cookies.get(storageKeys.route);
        Cookies.remove(storageKeys.route);
        return route || '/dashboard';
    }

    return { validateSession, getUserType, intendedRoute, getIntentedRoute, getUser };
}