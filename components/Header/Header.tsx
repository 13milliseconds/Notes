import Link from "next/link";


export default function Header(){
    return <header className="bg-slate-800 text-white p-2">
        <div className="logo">
            <Link href="/">My Notes</Link>
        </div>

    </header>
}