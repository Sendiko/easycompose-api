const sql = require('sequelize')
const database = new sql("easycompose", "root", "", {
    dialect: "mysql"
})

database.authenticate().then(() => {
    console.log('connected to database!')
}).catch((error) => {
    console.error(error);
})

module.exports = database