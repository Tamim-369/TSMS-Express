import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(" ")[1];
      // Checking if token exists
      if (!token) {
        return res.status(401).json({ message: "Not authorized" });
      }
      // Verify token
      if (token === null || token === undefined || token === "") {
        return res.status(401).json({ message: "Not authorized" });
      }

      // Decoding the token to take information
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // Checking if user exists
      if (decoded.userId === null || decoded.userId === undefined) {
        return res.status(401).json({ message: "Not authorized" });
      }

      // Add user id to request
      req.user = { userId: decoded?.userId };
      next();
    } catch (error) {
      console.error(error.message);
      return res.status(401).json({ message: "Not authorized" });
    }
  }
};
