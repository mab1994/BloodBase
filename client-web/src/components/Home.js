import React from 'react';
import { Link } from 'react-router-dom';
import InvertColorsOutlinedIcon from '@material-ui/icons/InvertColorsOutlined';
import Button from '@material-ui/core/Button'

const Home = () => {
    return (
        <div className='centered'>
            <div className="lg-logo">
                <InvertColorsOutlinedIcon color='secondary' style={{ fontSize: 150 }} />
            </div>
            <div className="lg-desc">
                <p className='c-desc'>Bienvenue à <strong>BloodBase</strong>, <br />
                Il s'agit d'un service <strong>gratuit</strong> pour l'organisation du don du sang en Tunisie. <br />
                Notre mission est de former la plus grande base des données des donneurs du sang au pays et notre objectif est de promouvoir la culture du don chez la population.<br />
                Nous nous engageons que les informations fournies seront securisés, non modifiable ni supprimés que par la personne elle-même.<br />
                Pour se bénificier du ce service il faut avoir tout d'abord <strong>un compte</strong>.</p>
            </div>
            <div className="lg-btns">
                <Link to='/login' style={{ textDecoration: 'none' }}><Button className="home-btn" variant="contained" color="secondary" disableElevation>
                    S'identifier
                </Button></Link>
                <Link to='/register' style={{ textDecoration: 'none' }}><Button className="home-btn" variant="outlined" color="primary" disableElevation>
                    S'inscrire
                </Button></Link>
            </div>
        </div>
    )
}

export default Home
