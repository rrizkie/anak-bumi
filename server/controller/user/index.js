const { User } = require("../../models");
const comparePass = require("../../helper/compare pass");
const { generateToken, verification } = require("../../helper/token");

class Controller {
  static register = async (req, res) => {
    const { username, password, email, address, phone } = req.body;
    const userData = await User.create({
      username,
      password,
      email,
      address,
      phone,
    });
    return res.status(200).json({
      username: userData.username,
      address: userData.address,
      phone: userData.phone,
    });
  };

  static login = async (req, res) => {
    const { email, password } = req.body;
    const userLogin = await User.findOne({ where: { email } });
    const verified = comparePass(password, userLogin.password);
    if (verified) {
      const access_token = generateToken({
        id: userLogin.id,
        email,
        username: userLogin.username,
        address: userLogin.address,
        phone: userLogin.phone,
      });
      return res
        .status(200)
        .json({ access_token, username: userLogin.username });
    } else {
      return res.status(400).json({ msg: `Invalid email or password` });
    }
  };
}

module.exports = Controller;
