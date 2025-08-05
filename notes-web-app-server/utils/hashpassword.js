const bcrypt = require("bcrypt")

const hashPassWord = async (password) =>{
    const hashedPassWord = await bcrypt.hash(password , 10)
    return hashedPassWord
}

module.exports = hashPassWord