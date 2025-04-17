import { Sequelize } from "sequelize";


const db = new Sequelize('RECOVER_YOUR_DATA', 'root' , '',{
    host : '35.222.154.88',
    dialect : 'mysql',
} );

export default db;