const dotenv = require('dotenv')
dotenv.config()

module.exports = {

  development: {
    client: 'pg',
    connection: 'postgress://localhost/g51blog'
},
test: {
    client: 'pg',
    connection: 'postgres://localhost/test-g51blog'
},
production: {
    client: 'pg',
    connection: process.env.DATABASE_URL + '?ssl=true'
}

};
