
interface Props{
    query: string
    setQuery: (query: string) => void
}

export default function SearchBar({ query, setQuery}: Props){
    return <div className="flex md:max-w-xs relative">
        <input 
        type='text' 
        placeholder="Search"
        className="border rounded block p-2 pr-12 text-lg flex-1 text-black dark:text-white dark:bg-slate-800"
        onChange={(e) => setQuery(e.target.value)} 
        value={query} 
        />
        <button
            className="text-slate-500 rounded disabled:opacity-0 transition absolute right-4 top-[.7rem]"
            disabled={!query}
            onClick={() => setQuery("")}
        >Clear</button>
    </div>
}