import { useContext } from 'react'
import NoteEditor from '@/components/NoteEditor/NoteEditor'
import NoteCard from '@/components/NoteCard/NoteCard'
import { dataContext } from '@/lib/context'

export default function Home() {
  const notes = useContext(dataContext)

  return (
    <main className="min-h-screen p-24 max-w-6xl mx-auto">
      <h1 className='text-4xl font-bold mb-6'>📚 My Notes</h1>
      { notes ? notes.map((note) => <NoteCard key={note._id} note={note} />) : null }
      <NoteEditor note={{content: ""}} charMax={300} charMin={20}/>
    </main>
  )
}
