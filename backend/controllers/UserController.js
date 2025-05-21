import Users from "../models/UserModels.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// REGISTER
export const Register = async (req, res) => {
  const { username, password } = req.body;

  try {
    if (!username || !password) {
      return res.status(400).json({ msg: "Username and password are required" });
    }

    const existingUser = await Users.findOne({ where: { username } });
    if (existingUser) {
      return res.status(409).json({ msg: "Username already taken" });
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    await Users.create({
      username,
      password: hashedPassword
    });

    res.status(201).json({ msg: "User registered successfully" });

  } catch (error) {
    console.error("❌ Register Error:", error); // ⬅️ tampilkan log lengkap
    res.status(500).json({ msg: error.message || "Internal Server Error" });
  }
};


// LOGIN
export const Login = async (req, res) => {
    try {
        const user = await Users.findOne({
            where: {
                username: req.body.username
            }
        });
        if (!user) {
            console.log("⚠️ User tidak ditemukan");
            return res.status(404).json({ msg: "User not found" });
        }

        const match = await bcrypt.compare(req.body.password, user.password);
        if (!match) {
            console.log("⚠️ Password salah");
            return res.status(400).json({ msg: "Wrong password" });
        }

        const userId = user.id;
        const username = user.username;
        const accessToken = jwt.sign({ userId, username }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: "15m"
        });
        const refreshToken = jwt.sign({ userId, username }, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: "1d"
        });

        await Users.update({ refresh_token: refreshToken }, {
            where: { id: userId }
        });

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        });

        res.json({ accessToken });
    } catch (error) {
        console.error("🔥 LOGIN ERROR:", error);
        res.status(500).json({ msg: "Login Failed" });
    }
};

// LOGOUT
export const Logout = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) return res.sendStatus(204); // No Content

        const user = await Users.findOne({
            where: { refresh_token: refreshToken }
        });
        if (!user) return res.sendStatus(204);

        await Users.update({ refresh_token: null }, {
            where: { id: user.id }
        });

        res.clearCookie("refreshToken");
        return res.sendStatus(200);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: "Logout Failed" });
    }
};

//Refresh Token
export const RefreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.sendStatus(401);

    const user = await Users.findOne({
      where: { refresh_token: refreshToken }
    });
    if (!user) return res.sendStatus(403);

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
      if (err) return res.sendStatus(403);

      const userId = user.id;
      const username = user.username;
      const accessToken = jwt.sign({ userId, username }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '15m'
      });

      res.json({ accessToken });
    });
  } catch (error) {
    console.error("🔥 RefreshToken error:", error.message);
    res.status(500).json({ msg: "Failed to refresh token" });
  }
};


