import { redirect } from "react-router";
import client from "~/lib/interceptor";
import type { Route } from "../_app.account/+types/route";
import { toast } from "sonner";

export async function clientAction({ }: Route.ClientActionArgs) {
    await client.post('/api/logout');
    
    toast('You logged out 😒', {
        description: "Don't forget your password though"
    });

    return redirect('/login');
}