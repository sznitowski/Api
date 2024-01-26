import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Register } from "../../../redux/actions/usersActions";

import MessageTypes from "../../../Components/MessageTypes/MessageTypes";
import Loader from "../../../Components/Loader/Loader";
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
  InputAdornment,
  IconButton,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme({
  typography: {
    fontSize: 16,
    fontFamily: "Raleway, Arial",
  },
  palette: {
    primary: {
      main: "#1e88e5",
    },
    secondary: {
      main: "#00bcd4",
    },
  },
});

const Popup = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Recuperar contraseña</DialogTitle>
      <DialogContent>
        <Typography variant="body1">
          Comunícate con el departamento de Desarrollo para restablecer tu contraseña.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cerrar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default function SignUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [openPopup, setOpenPopup] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [message, setMessage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error } = userRegister;

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      if (password !== passwordConfirm) {
        setMessage("Las contraseñas no coinciden");
      } else {
        setMessage(null);
        await dispatch(Register(firstName, lastName, email, age, password, passwordConfirm));
        navigate("/userList");
      }
    } catch (error) {
      // Manejar errores
    }
  };

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleAgeChange = (event) => {
    setAge(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handlePasswordConfirmChange = (event) => {
    setPasswordConfirm(event.target.value);
  };

  const handleOpenPopup = () => {
    setOpenPopup(true);
  };

  const handleClosePopup = () => {
    setOpenPopup(false);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <ThemeProvider theme={theme}>
      {error && <MessageTypes variant="danger">{error}</MessageTypes>}
      {loading && <Loader />}
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "#f5f5f5", // Cambia el color de fondo
          padding: "16px",
          borderRadius: "8px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
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
            <Avatar sx={{ m: 1, bgcolor: theme.palette.secondary.main }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h4" fontWeight="bold" sx={{ mt: 2 }}>
              Registrarse
            </Typography>

            <Box sx={{ mt: 3 }} component="form" noValidate onSubmit={submitHandler}>
              <TextField
                onChange={handleFirstNameChange}
                margin="normal"
                required
                fullWidth
                id="firstName"
                label="Nombre"
                autoFocus
                value={firstName}
              />
              <TextField
                onChange={handleLastNameChange}
                margin="normal"
                required
                fullWidth
                id="lastName"
                label="Apellido"
                autoFocus
                value={lastName}
              />
              <TextField
                onChange={handleEmailChange}
                margin="normal"
                required
                fullWidth
                id="email"
                label="Correo Electrónico"
                autoFocus
                value={email}
              />
              <TextField
                onChange={handleAgeChange}
                margin="normal"
                required
                fullWidth
                id="age"
                label="Fecha de Nacimiento"
                type="date"
                autoFocus
                value={age}
              />
              <TextField
                onChange={handlePasswordChange}
                margin="normal"
                required
                fullWidth
                label="Contraseña"
                type={showPassword ? "text" : "password"}
                value={password}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={togglePasswordVisibility} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                onChange={handlePasswordConfirmChange}
                margin="normal"
                required
                fullWidth
                label="Confirme la contraseña"
                type="password"
                value={passwordConfirm}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Recordar"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, backgroundColor: theme.palette.primary.main, color: "#fff", fontSize: 18 }}
              >
                Ingresar
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link
                    onClick={handleOpenPopup}
                    variant="body2"
                    sx={{ color: theme.palette.secondary.main, cursor: "pointer" }}
                  >
                    ¿Olvidaste la contraseña?
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </Box>
      <Copyright sx={{ mt: 5 }} />
      <Popup open={openPopup} onClose={handleClosePopup} />
    </ThemeProvider>
  );
}
