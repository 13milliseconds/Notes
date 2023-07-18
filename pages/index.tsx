import { useContext } from 'react'
import NoteEditor from '@/components/NoteEditor/NoteEditor'
import NoteCard from '@/components/NoteCard/NoteCard'
import { dbActions } from "@/lib/reducer"
import { dataDispatchContext } from "@/lib/context"
import { dataContext } from '@/lib/context'
import { Note } from '@/lib/interfaces'
import { v4 as uuidv4 } from "uuid"

export default function Home() {
  const notes = useContext(dataContext)
  const dispatch = useContext(dataDispatchContext)

  
  const handleAdd = (note: Note) => {
    dispatch && dispatch({
            type: dbActions.ADD_DOCUMENT,
            payload: {
                note: {...note, _id: uuidv4()}
            }
        })
    }

  return (
    <main className="min-h-screen p-24 max-w-6xl mx-auto">
      <h1 className='text-4xl font-bold mb-6'>📚 My Notes</h1>
      { notes ? notes.map((note) => <NoteCard key={note._id} note={note} />) : null }
      <NoteEditor note={{content: ""}} charMax={300} charMin={20} saveNote={handleAdd}/>
    </main>
  )
}
