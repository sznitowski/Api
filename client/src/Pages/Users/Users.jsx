import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, Register } from '../../redux/actions/usersActions';
import ErrorMessage from '../../Components/MessageTypes/MessageTypes';
import Loader from '../../Components/Loader/Loader';
import {
  createTheme,
  ThemeProvider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
  Typography,
  Container,
} from '@mui/material';

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

export default function Users() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    age: '',
    password: '',
  });

  const [selectedUser, setSelectedUser] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const usersData = useSelector((state) => state.fetchUsersData.data);
  const loading = useSelector((state) => state.fetchUsersData.loading);
  const error = useSelector((state) => state.fetchUsersData.error);

  useEffect(() => {
    console.log('Fetched users:', usersData);
    if (usersData && usersData.length > 0) {
      setUsers(usersData);
    }
  }, [usersData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const addUser = async () => {
    try {
      const response = await fetch('/api/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });
      if (response.ok) {
        fetchUsers();
        setNewUser({
          firstName: '',
          lastName: '',
          email: '',
          age: '',
          password: '',
        });
      } else {
        console.error('Error adding user:', response.status);
      }
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  const selectUser = (user) => {
    setSelectedUser(user);
  };

  const updateUser = async () => {
    try {
      const { id, firstName, lastName, email, age, password } = selectedUser;
      const updatedUser = { id, firstName, lastName, email, age, password };

      const response = await fetch(`/api/user/${selectedUser.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUser),
      });

      if (response.ok) {
        fetchUsers();
        setSelectedUser(null);
      } else {
        console.error('Error updating user:', response.status);
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const deleteUser = async (userId) => {
    try {
      const response = await fetch(`/api/user/${userId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchUsers();
      } else {
        console.error('Error deleting user:', response.status);
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main">
        <Paper elevation={3} sx={{ p: 3 }}>
          {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
          {loading && <Loader />}

          <Typography variant="h5">Agregar usuario</Typography>

          <TextField
            label="Nombre"
            name="firstName"
            value={newUser.firstName}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Apellido"
            name="lastName"
            value={newUser.lastName}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email"
            name="email"
            value={newUser.email}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Edad"
            type="date"
            name="age"
            value={newUser.age}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Contraseña"
            name="password"
            value={newUser.password}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />

          <Button variant="contained" color="primary" onClick={addUser} sx={{ mt: 2 }}>
            Crear nuevo usuario
          </Button>

          <Typography variant="h5" sx={{ mt: 3 }}>
            Lista
          </Typography>
          <TableContainer component={Paper} sx={{ mt: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID_Usuario</TableCell>
                  <TableCell>Nombre</TableCell>
                  <TableCell>Apellido</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Edad</TableCell>
                  <TableCell>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users &&
                  users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>{user.id}</TableCell>
                      <TableCell>{user.firstName}</TableCell>
                      <TableCell>{user.lastName}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.age}</TableCell>
                      <TableCell>
                        <Button variant="contained" color="primary" onClick={() => selectUser(user)}>
                          Editar
                        </Button>
                        <Button variant="contained" color="secondary" onClick={() => deleteUser(user.id)}>
                          Eliminar
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>

          {selectedUser && (
            <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
              <Typography variant="h5">Editar usuario</Typography>
              <TextField
                label="Nombre"
                name="firstName"
                value={selectedUser.firstName}
                onChange={(e) =>
                  setSelectedUser({ ...selectedUser, firstName: e.target.value })
                }
                fullWidth
                margin="normal"
              />
              <TextField
                label="Apellido"
                name="lastName"
                value={selectedUser.lastName}
                onChange={(e) =>
                  setSelectedUser({ ...selectedUser, lastName: e.target.value })
                }
                fullWidth
                margin="normal"
              />

              <TextField
                label="Email"
                name="email"
                value={selectedUser.email}
                onChange={(e) =>
                  setSelectedUser({ ...selectedUser, email: e.target.value })
                }
                fullWidth
                margin="normal"
              />
              <TextField
                label="Edad"
                name="age"
                value={selectedUser.age}
                onChange={(e) =>
                  setSelectedUser({ ...selectedUser, age: e.target.value })
                }
                fullWidth
                margin="normal"
              />
              <TextField
                label="Contraseña"
                name="password"
                value={selectedUser.password}
                onChange={(e) =>
                  setSelectedUser({ ...selectedUser, password: e.target.value })
                }
                fullWidth
                margin="normal"
              />

              <Button variant="contained" color="primary" onClick={updateUser} sx={{ mt: 2 }}>
                Actualizar usuario
              </Button>
            </Paper>
          )}
        </Paper>
      </Container>
    </ThemeProvider>
  );
}
