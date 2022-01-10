const mysql = require('mysql')

class Manager {
    constructor(host, user, password) {
        this.host = host
        this.user = user
        this.password = password
    }

    createConnection (){
        this.connection = mysql.createConnection({
            host: this.host,
            user: this.user,
            password: this.password
        })
        this.connection.connect((err) => {
            if (err){
                throw new Error("Connection failed: " + err)
            }
            console.log("Connection successfully")
        })
    }

    selectDatabase(database_name){
        this.connection.query(`USE ${database_name};`, err => {
            if (err){
                throw new Error(err)
            }
            console.log("Selected " + database_name)
        })

    }

    createTable (table_name, columns) {
        this.connection.query(`CREATE TABLE IF NOT EXISTS ${table_name} (${columns});`, (err) => {
            if (err){
                throw new Error("Creation table failed: " + err)
            }
            console.log("Table successfully created")
        })
    }
    deleteTable(table_name){
        this.connection.query(`DROP TABLE ${table_name};`,err =>{
            if(err){
                throw new Error("Delete table failed: "+err)
            }
            console.log("Table successfully deleted")
        })
    }
    createDatabase (database_name){
        this.connection.query(`CREATE DATABASE IF NOT EXISTS ${database_name};`, (err) => {
            if (err){
                throw new Error("Database creating failed!: " + err)
            }
            console.log("Creating successfully")
        })
    }

    deleteDatabase(db_name){
        this.connection.query(`DROP DATABASE ${db_name};`, (err) => {
            if (err){
                throw new Error("Database creating failed!: " + err)
            }
            console.log("Deleting successfully")
        })
    }

    addColumn (table_name, column_name, datatype){
        this.connection.query(`ALTER TABLE ${table_name} ADD ${column_name} ${datatype};`, (err) => {
            if (err){
                throw new Error("Add Column failed: " + err)
            }
            console.log("Adding column successfully")
        })
    }

    removeColumn (table_name, column_name){
        this.connection.query(`ALTER TABLE ${table_name}
            DROP COLUMN ${column_name};`, (err) => {
            if (err) {
                throw new Error("Removing Column failed: " + err)
            }
            console.log("Removing column successfully")
        })
    }

    editRow (table_name, column_name, value, condition){
        this.connection.query(`UPDATE ${table_name} SET ${column_name} = ${value} WHERE ${condition};`, (err) => {
            if (err) {
                throw new Error("Editing row failed: " + err)
            }
            console.log("Editing row successfully")

        })
    }
    insertInto(table_name,column,values){
        this.connection.query(`INSERT INTO ${table_name} (${column.join("")}) VALUES (${values.join(", ")})`, err =>{
            if(err) {
                throw new Error("INSERT INTO failed\n"+err)
            }
            console.log("Insert Into successfully")
        })

    }

    selectAll(table_name,column="*"){
        this.connection.query(`SELECT ${column} FROM ${table_name}`,(err, result)=>{
            if (err) throw err;
            return result
        })
    }
    selectWithCondition(table_name,condition,column="*"){
        this.connection.query(`SELECT ${column} FROM ${table_name} WHERE ${condition};`,(err, result)=>{
            if (err) throw err;
            console.log(result);
        })
    }
    endConnection(){
        this.connection.end()
    }

}

module.exports = Manager;

