import { DeleteOutline, SaveOutlined, UploadOutlined } from "@mui/icons-material"
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material"
import { ImageGallery } from "../components"
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.css'
import { useForm } from "../../hooks/useForm"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useMemo, useRef } from "react"
import { setActiveNote } from "../../store/journal/journalSlice"
import { startDeletingNote, startSaveNote, startUpLoadingFiles } from "../../store/journal/thunks"

export const NoteView = () => {

  const dispatch = useDispatch();
  const {active:note, saveMessage, isSaving}= useSelector(state=>state.journal)
  // console.log(note)
  const {body, titulo, onInputChange, formState, date} = useForm(note);
  //  console.log({body, titulo, date})
  const dateString = useMemo(()=> {
    const newDate = new Date(date);
    return newDate.toUTCString();
  },[date]);

  useEffect(() => {
     dispatch(setActiveNote(formState));
  }, [formState]);
  
  const onSaveNote = ()=> {
    dispatch(startSaveNote())
  }

  const onFileInputchange = ({target})=> {
    if(target.files===0) return;
    
    dispatch(startUpLoadingFiles(target.files))
  }

  const fileInputRef = useRef();

  useEffect(()=> {
    if(saveMessage.length>0){
      Swal.fire('Nota actualizada', saveMessage, 'success');
    }
  },[saveMessage])

  const onDelete = ()=> {
    dispatch(startDeletingNote());
  }
  return (
    <Grid container direction='row'
    className='animate__animated animate__fadeIn animate__faster' 
    justifyContent='space-between' alignItems='center' sx={{mb: 1}}>
        <Grid item>
            <Typography fontSize={39} fontWeight='light'>{dateString}</Typography>
        </Grid>
        <Grid item >
          <input type="file" multiple
          ref={fileInputRef} 
          onChange={onFileInputchange}
          style={{display: 'none'}}/>

          <IconButton onClick={()=> fileInputRef.current.click()}
           color='primary' disabled={isSaving}>

          <UploadOutlined/>
          </IconButton>

           <Button color="primary" sx={{padding:2}}
           onClick={onSaveNote}
           disabled={isSaving}>
            <SaveOutlined sx={{fontSize:30, mr:1}}/>
            Guardar
            </Button> 
        </Grid>

        <Grid container>
            <TextField type="text" variant="filled"
            placeholder="Ingrese un titulo"
            fullWidth label='Titulo' sx={{border: 'none', mb:1}}
            name="titulo" value={titulo} onChange={onInputChange}></TextField>
            <TextField type="text" variant="filled"
            multiline
            fullWidth placeholder="Que sucedio hoy?" minRows={5}
            name="body" value={body} onChange={onInputChange}></TextField>
        </Grid>
        <Grid container
        justifyContent='end'>
          <Button onClick={onDelete}
          sx={{mt:2}}
          color="error">
            Borrar
            <DeleteOutline/>
          </Button>
        </Grid>
        {/* <ImageGallery images={note.imageurls}/> */}
    </Grid>
  )
}
