import jwt from 'jsonwebtoken'

export default {
    createToken: function (data: any, time: any) {
        try{
            return jwt.sign(
                data,
                String(process.env.JWT_KEY),
            {expiresIn: `${time}`}
            )
        } catch (err) {
            return false
        }
    }
}