const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userController = (User) => {

  const getUsers = async (req, res) => {
    const { query } = req;
    const response = await User.find(query);
    res.json(response);
}

  const postUsers = async (req, res) => {
    const user = new User(req.body);
    user.password = await bcrypt.hash(user.password, 5);
    await user.save();
    res.json(user);
}

  const getUserById = async (req, res) => {
    const { params } = req;
    const response = await User.findById(params.userId);
    res.json(response);   
}

  const getUserByName = async (req, res) => {
    const { params } = req;
    const response = await User.findById(params.userName);
    res.json(response);
  }

  const putUsers = async (req, res) => {
    const { body } = req;
    const response = await User.updateOne({
        _id: req.params.userId
    }, {
        $set: {
            firsName: body.firsName,
            lastName: body.lastName,
            userName: body.userName,
            password: await bcrypt.hash(body.password, 5),
            email: body.email,
            address: body.address,
            phone: body.phone
        }
    });
    res.json(response);
  }
    const deleteUserById = 
      async (req, res) => {
        try {
            await User.findByIdAndDelete(req.params.userId);
            return res.status(202).json("usuario eliminado");
          } catch (err) {
            res.status(404).json("usuario no encontrado");
          }
    }

    const postLogin = async (req, res) => {
        const { body } = req;

        var response = await User.findOne({"userName": body.userName});

        if(response == null){
          res.status(401).json('Credenciales inválidas')
        }
        else if (await bcrypt.compare(body.password, response.password)){
          const savedUser = response;

          const token = generateToken(savedUser);
          response = {message: "Listo", token};
        }
        else {
          response = {message: "Credenciales inválidas"};
        }
        res.json(response);
    }

    const generateToken = savedUser => {
      const tokenPayLoad = {
        name: savedUser.name,
        userName: savedUser.userName,
        lastName: savedUser.lastName
      }
      return jwt.sign(tokenPayLoad, 'secret', { expiresIn: '1h' });
    }

    const validateToken = async (req, res) => {
      const {body} = req;
      const token = body.token;
      var decoded = jwt.verify(token, 'secret');
      //decodifica el token
      res.json(decoded);
    }

  return { getUsers, postUsers, getUserById, putUsers, deleteUserById, postLogin, validateToken, getUserByName };
}

module.exports = userController;