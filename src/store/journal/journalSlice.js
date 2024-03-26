import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
    name: 'journal',
    initialState: {
        isSaving: false,
        saveMessage: '',
        notes: [],
        active: null,
        // active: {
        //     id: '',
        //     titulo: '',
        //     body: '',
        //     date: 12-12-2023,
        //     imageurls: []
        // }
    },
    reducers: {

        savingNewNote: (state) => {
            state.isSaving = true;
        },
        addNewEmptyNote: (state, action) => {
            state.notes.push(action.payload);
            state.isSaving = false;
        },

        setActiveNote: (state, action) => {
            state.active = action.payload;
            state.saveMessage = '';
        },
        setNote: (state, action) => {
            state.notes = action.payload;
        },
        setSaving: (state) => {
            state.isSaving = true;
            state.saveMessage = '';
        },
        updateNote: (state, action) => {
            state.isSaving = false;
            state.notes = state.notes.map(note => {

                if (note.id === action.payload.id) {
                    return action.payload;
                }

                return note;
            });

            state.saveMessage = `${action.payload.titulo}, Actualizado correctamente`
        },
        setphotosActiveNote: (state, action) => {
            state.active.imageurls = [...state.active.imageurls, ...action.payload];
            state.isSaving = false;
        },
        clearNoteLogout: (state) => {
            state.isSaving = false;
            state.saveMessage = '';
            state.notes = [];
            state.active = null;
        },
        deleteByIdNote: (state, action) => {
            state.active = null;
            state.notes = state.notes.filter(note => note.id !== action.payload);

        }
    }
});


// Action creators are generated for each case reducer function
export const {
    addNewEmptyNote,
    setActiveNote,
    setNote,
    setSaving,
    updateNote,
    deleteByIdNote,
    savingNewNote,
    setphotosActiveNote,
    clearNoteLogout
} = journalSlice.actions;