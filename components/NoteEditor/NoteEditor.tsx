import React, { useEffect, useRef, useState, useContext } from "react"
import { dbActions } from "@/lib/reducer"
import { dataDispatchContext } from "@/lib/context"
import { v4 as uuidv4 } from "uuid"
import type { Note } from "@/lib/interfaces"

interface Props{
    note: Note
    charMax: number
    charMin: number
}

export default function NoteEditor({note, charMax, charMin}: Props){
    const [noteContent, setNoteContent] = useState("")
    const [validationError, setValidationError] = useState<string | null>(null)
    const textareaRef = useRef<HTMLTextAreaElement>(null)
    const dispatch = useContext(dataDispatchContext)


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
            saveNote()
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

    const saveNote = () => {
        let type = dbActions.EDIT_DOCUMENT
        let noteToSave = note
        noteToSave.content = noteContent

        if(!noteToSave._id){
            noteToSave._id = uuidv4()
            type = dbActions.ADD_DOCUMENT
        }

        dispatch && dispatch({
                type,
                payload: {
                    note: noteToSave
                }
            })
        }

    return <form onSubmit={handleSubmit}>
        <textarea
            className="border block p-2 text-lg w-full min-h-[15rem]"
            value={noteContent}
            onChange={handleChange}
            onKeyDown={EnterPress}
            ref={textareaRef}
            autoFocus
         />
         <div>{noteContent.length}/{charMax}</div>
         { validationError ? <div className="text-red-500">{validationError}</div> : null }
         <input
            type="submit" 
            className="bg-slate-600 text-white p-2 rounded"
            value="Save"
            />
    </form>
}