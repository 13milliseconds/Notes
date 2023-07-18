import { useContext, useState } from 'react'
import { Note } from "@/lib/interfaces";
import { dbActions } from "@/lib/reducer"
import { dataDispatchContext } from "@/lib/context"
import NoteEditor from '../NoteEditor/NoteEditor';

interface Props{
    note: Note
}

export default function NoteCard({ note }: Props){
    const [editing, setEditing] = useState(false)
    const dispatch = useContext(dataDispatchContext)


    const handleDelete = () => {
        console.log('Deleting ', note._id)
        dispatch && dispatch({
            type: dbActions.DELETE_DOCUMENT,
            payload: {
                note
            }
        })
      }

    const handleEdit = () => {
        setEditing(prev=>!prev)
    }

    const handleSave = (note: Note) => {
        dispatch && dispatch({
            type: dbActions.EDIT_DOCUMENT,
            payload: {
                note
            }
        })
        setEditing(false)
        }
    
    return <div className='mb-6'>
            {editing ? <NoteEditor note={note} charMin={20} charMax={300} saveNote={handleSave}/>
                    : <article className='p-2 mb-2 border rounded bg-white shadow-sm'>{note.content}</article>
            }
            <footer className='flex justify-end'>
            <button 
                className='mr-6 text-slate-500 hover:text-red-950'
                onClick={() => handleEdit()}>{ editing ? 'Cancel' : '🖊️ Edit'}</button>
            <button 
                className=' text-slate-500 hover:text-red-950'
                onClick={() => handleDelete()}>❌ Delete</button>
            </footer>
         </div>
}