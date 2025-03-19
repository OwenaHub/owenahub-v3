import client from "~/lib/interceptor";
import { storageKeys } from "./keys";

export default function useSession() {

    async function validateSession() {
        try {
            const response = await client.get(`api/user`);
            storeUser(response?.data);
            return response?.data;
        } catch (error) {
            localStorage.removeItem(storageKeys.user);
            throw error;
        }
    }

    async function getUserType() {
        try {
            const user = await getUser();

            if (!user) return null;

            return user.account_type;
        } catch (error) {
            throw error;
        }
    }

    async function storeUser(user: User) {
        try {
            let data = JSON.stringify(user)
            localStorage.setItem(storageKeys.user, data)
        } catch (error) {
            throw error;
        }
    }

    async function getUser() {
        try {
            let data = localStorage.getItem(storageKeys.user);
            const user = data ? JSON.parse(data) : null;
            return user;
        } catch (error) {
            throw error;
        }
    }

    async function intendedRoute(path: string) {
        sessionStorage.setItem(storageKeys.route, path);
    }

    async function getIntentedRoute(): Promise<string> {
        const route = sessionStorage.getItem(storageKeys.route);
        sessionStorage.removeItem(storageKeys.route);
        return route || '/dashboard';
    }

    return { validateSession, getUserType, intendedRoute, getIntentedRoute };
}