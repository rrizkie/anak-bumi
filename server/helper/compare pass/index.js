const bycrpt = require('bcryptjs')

const comparePassword = (input,pass) =>{
    const compared = bycrpt.hashSync(input,pass)
    console.log(compared)
    return compared
}

module.exports = comparePassword