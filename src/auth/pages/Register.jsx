/* eslint-disable no-extra-boolean-cast */
import { AuthLayout } from "../layout/AuthLayout"
import {Alert, Button, Grid, Link, TextField, Typography} from '@mui/material'
import {Link as RouterLink} from 'react-router-dom';
import { useForm } from "../../hooks/useForm";
import { useState, useMemo } from "react";
import { useDispatch, useSelector} from 'react-redux';
import { startCreateUser } from "../../store/auth/thunks";

const formValidations = {
  email: [ (value)=> value.includes('@'), 'no tiene a un @'],
  password: [ (value)=> value.length>=6, 'minimo 6 caracteres'],
  displayName: [ (value)=> value.length>=1, 'nombre requerido'],
}

export const Register = () => {

  const dispatch = useDispatch();

  const [formSubmit, setformSubmit] = useState(false);

const {status, errorMessage } = useSelector(state=> state.auth);

const isAuthenticating = useMemo(()=>status ==='checking', [status]);

  const {email, displayName, password, onInputChange,
    isFormValid, formState, emailValid, displayNameValid, passwordValid} = useForm({
    email: '',
    password: '',
    displayName: ''
  }, formValidations);

  const onSubmit = (event)=> {
    
    event.preventDefault();
    setformSubmit(true);
    if(!isFormValid) return;

    dispatch( startCreateUser(formState));
  }
  return (
    <AuthLayout title='Crear Cuenta'>
    <form onSubmit={onSubmit}>
    <Grid container className='animate__animated animate__fadeIn animate__faster'>
    <Grid item xs={12} sx={{marginTop:2}}>
        <TextField onChange={onInputChange} 
        value={displayName} label="Nombre" 
        name="displayName" 
        type="text" fullWidth
        error={!!displayNameValid && formSubmit} 
        helperText={displayNameValid} /> 
      </Grid>

      <Grid item xs={12} sx={{marginTop:2}}>
        <TextField onChange={onInputChange} 
        value={email} label="Correo" name="email" 
        type="email" fullWidth 
        error={!!emailValid && formSubmit} helperText={emailValid}/> 
      </Grid>

      <Grid item xs={12} sx={{marginTop:2}}>
        <TextField onChange={onInputChange} value={password} 
        label="Contraseña" name="password" 
        type="password" fullWidth 
        error={!!passwordValid && formSubmit} helperText={passwordValid}/> 
      </Grid>

      <Grid container
      spacing={2} sx={{mb:2, mt:2}}>
        <Grid item xs={12}
        display={!!errorMessage ? '': 'none'}>
          <Alert severity="error">{errorMessage}</Alert>
        </Grid>

        <Grid item xs={12}>
          <Button disabled={isAuthenticating} type="submit" variant='contained' fullWidth>Crear Cuenta</Button>
        </Grid>
        
      </Grid>
      <Grid container
      direction="row" justifyContent="end">
        <Typography sx={{mr:1}}>¿Ya tienes cuenta?</Typography>
        <Link component={RouterLink} color='inherit' to="/auth/login">Ingresar</Link>

      </Grid>
    </Grid>
  </form>
</AuthLayout>
  )
}
