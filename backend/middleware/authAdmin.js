import jwt from "jsonwebtoken";

const authAdmin = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Not Authorized",
      });
    }

    const token = authHeader.split(" ")[1];

    const token_decode = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    if (token_decode.email !== process.env.ADMIN_EMAIL) {
      return res.status(403).json({
        success: false,
        message: "Admin access required",
      });
    }

    next();
  } catch (error) {
    console.log(error);

    return res.status(401).json({
      success: false,
      message: "Invalid or expired admin token",
    });
  }
};

export default authAdmin;