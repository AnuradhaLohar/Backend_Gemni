import jwt from 'jsonwebtoken'
import 'dotenv/config'

const verifyUser = async (req, res, next) => {
    const header = req.headers.authorization

    if (!header) {
       return res.status(400).json({
            status: 'error',
            message: 'Unauthorised User'
        })
    }
    try {
        const token = header.split(' ')[1]
        const tokenData = jwt.verify(token, process.env.JWT_SECRET_KEY)

        if (!tokenData) {
           return res.status(400).json({
                status: 'error',
                message: 'Unauthorised User'
            })
        }

        req.userId = tokenData.userId
        next()
    } catch (error) {
        return (
            res.status(400).json({
                status: 'error',
                message: error.message
            })
        )
    }

}

export default verifyUser 