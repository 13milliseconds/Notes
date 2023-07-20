import { useContext, useState } from 'react'
import NoteEditor from '@/components/NoteEditor/NoteEditor'
import NoteCard from '@/components/NoteCard/NoteCard'
import { dbActions } from "@/lib/reducer"
import { dataDispatchContext } from "@/lib/context"
import { dataContext } from '@/lib/context'
import { Note } from '@/lib/interfaces'
import { v4 as uuidv4 } from "uuid"
import SearchBar from '@/components/SearchBar/SearchBar'

export default function Home() {
  const notes = useContext(dataContext)
  const dispatch = useContext(dataDispatchContext)
  const [query, setQuery] = useState("")

  // If a query is entered, filter the notes
  const filteredNotes = query && notes ? filterNotes(notes) : notes

  // Filtering function
  function filterNotes (notes: Note[]): Note[] {
    const matcher = new RegExp(`(${query})`, 'gi')
    return notes.filter((note) => matcher.test(note.content))
  }

  
  // Handle saving a new note
  const handleAdd = (note: Note) => {
    dispatch && dispatch({
            type: dbActions.ADD_DOCUMENT,
            payload: {
                note: {...note, _id: uuidv4()}
            }
        })
    }

  return (
    <main className="min-h-screen">
      {/* Header */}
      <header className='lg:flex justify-between mb-6 align-middle sticky top-0 bg-slate-800 text-white p-2 lg:p-4'>
        <h1 className='text-xl lg:text-4xl font-bold mb-4 lg:mb-0'>📚 My Notes</h1>
        <SearchBar query={query} setQuery={setQuery} />
      </header>

      {/* Notes */}
      <div className='px-2 md:px-6 lg:px-24 max-w-6xl mx-auto'>
        <section className='mb-6'>
        <h2 className='text-2xl font-bold mb-4'>All Notes</h2>
        <div className='mb-6'>
        { filteredNotes
            ? filteredNotes.map((note) => <NoteCard key={note._id} note={note} query={query} />) 
            : <div className='bg-slate-100 dark:bg-slate-600 rounder p-6'>{ query ? `No note matching the query '${query}'` : 'Write your first note using the form below.'}</div>
        }
        </div>
        </section>

        {/* New Note */}
        <section className='my-6'>
        <h2 className='text-2xl font-bold mb-4'>New Note</h2>
        <NoteEditor note={{content: ""}} charMax={300} charMin={20} saveNote={handleAdd}/>
        </section>
      </div>
    </main>
  )
}
