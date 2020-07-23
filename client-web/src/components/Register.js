import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
// import Visibility from '@material-ui/icons/Visibility';
// import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { setAlert } from '../actions/AlertActions'

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(2,35),
            width: '100ch',
        },
    },
}));

const kinds = [
    {
        value: 'Donneur',
        label: 'Donneur'
    },
    {
        value: 'Centre Médical',
        label: 'Centre Médical'
    },
]


const Register = props => {

    const classes = useStyles();
    const [kind, setKind] = useState('Donneur')
    const [formData, setFormData] = useState({
        name:'',
        email:'',
        password:'',
        passwordConfirm:'',
        kind: ''

    })

    const handleKindChange = e => {
        setKind(e.target.value)
    }

    const { name, email, password, passwordConfirm } = formData
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })
    const onSubmit = e => {
        e.preventDefault()
        if (password !== passwordConfirm) {
            // props.setAlert('Mots de Passe incohérents!', 'error', 'filled')
            console.log('fail...')
        } else {
            console.log(formData)
        }
    }

    return (
        <div className='form-container'>
            <div>
             <h2 className='brandname'>Inscrivez à BloodBase maintenant! C'est gratuit</h2>   
            </div>
            <div>
                <form className={classes.root} mx='auto' autoComplete="off" >
                    <TextField id="outlined-basic" label="Nom Complet" variant="outlined" helperText="Du format 'Prénom Nom' si vous êtes un donneur, sinon écrivez le nom commercial du centre médical" value={name} name='name' onChange={e => onChange(e)}/>
                    <TextField id="outlined-basic" label="Adresse Electronique" variant="outlined" name='email' value={email} onChange={e => onChange(e)}/>
                    <TextField id="outlined-password-input" type='password' label="Mot de Passe" autoComplete="current-password" variant="outlined" name='password' value={password} onChange={e => onChange(e)}/>
                    <TextField id="outlined-password-input" type='password' label="Confirmer le Mot de Passe" autoComplete="current-password" variant="outlined" name='passwordConfirm' value={passwordConfirm} onChange={e => onChange(e)}/>
                    <TextField id="outlined-select-kind" select label="Type d'Utilisateur" value={kind} onChange={handleKindChange} helperText="Choisissez le type d'utilisateur" variant="outlined" onChange={e => onChange(e)}>
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

export default connect(null, {setAlert})(Register)
