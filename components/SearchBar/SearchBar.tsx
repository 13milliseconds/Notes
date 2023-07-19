
interface Props{
    query: string
    setQuery: (query: string) => void
}

export default function SearchBar({ query, setQuery}: Props){
    return <div className="flex w-full md:max-w-sm">
        <input 
        type='text' 
        placeholder="Search"
        className="border block p-2 text-lg flex-1"
        onChange={(e) => setQuery(e.target.value)} 
        value={query} 
        />
        <button
            className="py-2 px-4 bg-slate-600 text-white ml-2 rounded disabled:bg-slate-200 transition"
            disabled={!query}
            onClick={() => setQuery("")}
            >
                Clear
            </button>
    </div>
}