
interface Props{
    query: string
    setQuery: (query: string) => void
}

export default function SearchBar({ query, setQuery}: Props){
    return <div className="mb-6 flex">
        <input 
        type='text' 
        className="border block p-2 text-lg"
        onChange={(e) => setQuery(e.target.value)} 
        value={query} 
        />
        <button
            className="py-2 px-4 bg-slate-600 text-white ml-2 rounded"
            disabled={!query}
            onClick={() => setQuery("")}
            >
                Clear
            </button>
    </div>
}