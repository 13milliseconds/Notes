import React, { createContext, useReducer } from "react"
import { Note } from "./interfaces"
import notesJSON from '@/lib/sampleNotes.json'
import { dataReducer } from "./reducer"

export const dataContext = createContext< Note[] | null >(null)
export const dataDispatchContext = createContext< React.Dispatch<any> | null >(null)

interface Props{
    children: React.ReactNode
}

// Temporary convert JSON strings into dates
let sampleNotes = notesJSON.map((note) => {
  let newDate = new Date(note.createdAt)
  return {
    ...note,
    createdAt: newDate,
    updatedAt: newDate
  }
})

export function DataProvider ({ children }: Props) {
    const [database, dispatch] = useReducer(dataReducer, sampleNotes);
  
    return (
      <dataContext.Provider value={database}>
        <dataDispatchContext.Provider value={dispatch}>
          {children}
        </dataDispatchContext.Provider>
      </dataContext.Provider>
    );
}