import jwt from "jsonwebtoken"

export const verifyToken = (req, res, next) => {
    const token = req.header("Authorization")
    
    if (!token) {
        return res.status(401).json({ message: "Access Denied, invalid token" })
    }
    
    jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Invalid Token" })
        }
        req.user = user
        next()
    })
}