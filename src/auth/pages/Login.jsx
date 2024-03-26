/* eslint-disable no-extra-boolean-cast */
import {Button, Alert, Grid, Link, TextField, Typography} from '@mui/material'
import {Google} from '@mui/icons-material'
import {Link as RouterLink} from 'react-router-dom';
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks/useForm';
import {useDispatch, useSelector} from 'react-redux';
import { checkingAuth, startGoogleSignIn, startLogin } from '../../store/auth/thunks';
import { useMemo } from 'react';

const formData = {
  email: '',
  password: ''
};

export const Login = () => {
  const {status, errorMessage} = useSelector(state=> state.auth);

  const dispatch= useDispatch();
  const {email, password, onInputChange} = useForm(formData);

  const isAuthenticating = useMemo(()=>status ==='checking', [status]);

  const onSubmit = (event)=> {
    event.preventDefault();
    dispatch(startLogin({email,password}));
    
  }

  const onGoogleSignIn = ()=> {
    dispatch(startGoogleSignIn());
  }

  return (

    <AuthLayout title='Login'>
        <form onSubmit={onSubmit}>
        <Grid container className='animate__animated animate__fadeIn animate__faster'>
          <Grid item xs={12} sx={{marginTop:2}}>
            <TextField value={email} name='email' onChange={onInputChange} label="Correo" type="email" fullWidth /> 
          </Grid>
          <Grid item xs={12} sx={{marginTop:2}}>
            <TextField value={password} onChange={onInputChange} name='password' label="Contraseña" type="password" fullWidth /> 
          </Grid>

          <Grid container
          spacing={2} sx={{mb:2, mt:0.5}}>

             <Grid item xs={12}
        display={!!errorMessage ? '': 'none'}>
          <Alert severity="error">{errorMessage}</Alert>
        </Grid>

            <Grid item xs={12} sm={6}>
              <Button disabled={isAuthenticating} variant='contained' type='submit' fullWidth> Login</Button>
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <Button disabled={isAuthenticating} variant='contained' onClick={onGoogleSignIn} fullWidth><Google/> <Typography sx={{ml:1}}>Google</Typography></Button>
            </Grid>
          </Grid>

          <Grid container
          direction="row" justifyContent="end">
            <Link component={RouterLink} color='inherit' to="/auth/register">Crear una cuenta</Link>

          </Grid>
        </Grid>
      </form>
    </AuthLayout>
    
   
  )
}
