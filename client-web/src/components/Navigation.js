import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import AddToPhotosIcon from '@material-ui/icons/AddToPhotos';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import FavoriteIcon from '@material-ui/icons/Favorite';
import HomeIcon from '@material-ui/icons/Home';
import DirectionsWalkIcon from '@material-ui/icons/DirectionsWalk';
import PersonSharpIcon from '@material-ui/icons/PersonSharp';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import InvertColorsOutlinedIcon from '@material-ui/icons/InvertColorsOutlined';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../actions/AuthActions';


const useStyles = makeStyles({
    root: {
        width: 500,
    },
});

const Navigation = ({ auth: { isAuthenticated, user, loading }, logout }) => {
    
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const notConnected = () => (
        <BottomNavigation
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
                showLabels
                className={classes.root}
                
            >
                <Link to='/' style={{ textDecoration:'none' }}><BottomNavigationAction showLabel label="Accueil" icon={<HomeIcon />} /></Link>
                             <BottomNavigationAction showLabel label="Demandes du don" icon={<FavoriteIcon />} />
                <Link to='/register' style={{ textDecoration:'none' }}><BottomNavigationAction showLabel  label="Inscription" icon={<AddToPhotosIcon />} /></Link>
                <Link to='/login' style={{ textDecoration:'none' }}><BottomNavigationAction showLabel label="Identification" icon={<ExitToAppIcon />} /></Link>
            </BottomNavigation>
    );

    const donorConnected = () => (
        <BottomNavigation
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
                showLabels
                className={classes.root}
            >
                             <BottomNavigationAction label="Profil" icon={<PersonSharpIcon />} />
                             <BottomNavigationAction label="Demandes du don" icon={<FavoriteIcon />} />
                <Link to='/' style={{ textDecoration:'none' }}><BottomNavigationAction showLabel label="Quitter" icon={<DirectionsWalkIcon />} onClick={logout} /></Link>
            </BottomNavigation>
    )

    const centerConnected = () => (
        <BottomNavigation
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
                showLabels
                className={classes.root}
            >
                             <BottomNavigationAction label="Profil" icon={<AccountBalanceIcon />} />
                             <BottomNavigationAction label="Demandes du don" icon={<FavoriteIcon />} />
                             <BottomNavigationAction label="Nouvelle demande" icon={<NoteAddIcon />} />
                <Link to='/' style={{ textDecoration:'none' }}><BottomNavigationAction showLabel label="Quitter" icon={<DirectionsWalkIcon />} onClick={logout} /></Link>
            </BottomNavigation>
    )

    

    return (
        <div className='navbar'>
            <Link to='/' style={{ textDecoration: 'none' }}><div className='brand'>
                <InvertColorsOutlinedIcon color='secondary' fontSize='large' />
                <h2 className='brandname'>BloodBase</h2>
            </div></Link>

            {
                (isAuthenticated) ? (user.kind === 'Donneur' ? donorConnected() : centerConnected()) : notConnected()
            }
        </div>

    )
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { logout })(Navigation)
