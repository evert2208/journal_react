import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { firebaseDB } from "../../firebase/config";
import { addNewEmptyNote, deleteByIdNote, savingNewNote, setActiveNote, setNote, setSaving, setphotosActiveNote, updateNote } from "./journalSlice";
import { fileUpload, loadNotes } from "../../helpers";

export const startNewNote = () => {
    return async(dispatch, getState) => {
        dispatch(savingNewNote());
        const { uid } = getState().auth;
        const newNote = {
            //  id: '',
            titulo: '',
            body: '',
            date: new Date().getTime(),
            // imageurls: []
        }

        const newDoc = doc(collection(firebaseDB, `${uid}/journal/notes`));
        await setDoc(newDoc, newNote);

        newNote.id = newDoc.id;

        dispatch(addNewEmptyNote(newNote));
        dispatch(setActiveNote(newNote));
    }
}

export const startLoadingNote = () => {
    return async(dispatch, getState) => {
        const { uid } = getState().auth;
        if (!uid) throw new Error('el uid no existe');
        const notes = await loadNotes(uid);
        dispatch(setNote(notes));
    }
}

export const startSaveNote = () => {
    return async(dispatch, getState) => {
        const { uid } = getState().auth;
        const { active: note } = getState().journal;
        const noteToFireStore = {...note };
        delete noteToFireStore.id;

        const docRef = doc(firebaseDB, `${uid}/journal/notes/${note.id}`);
        await setDoc(docRef, noteToFireStore, { merge: true });

        dispatch(updateNote(note));
    }

}

export const startUpLoadingFiles = (files = []) => {
    return async(dispatch) => {
        dispatch(setSaving());

        // await fileUpload(files[0]);

        const fileUploadPromises = [];
        for (const file of files) {
            fileUploadPromises.push(fileUpload(file))
        }


        const photosUrls = await Promise.all(fileUploadPromises);

        dispatch(setphotosActiveNote(photosUrls));

    }
}

export const startDeletingNote = () => {
    return async(dispatch, getState) => {
        const { uid } = getState().auth;
        const { active: note } = getState().journal;

        const docRef = doc(firebaseDB, `${uid}/journal/notes/${note.id}`);
        await deleteDoc(docRef);

        dispatch(deleteByIdNote(note.id))
    }
}