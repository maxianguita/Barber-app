const User = require('../models/User'); 
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authController = {
  register: async (req, res) => {
    try {
      const { email, password } = req.body;

      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ message: 'El usuario ya existe' });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      await User.create({
        email,
        password: hashedPassword
      });

      res.status(201).json({ message: 'Usuario creado correctamente' });

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error en el servidor', error });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(400).json({ message: 'Usuario o contraseña incorrectos' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Usuario o contraseña incorrectos' });
      }
    //   console.log('JWT_SECRET:', process.env.JWT_SECRET);
    //   const token = jwt.sign(
    //     { id: user.id, email: user.email,name: newUser.nombre, },
    //     process.env.JWT_SECRET,
    //     { expiresIn: '1h' }
    //   );
    const token = jwt.sign(
        { id: user.id,
           email: user.email,
            name: user.nombre,
            // nombre: user.nombre,   
            rol: user.rol           
          },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
      

      res.json({
        token,
        user: {
          id: user.id,
          email: user.email,
          rol: user.rol, 
          nombre: user.nombre, 
        }
      });
      

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error en el servidor', error });
    }
  }
};

module.exports = authController;
