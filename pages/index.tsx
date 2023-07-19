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

  const filteredNotes = notes?.filter(note => {
    const matcher = new RegExp(`(${query})`, 'gi')
    return query ? matcher.test(note.content) : true
  })

  
  const handleAdd = (note: Note) => {
    dispatch && dispatch({
            type: dbActions.ADD_DOCUMENT,
            payload: {
                note: {...note, _id: uuidv4()}
            }
        })
    }

  return (
    <main className="min-h-screen px-2 md:px-6 lg:px-24 max-w-6xl mx-auto">
      <header className='lg:flex justify-between mb-6 align-middle sticky top-0 bg-white py-2'>
      <h1 className='text-4xl font-bold mb-4 lg:mb-0'>📚 My Notes</h1>
      <SearchBar query={query} setQuery={setQuery} />
      </header>
      <div className='mb-6'>
      { filteredNotes && filteredNotes.length
          ? filteredNotes.map((note) => <NoteCard key={note._id} note={note} query={query} />) 
          : <div className='bg-slate-100 rounder p-6'>{ query ? 'No matching note.' : 'No notes.'}</div>
      }
      </div>
      <NoteEditor note={{content: ""}} charMax={300} charMin={20} saveNote={handleAdd}/>
    </main>
  )
}
