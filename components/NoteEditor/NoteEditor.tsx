import React, { useEffect, useRef, useState, useContext } from "react"
import { dataDispatchContext } from "@/lib/context"
import type { Note } from "@/lib/interfaces"

interface Props{
    note: Note
    charMax: number
    charMin: number,
    saveNote: (note:Note) => void
}

export default function NoteEditor({note, charMax, charMin, saveNote}: Props){
    const [noteContent, setNoteContent] = useState("")
    const [validationError, setValidationError] = useState<string | null>(null)
    const textareaRef = useRef<HTMLTextAreaElement>(null)


    useEffect(() => {
        setNoteContent(note.content)
        if( textareaRef.current ) textareaRef.current.focus()
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
        if( e.target.value.length <= 300) setNoteContent(e.target.value)

        if( validationError ) {
            if( e.target.value.length > charMin ) setValidationError(null)
        }
    }
    
    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault()
        handleSave()
    }
    
    const EnterPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.keyCode == 13 && e.shiftKey == false) {
            e.preventDefault()
            handleSave()
        }}
        
    const handleSave = () => {
        if( validateContent(noteContent) ){
            saveNote({...note, content: noteContent})
            setNoteContent("")
            if( textareaRef.current ) textareaRef.current.focus()
        }
    }

    const validateContent = (content : string) => {
        if( content.length < charMin){
            setValidationError('Note needs to be longer than 20 characters.')
            return false
        }

        return true
    }

    return <form onSubmit={handleSubmit}>
        <textarea
            className="border block p-2 text-lg w-full min-h-[15rem]"
            placeholder="Write a new note"
            value={noteContent}
            onChange={handleChange}
            onKeyDown={EnterPress}
            ref={textareaRef}
            autoFocus
         />
         { validationError ? <div className="text-red-500">{validationError}</div> : null }
         <div className="flex justify-between mt-2">
         <input
            type="submit" 
            className="bg-slate-600 text-white p-2 rounded"
            value="Save"
            />
            <div className={noteContent.length == charMax ? 'text-red-500' : ''}>{noteContent.length}/{charMax}</div>
            </div>
    </form>
}