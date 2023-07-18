# 📚 Notes
A simple notes web application built with NextJS

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Functionalities
- Load a set of sample notes
- Add your own notes
- Edit existing notes
- Delete existing notes
- Query the notes content

## Trade-offs
- For the sake of time, notes are loaded and edited in the app's context, using the `useContext` and `useReducer` hooks. Another option would have been to use `localstorage`.

## Future functionalities
- add database access to save notes
- add authentication to match notes with users
