const env = require("../env")
const Manager = require('./manager');

const mysqlManager = new Manager(env.DB_HOST, env.DB_USER, env.DB_PASSWORD);

mysqlManager.createConnection()

mysqlManager.createDatabase("assistantJS")

mysqlManager.endConnection()