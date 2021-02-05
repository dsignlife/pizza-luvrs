const Sequelize = require('sequelize')

const database = process.env.POSTGRES_DATABASE
const host = process.env.POSTGRES_HOST
const username = process.env.POSTGRES_USERNAME
const password = process.env.POSTGRES_PASSWORD

const pgClient = new Sequelize(
  database,
  username,
  password,
  {
    host: host,
    dialect: 'postgres'
  }
)

const Pizza = pgClient.define('pizza', {
  id: {
    type: Sequelize.STRING,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING
  },
  toppings: {
    type: Sequelize.STRING
  },
  img: {
    type: Sequelize.STRING
  },
  username: {
    type: Sequelize.STRING
  },
  created: {
    type: Sequelize.BIGINT
  }
})

Pizza.initialize = async () => {
  return Pizza.sync({ force: true }).then(() => {
    console.log('postgres connection ready')
  }).catch(err => console.error(err))
}

module.exports = Pizza
