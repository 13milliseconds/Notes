import React, { createContext, useReducer } from "react"
import { Note } from "./interfaces"
import notesJSON from '@/lib/sampleNotes.json'
import { dataReducer } from "./reducer"

export const dataContext = createContext< Note[] | null >(null)
export const dataDispatchContext = createContext< React.Dispatch<any> | null >(null)

interface Props{
    children: React.ReactNode
}

export function DataProvider ({ children }: Props) {
    const [database, dispatch] = useReducer(dataReducer, notesJSON);
  
    return (
      <dataContext.Provider value={database}>
        <dataDispatchContext.Provider value={dispatch}>
          {children}
        </dataDispatchContext.Provider>
      </dataContext.Provider>
    );
}