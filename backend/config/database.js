import { Sequelize } from "sequelize";


const db = new Sequelize('RECOVER_YOUR_DATA', 'root' , '',{
    host : '34.60.177.44',
    dialect : 'mysql',
} );

export default db;