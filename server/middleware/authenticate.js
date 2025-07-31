import jwt from "jsonwebtoken";

const authenticate = async (req, res, next) => {
  const token = req.header("x-auth-token");

  if (!token) {
    return res
      .status(401)
      .json({ msg: "No Token Provided, Authentication Denied" });
  }

  try {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded.user;
    next();
  } catch (error) {
    console.error("JWT Verification Error:", error);
    res.status(500).json({ msg: "Invalid Token" });
  }
};

export default authenticate;
