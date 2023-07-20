// **************
// Display a note and allows deleting and editing in place

import React from 'react';
import { useContext, useState } from 'react'
import { Note } from "@/lib/interfaces";
import { dbActions } from "@/lib/reducer"
import { dataDispatchContext } from "@/lib/context"
import NoteEditor from '../NoteEditor/NoteEditor';
import { dateDisplay } from '@/lib/utils';


interface Props{
    note: Note,         // The note object
    query: string       // The search query, if needed to highlight snippets
}

// Highlighting function ************************
const wrapTags = (text: string, query: string) => {
    const matcher = new RegExp(`(${query})`, 'gi')      // Find all instances of the query in the content string
    const textArray = text.split(matcher);              // Split it using Positive Lookahead "()" to keep the instances in the resulting array
    return textArray.map((str, idx) => {                // Using indexes as keys because the text won't change
        if ( matcher.test(str)) {                       // Replace matching strings with a JSX element for styling
        return <span key={idx} className="bg-yellow-300 dark:bg-yellow-600">{str}</span>  
        }
        return <React.Fragment key={idx}>{str}</React.Fragment>;
    })
}

export default function NoteCard({ note, query }: Props){
    const [editing, setEditing] = useState(false)       // Define wether the editing or displaying blocks are shown
    const dispatch = useContext(dataDispatchContext)    // import dispatch 

    // Choose to display either the original text, or a highlighted version
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
        setEditing(false)   // Hide the editor after saving
        }
    
    return <div className='mb-'>
            {/* Date Display */}
            <div className='text-sm text-slate-400'>
                {note.createdAt? dateDisplay(note.createdAt): ''} {note.createdAt !== note.updatedAt ? '(edited)' : ''}
            </div>
            {/* Editor or Content display */}
            {editing ? <NoteEditor note={note} charMin={20} charMax={300} saveNote={handleSave}/>
                    : <article className='p-2 mb-1 border dark: border-slate-600 rounded bg-white dark:bg-slate-800 shadow-sm'><p className='break-words whitespace-pre-line'>{highlightedText}</p></article>
            }
            {/* Edit and Delete buttons */}
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