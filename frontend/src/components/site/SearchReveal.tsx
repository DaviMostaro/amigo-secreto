import { SearchResult } from "@/types/SearchResult"

type Props = {
    results: SearchResult;
}

export const SearchReveal = ({ results }: Props) => {
    return (
        <div>
            <p className="text-3xl">{results.person.name} parabéns 🥳</p>
            <p className="text-2xl my-3">você tirou:</p>
            <p className="text-4xl bg-yellow-500 my-5 px-5 py-20 rounded-lg border-2 border-blue-300">{results.personMatched.name}</p>
        </div>
    );
}