import { useState } from "react"
import type { Note } from "@/lib/interfaces"

export const useSaveNote = (): [boolean, string | null, (note: Note) => void] => {
    const [ error, setError ] = useState<string | null>(null)
    const [ loading, setLoading ] = useState<boolean>(false)

    const saveNote = (note : Note) : void => {
        // TODO: Save the note
        console.log('Saving note...')
        try{
            setLoading(true)
            setTimeout(() => {
                setLoading(false)
                console.log(note)
            }, 1000)
        } 
        catch (error : any) {
            console.log(error)
            setError(error)
        }

    }

    return [
        loading,
        error,
        saveNote
    ]
}