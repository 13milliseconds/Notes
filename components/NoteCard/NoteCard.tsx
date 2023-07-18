import { useContext } from 'react'
import { Note } from "@/lib/interfaces";
import { dbActions } from "@/lib/reducer"
import { dataDispatchContext } from "@/lib/context"

interface Props{
    note: Note
}

export default function NoteCard({ note }: Props){
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
    
    return <div className='mb-6'>
            <article className='p-2 border rounded bg-white shadow-sm'>
                {note.content}
            </article>
            <button 
                className='block ml-auto text-slate-500 hover:text-red-950'
                onClick={() => handleDelete()}>❌ Delete</button>
         </div>
}