import authenticateToken from "./auth.mid.js";

const adminMid = (req, res, next) => {
  if (!req.user.isAdmin) res.status(401).send();
  return next();
};
export default [authenticateToken, adminMid];
