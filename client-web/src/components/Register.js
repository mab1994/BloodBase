import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
// import Visibility from '@material-ui/icons/Visibility';
// import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { Link, Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { setAlert } from '../actions/AlertActions';
import { register } from '../actions/AuthActions'


const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(2, 35),
            width: '100ch',
        },
    },
}));

const kinds = [
    {
        value: 'None',
        label: ''
    },
    {
        value: 'Donneur',
        label: 'Donneur'
    },
    {
        value: 'Centre Médical',
        label: 'Centre Médical'
    },
]


const Register = ({ setAlert, register, isAuthenticated, kindAuthenticated }) => {

    const classes = useStyles();
    const [kind, setKind] = useState('')
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        passwordConfirm: '',
        kind: ''

    })

    const handleKindChange = e => {
        setKind(e.target.value)
        onChange(e)
    }

    const { name, email, password, passwordConfirm } = formData
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })
    const onSubmit = async e => {
        e.preventDefault()
        if (password !== passwordConfirm) {
            setAlert('Mots de Passe incohérents!', 'warning', 'filled')
            window.scrollTo(0, 0)
            console.log('fail...')
        } else {
            register({ name, email, password, kind })
        }
    }

    if(isAuthenticated && kindAuthenticated === 'Donneur') {
        return <Redirect to="/donorform" />
    } else if(isAuthenticated && kindAuthenticated === 'Centre Médical') {
        return <Redirect to="/centerform" />
    }

    return (
        <div className='form-container'>
            <div>
                <h2 className='brandname'>Inscrivez à BloodBase maintenant! C'est gratuit</h2>
            </div>
            <div>
                <form className={classes.root} mx='auto' autoComplete="off" >
                    <TextField id="outlined-basic" label="Nom Complet" variant="outlined" helperText="Du format 'Prénom Nom' si vous êtes un donneur, sinon écrivez le nom commercial du centre médical" value={name} name='name' onChange={e => onChange(e)} />
                    <TextField id="outlined" label="Adresse Electronique" variant="outlined" name='email' value={email} onChange={e => onChange(e)} />
                    <TextField id="outlined-password-input" type='password' label="Mot de Passe" autoComplete="current-password" variant="outlined" name='password' value={password} onChange={e => onChange(e)} />
                    <TextField id="outlined-password-input" type='password' label="Confirmer le Mot de Passe" autoComplete="current-password" variant="outlined" name='passwordConfirm' value={passwordConfirm} onChange={e => onChange(e)} />
                    <TextField id="outlined-select-kind" select label="Type d'Utilisateur" name='kind' value={kind} onChange={handleKindChange} helperText="Choisissez le type d'utilisateur" variant="outlined">
                        {
                            kinds.map(op => (
                                <MenuItem key={op.value} value={op.value}>
                                    {op.label}
                                </MenuItem>
                            ))
                        }
                    </TextField>
                    <Button className="home-btn val" variant="contained" color="primary" disableElevation onClick={e => onSubmit(e)}>Valider</Button>
                </form>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    kindAuthenticated: state.auth.user.kind
})

export default connect(mapStateToProps, { setAlert, register })(Register)
