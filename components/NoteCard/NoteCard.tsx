import React from 'react';
import { useContext, useState } from 'react'
import { Note } from "@/lib/interfaces";
import { dbActions } from "@/lib/reducer"
import { dataDispatchContext } from "@/lib/context"
import NoteEditor from '../NoteEditor/NoteEditor';
import { dateDisplay } from '@/lib/utils';


interface Props{
    note: Note,
    query: string
}

// Highlighting function ************************
// Find all instances of the query in the content string
// Then split it using Positive Lookahead "()" to keep the instances in the resulting array
// Then simply replace matching strings with a JSX element for styling
// Using indexes as keys because the text won't change
const wrapTags = (text: string, query: string) => {
    const matcher = new RegExp(`(${query})`, 'gi')
    const textArray = text.split(matcher);
    return textArray.map((str, idx) => {
        if ( matcher.test(str)) {
        return <span key={idx} className="bg-yellow-300 dark:bg-yellow-600">{str}</span>;
        }
        return <React.Fragment key={idx}>{str}</React.Fragment>;
    })
}

export default function NoteCard({ note, query }: Props){
    const [editing, setEditing] = useState(false)
    const dispatch = useContext(dataDispatchContext)

    const highlightedText = query ? wrapTags(note.content, query) : note.content

    const handleDelete = () => {
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
    
    return <div className='mb-'>
            <div className='text-sm text-slate-400'>{note.createdAt? dateDisplay(note.createdAt): ''} {note.createdAt !== note.updatedAt ? '(edited)' : ''}</div>
            {editing ? <NoteEditor note={note} charMin={20} charMax={300} saveNote={handleSave}/>
                    : <article className='p-2 mb-1 border dark: border-slate-600 rounded bg-white dark:bg-slate-800 shadow-sm'><p className='break-words whitespace-pre-line'>{highlightedText}</p></article>
            }
            <footer className='flex justify-end text-sm'>
            <button 
                className='mr-4 text-slate-500 hover:text-red-950'
                onClick={() => handleEdit()}>{ editing ? 'Cancel' : 'Edit'}</button>
            <button 
                className=' text-red-500 hover:text-red-950'
                onClick={() => handleDelete()}>Delete</button>
            </footer>
         </div>
}