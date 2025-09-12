export const roleMiddleware = (...rolesPermitidos) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "Invalid Authentication" });
    }

    if (!rolesPermitidos.includes(req.user.rol)) {
      return res.status(403).json({ message: "You don't have permissions for this action." });
    }

    next(); 
  };
};
