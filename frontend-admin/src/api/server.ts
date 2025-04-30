import { req } from "./axios";

export const pingAdmin = async (token: string) => {
    try {
        await req.get('/admin/ping', {
            headers: {
                'Authorization': `Token ${token}`
            }
        });

        return true;
    } catch (err) {
        console.error("Erro no pingAdmin:", err);
        return false;
    }
};