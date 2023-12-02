const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const user = require("../models/user");

const validateEmail = (email) => {
  return String(email).match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

module.exports = {
  register: async (req, res) => {
    try {
        if(req.body.name == null) {
            return res.status(400).json({
                status: 400,
                message: "Nama tidak boleh kosong."
            })
        }
        if(req.body.email == null) {
            return res.status(400).json({
                status: 400,
                message: "Email tidak boleh kosong."
            })
        }
        if(req.body.password == null) {
            return res.status(400).json({
                status: 400,
                message: "Password tidak boleh kosong."
            })
        }
        if (!validateEmail(req.body.email)) {
            return res.status(400).json({
              status: 400,
              msesage: "Email harus merupakan email yang valid.",
            });
          }
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const match = req.body.password == req.body.confirm_password;
      const isExist = user.findAll({
        where: {
          name: req.body.email,
        },
      });
      if (isExist.length > 0) {
        return res.status(400).json({
          status: 400,
          message: "Email sudah terdaftar.",
        });
      }
      if (!match) {
        return res.status(400).json({
          status: 400,
          message: "Password tidak cocok.",
        });
      }
      await user.create({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
      });
      res.status(201).json({
        status: 201,
        messsage: "Register berhasil, silahkan login",
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: error.message,
      });
    }
  },
  login: async(req, res) => {
    try{
        if (req.body.email == null) {
            return res.status(422).json({
                status: 422,
                message: "Email tidak boleh kosong."
            })
        }
        if (req.body.password == null) {
            return res.status(422).json({
                status: 422,
                message: "Password tidak boleh kosong."
            })
        }
        const userr = await user.findOne({
            where:{
                email: req.body.email
            }
        })

        console.log(userr);

        if(userr == null) {
            return res.status(404).json({
                status: 404,
                message: "Akun tidak ditemukan"
            })
        }

        const username = userr.name
        const userPassword = userr.password
        const password = req.body.password

        const match = await bcrypt.compare(password, userPassword)

        if(!match){
            return res.status(422).json({
                status: 422,
                message: "Password salah."
            })
        }

        const token = jwt.sign(
            { username },
            process.env.AUTH_KEY,
            {
                expiresIn: 3600
            }
        )

        return res.status(200).json({
            status: 200,
            message: "Login berhasil.",
            user: userr,
            token: token
        })

    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: error.message
        })
    }
  }
};
