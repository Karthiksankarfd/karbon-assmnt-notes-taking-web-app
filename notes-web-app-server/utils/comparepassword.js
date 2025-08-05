const bcrypt = require("bcrypt")

const comparePassword = (password , userPassword) =>{
    const isPasswordMatching = bcrypt.compare(password , userPassword)
    return isPasswordMatching ;
}

module.exports = comparePassword ; 