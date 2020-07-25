import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { login } from '../actions/AuthActions';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(2,35),
            width: '100ch',
        },
    },
}));




const Login = ({ login }) => {

    const classes = useStyles();
    const [formData, setFormData] = useState({
        email:'',
        password:'',

    })


    const { email, password } = formData
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })
    const onSubmit = e => {
        e.preventDefault()
        login(email, password)
        
    }

    return (
        <div className='form-container'>
            <div>
             <h2 className='brandname'>Connectez-vous à votre compte!</h2>   
            </div>
            <div>
                <form className={classes.root} mx='auto' noValidate autoComplete="off" >
                    <TextField id="outlined-basic" label="Adresse Electronique" variant="outlined" name='email' value={email} onChange={e => onChange(e)}/>
                    <TextField id="outlined-password-input" type='password' label="Mot de Passe" autoComplete="current-password" variant="outlined" name='password' value={password} onChange={e => onChange(e)}/>
                    <Button className="home-btn val" variant="contained" color="secondary" disableElevation onClick={e => onSubmit(e)}>Se Connecter</Button>
                </form>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, {login})(Login)

