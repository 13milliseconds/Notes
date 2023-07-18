import { Note } from "./interfaces";

export const dbActions = {
    // Generic
    ADD_DOCUMENT: 'ADD_DOCUMENT',
    EDIT_DOCUMENT: 'EDIT_DOCUMENT',
    DELETE_DOCUMENT: 'DELETE_DOCUMENT',
    LOAD_DOCUMENTS: 'LOAD_DOCUMENTS',
  }

type Action = {type: string, payload: { note: Note}}

export function dataReducer(notes: Note[], action: Action) {
    switch (action.type) {
      case dbActions.ADD_DOCUMENT: {
        return [...notes, action.payload.note];
      }
      case dbActions.EDIT_DOCUMENT: {
        return notes.map((n: Note) => {
          if (action.payload.note && n._id === action.payload.note._id) {
            return action.payload.note;
          } else {
            return n;
          }
        });
      }
      case dbActions.DELETE_DOCUMENT: {
        return notes.filter((n: Note) => n._id !== action.payload.note._id);
      }
      case dbActions.LOAD_DOCUMENTS: {
        return notes
      }
      default: {
        throw Error('Unknown action: ' + action.type);
      }
    }
  }