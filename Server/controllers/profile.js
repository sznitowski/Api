/* const User = require('../models/user');
const Profile = require('../models/profile');

// Función para crear un nuevo usuario con perfil asociado
async function createUserWithProfile(req, res) {
  try {
    // Verifica si el email ya existe en la base de datos
    const existingUser = await User.findOne({ where: { email: req.body.email } });
    if (existingUser) {
      return res.status(409).json({
        message: 'Email already exists',
      });
    }

    // Crea el usuario
    const newUser = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      age: req.body.age,
      password: req.body.password,
    };

    const user = await User.create(newUser);

    // Crea el perfil asociado al usuario
    const newProfile = {
      bio: req.body.bio, // Puedes obtener la información del perfil desde la solicitud
      location: req.body.location,
      // Puedes agregar más campos de perfil según sea necesario
      userId: user.id, // Asocia el perfil con el usuario recién creado
    };

    await Profile.create(newProfile);

    res.status(201).json({
      user: user,
      message: 'User created successfully',
    });
  } catch (error) {
    res.status(500).json({
      message: 'Something went wrong',
    });
  }
}

module.exports = createUserWithProfile */