import express from 'express'
import { dbConnection } from './lib/database.js'
import Users from './models/users.js'

const app = express()

app.use(express.json());

app.post('/users', async (req, res) => {
  try {
    await dbConnection();
    const { name, lastname, age, cc, pasword, role } = req.body;

    if (!name || !lastname || !age || !cc || !pasword) {
      return res.status(400).json({
        ok: false,
        message: "Faltan campos requeridos: name, lastname, age, cc, password",
      });
    }

    const newUser = new Users({
      name,
      lastname,
      age,
      cc,
      pasword,
      role: role || "user",
    });

    await newUser.save();
    res.status(201).json({
      ok: true,
      message: "Usuario creado exitosamente",
      user: newUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      message: "Error al crear usuario",
      error: error.message,
    });
  }
});

app.get('/users', async (req, res) => {
  try {
    await dbConnection();
    const users = await Users.find();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
});

app.post("/users/login", express.json(), async (req, res) => {
  await dbConnection();

  const { cc, password } = req.body;

  if (!cc || !password) {
    return res.status(400).json({
      ok: false,
      message: "CC y contraseña son requeridos",
    });
  }

  try {
    const user = await Users.findOne({ cc });

    if (!user) {
      return res.status(401).json({
        ok: false,
        message: "CC o contraseña incorrectos",
      });
    }

    if (user.password !== password) {
      return res.status(401).json({
        ok: false,
        message: "CC o contraseña incorrectos",
      });
    }

    res.status(200).json({
      ok: true,
      message: "Login exitoso",
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      message: "Error en el login",
      error: error.message,
    });
  }
});


app.put('/users', async (req, res) => {

  // aqui puede llamar ottas DBs
//  await dbConnection()

//  const { cedula } = req.params


//  const usuarioActualizado = await Usuario.findOneAndUpdate(
//   { nombre: "Juan" },          // 1. Filtro (busca el documento)
//   { $set: { edad: 32 } },      // 2. Actualización (aplica cambios)
//   { new: true }                // 3. Opción: devuelve el doc. actualizado
// );

//  const users = await Users.findOneAndUpdate(
//   {cc: cedula}
//  )

  res.json({
    messgee: "El put funciona",
  })
})




app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})
 