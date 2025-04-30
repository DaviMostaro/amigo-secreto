import { cookies } from "next/headers";
import * as api from "@/api/server";
import { redirect } from "next/navigation";
import { AdminPage } from "@/components/admin/AdminPage";

const Page = async () => {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
        return redirect('/admin/login');
    }

    const logged = await api.pingAdmin(token);
    if (!logged) {
        return redirect('/admin/login');
    }

    return (
        <AdminPage />
    );
};

export default Page;