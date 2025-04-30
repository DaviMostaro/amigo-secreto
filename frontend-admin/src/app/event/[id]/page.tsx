import * as api from "@/api/site";
import { Search } from "@/components/site/Search";
import { redirect } from "next/navigation";

type Props = {
    params: {
        id: string;
    }
}

const Page = async ({ params }: Props) => {
    const eventItem = await api.getEvent(parseInt(params.id));
    if(!eventItem || !eventItem.status) return redirect('/');

    return (
        <main className="text-center mx-auto max-w-2xl p-12">
            <header>
                <h2 className="text-4xl text-yellow-400">Amigo Secreto</h2>
                <h1 className="text-4xl mt-10 mb-4">😎 {eventItem.title} 😎</h1>
                <p className="text-2xl mb-5"> {eventItem.description} </p>
            </header>

            <Search id={eventItem.id} />

            <footer className="text-sm mt-5">Criado por @DaviMostaro on Github</footer>
        </main>
    );
}

export default Page;