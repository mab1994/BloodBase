import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import AddToPhotosIcon from '@material-ui/icons/AddToPhotos';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import FavoriteIcon from '@material-ui/icons/Favorite';
import HomeIcon from '@material-ui/icons/Home';
import InvertColorsOutlinedIcon from '@material-ui/icons/InvertColorsOutlined';
import { Link } from 'react-router-dom';


const useStyles = makeStyles({
    root: {
        width: 500,
    },
});

const Navigation = () => {

    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    return (
        <div className='navbar'>
            <Link to='/' style={{ textDecoration: 'none' }}><div className='brand'>
                <InvertColorsOutlinedIcon color='secondary' fontSize='large' />
                <h2 className='brandname'>BloodBase</h2>
            </div></Link>

            <BottomNavigation
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
                showLabels
                className={classes.root}
            >
                <Link to='/'><BottomNavigationAction label="Accueil" icon={<HomeIcon />} /></Link>
                             <BottomNavigationAction label="Demandes du don" icon={<FavoriteIcon />} />
                <Link to='/register'><BottomNavigationAction label="Inscription" icon={<AddToPhotosIcon />} /></Link>
                <Link to='/login'><BottomNavigationAction label="Identification" icon={<ExitToAppIcon />} /></Link>
            </BottomNavigation>
        </div>

    )
}

export default Navigation
