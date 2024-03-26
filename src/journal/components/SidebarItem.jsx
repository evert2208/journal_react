import { TurnedInNot } from '@mui/icons-material'
import {ListItem, ListItemButton, ListItemIcon, Grid, ListItemText} from '@mui/material'
import { useMemo } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { setActiveNote } from '../../store/journal/journalSlice'

export const SidebarItem = ({titulo='', body, id, date, imageurls=[]}) => {

    const dispatch = useDispatch();
    const onClickNote = ()=> {
        dispatch(setActiveNote({titulo, body, id, date, imageurls}));
    }

    const newTitle = useMemo(()=>{
        return titulo.length>17 
        ? titulo.substring(0,17)+'...'
        :titulo;
    },[titulo])
  return (
    <ListItem disablePadding>
                            <ListItemButton onClick={onClickNote}>
                                <ListItemIcon>
                                    <TurnedInNot/>
                                </ListItemIcon>
                                <Grid container>
                                    <ListItemText primary={titulo}/>
                                    <ListItemText secondary={body}/>
                                </Grid>
                            </ListItemButton>
                        </ListItem>
  )
}
