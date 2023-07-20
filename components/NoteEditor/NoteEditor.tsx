// **************
// Textarea form that allows adding or editing a note

import React, { useEffect, useRef, useState } from "react"
import { sanitize } from "@/lib/utils"
import type { Note } from "@/lib/interfaces"

interface Props{
    note: Note                      // Note object to be edited, or created
    charMax: number                 // Max limit of note.content
    charMin: number                 // Min limit of note.content
    saveNote: (note:Note) => void   // Saving function, brought in as props to let the parent element handle side effects
}

export default function NoteEditor({note, charMax, charMin, saveNote}: Props){
    const [noteContent, setNoteContent] = useState("")                              // Make the content input controlled
    const [validationError, setValidationError] = useState<string | null>(null)     // set and display validation messages
    const textareaRef = useRef<HTMLTextAreaElement>(null)                           // used to target and focus the textarea input


    useEffect(() => {
        setNoteContent(note.content)
        if( textareaRef.current ) textareaRef.current.focus()
    }, [note.content])

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
        // Only accept user input if the character limit is not reached
        if( e.target.value.length <= charMax) setNoteContent(e.target.value)

        // If the minimum character alert was on, remove it when minimum is reached 
        if( validationError ) {
            if( e.target.value.length > charMin ) setValidationError(null)
        }
    }
    
    // Submit when the button is clicked
    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault()
        handleSave()
    }
    
    // Submit when the enter is pressed
    const EnterPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if ((e.keyCode == 13 || e.code == 'Enter') && e.shiftKey == false) {
            e.preventDefault()
            handleSave()
        }}
    
    
    const handleSave = () => {

        if( validateContent(noteContent) ){                         // Make sure the input is valid
            let now = new Date()                                    // Set up a datetime object so createdAt and updatedAt are equal
            saveNote({
                ...note,                                            // Spread the past notes to edit it
                createdAt: note.createdAt ? note.createdAt : now,   // If editing, createdAt exists and shouldn't be changed
                updatedAt: now,
                content: sanitize(noteContent)                      // Remove all possible html tags
            })
            setNoteContent("")                                      // Reset the form
            if( textareaRef.current ) textareaRef.current.focus()   // Focus so the user an write a new note
        }
    }

    const validateContent = (content : string) => {
        // Make sure the min character length is reached
        if( content.length < charMin){
            setValidationError(`Note needs to be longer than ${charMin} characters.`)
            return false
        }
        
        // Make sure the max character length is not reached 
        // (theoratically impossible because of the controlled input)
        if( content.length > charMax){
            setValidationError(`Note needs to be shorter than ${charMax} characters.`)
            return false
        }

        return true
    }

    return <form onSubmit={handleSubmit}>
        <textarea
            className="border block p-2 text-lg w-full min-h-[10rem] dark:bg-slate-800 dark:border-slate-600 rounded"
            placeholder="Write a new note"
            value={noteContent}
            onChange={handleChange}
            onKeyDown={EnterPress}
            ref={textareaRef}
            autoFocus
         />
         <div className="flex mt-2">
         <input
            type="submit" 
            className="bg-slate-600 text-white p-2 rounded disabled:bg-slate-200 transition cursor-pointer hover:bg-green-950"
            value="Save"
            />
            <div className="text-red-500 flex-1 p-2 italic">{ validationError ? validationError : '' }</div>
            <div className={noteContent.length == charMax ? 'text-red-500' : ''}>{noteContent.length}/{charMax}</div>
            </div>
    </form>
}