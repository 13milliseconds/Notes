import { useContext, useState } from 'react'
import { Note } from "@/lib/interfaces";
import { dbActions } from "@/lib/reducer"
import { dataDispatchContext } from "@/lib/context"
import NoteEditor from '../NoteEditor/NoteEditor';
import { arrayBuffer } from 'stream/consumers';

interface Props{
    note: Note,
    query: string
}

// Highlighting function ************************
// Find all instances of the query in the content string
// Then split it using Positive Lookahead "()" to keep the instances in the resulting array
// Then simply replace matching strings with a JSX element for styling
const wrapTags = (text: string, query: string) => {
    const matcher = new RegExp(`(${query})`, 'gi')
    const textArray = text.split(matcher);
    return textArray.map(str => {
        if ( matcher.test(str)) {
        return <span className="bg-yellow-300">{str}</span>;
        }
        return str;
    })
}

export default function NoteCard({ note, query }: Props){
    const [editing, setEditing] = useState(false)
    const dispatch = useContext(dataDispatchContext)

    const highlightedText = query ? wrapTags(note.content, query) : note.content

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
                    : <article className='p-2 mb-2 border rounded bg-white shadow-sm'>{highlightedText}</article>
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