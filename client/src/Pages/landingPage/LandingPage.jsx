import React from 'react';
import { Button, Container, Typography, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
    return (
        <div className='main'>
            <Container>
                <Grid container>
                    <Grid item xs={12}>
                        <div className='intro-text'>
                            <Typography variant='h2' className='title'>
                                Bienvenido!
                            </Typography>
                            <div className='buttonContainer'>
                                <Link to='/login'>
                                    <Button
                                        className='landingButton'
                                        variant='outlined'
                                        size='large'
                                    >
                                        Iniciar sesión
                                    </Button>
                                </Link>
                                <Link to='/regist'>
                                    <Button
                                        className='landingButton'
                                        variant='outlined'
                                        size='large'
                                    >
                                        Registrarse
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
};

export default LandingPage;
