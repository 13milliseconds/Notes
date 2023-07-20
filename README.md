# 📚 Notes
A simple notes web application built with NextJS\
Try out the demo [here](https://notes.francoishuyghe.com/).

## Getting Started

Run the development server with `npm run dev`

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Functionalities
- Load a set of sample notes
- Add your own notes
- Edit existing notes
- Delete existing notes
- Query the notes content
- Light/Dark mode management
- Datetime management

## Trade-offs
- For the sake of time, notes are loaded and edited in the app's context, using the `useContext` and `useReducer` hooks. Another option would have been to use `localstorage` for this proof of concept

## Future functionalities
- add database access to save notes
- add authentication to match notes with users
- Sharing options
