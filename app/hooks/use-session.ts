import client from "~/lib/interceptor";
import Cookies from "js-cookie";
import { storageKeys } from "~/lib/keys";

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

            if (!user)
                return null;

            return user.accountType;
        } catch (error) {
            throw error;
        }
    }

    async function storeUser(user: User) {
        try {
            const data = JSON.stringify(user);
            Cookies.set(storageKeys.user, data, { expires: 1 });
        } catch (error) {
            throw error;
        }
    }

    async function getUser() {
        try {
            const cookieData = Cookies.get(storageKeys.user);

            const user: User = cookieData
                ? JSON.parse(cookieData)
                : await validateSession();

            return user;
        } catch (error) {
            throw error;
        }
    }

    async function intendedRoute(path: string) {
        if (path === "/") path = "/dashboard";
        Cookies.set(storageKeys.route, path);
    }

    async function getIntentedRoute(): Promise<string> {
        const route = Cookies.get(storageKeys.route);
        Cookies.remove(storageKeys.route);
        return route || '/dashboard';
    }

    return { validateSession, getUserType, intendedRoute, getIntentedRoute, getUser };
}