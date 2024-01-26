import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../../redux/actions/usersActions";
import Loader from "../../../Components/Loader/Loader";
import MessageTypes from "../../../Components/MessageTypes/MessageTypes";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CssBaseline,
  Box,
  Avatar,
  TextField,
  Button,
  Typography,
  Container,
  Grid,
  Link,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontSize: 16,
    fontFamily: 'Raleway, Arial',
  },
  palette: {
    primary: {
      main: '#1e88e5',
    },
    secondary: {
      main: '#00bcd4',
    },
  },
});

const Popup = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Recuperar contraseña</DialogTitle>
      <DialogContent>
        <Typography variant="body1">
          Comunícate con el departamento de Desarrollo para restablecer tu
          contraseña.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cerrar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openPopup, setOpenPopup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loading, error } = useSelector((state) => state.userLogin);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await dispatch(login(email, password)); // Wait for the login action to complete
      navigate("/userList"); // Navigate on successful login
    } catch (error) {
      // Handle error if needed
    }
  };

  const handleOpenPopup = () => {
    setOpenPopup(true);
  };

  const handleClosePopup = () => {
    setOpenPopup(false);
  };

  return (
    <ThemeProvider theme={theme}>
      {error && <MessageTypes variant="danger">{error}</MessageTypes>}
      {loading && <Loader />}
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          minHeight: "100vh",
          justifyContent: "center",
          background: "rgba(0, 0, 0, 0.5)",
        }}
      >
        <Container component="main" maxWidth="xs">
          <Box
            sx={{
              marginTop: -18,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              backgroundColor: "#fff",
              padding: "16px",
              borderRadius: "8px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Iniciar Sesión
            </Typography>

            <Box
              sx={{
                fontFamily: 'Raleway',
                marginTop: 2,
              }}
              component="form"
              noValidate
              onSubmit={submitHandler}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Correo Electrónico"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                label="Contraseña"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Recordar"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Ingresar
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link
                    component="button"
                    variant="body2"
                    onClick={handleOpenPopup}
                  >
                    ¿Olvidaste la contraseña?
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </Box>
      <Popup open={openPopup} onClose={handleClosePopup} />
    </ThemeProvider>
  );
}
