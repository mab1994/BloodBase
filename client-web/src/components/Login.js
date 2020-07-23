import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(2,35),
            width: '100ch',
        },
    },
}));




const Login = () => {

    const classes = useStyles();
    const [formData, setFormData] = useState({
        email:'',
        password:'',

    })


    const { email, password } = formData
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })
    const onSubmit = e => {
        e.preventDefault()
        console.log('succ...')
        
    }

    return (
        <div className='form-container'>
            <div>
             <h2 className='brandname'>Connectez-vous à votre compte!</h2>   
            </div>
            <div>
                <form className={classes.root} mx='auto' noValidate autoComplete="off" onChange={e => onSubmit(e)}>
                    <TextField id="outlined-basic" label="Adresse Electronique" variant="outlined" name='email' value={email} onChange={e => onChange(e)}/>
                    <TextField id="outlined-password-input" type='password' label="Mot de Passe" autoComplete="current-password" variant="outlined" name='password' value={password} onChange={e => onChange(e)}/>
                </form>
            </div>
            <div>
            <Button className="home-btn val" variant="contained" color="secondary" disableElevation>Se Connecter</Button>
            </div>
        </div>
    )
}

export default Login

