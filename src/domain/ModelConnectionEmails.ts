import { DataTypes } from "sequelize";
import { SequelizeDb } from "./Sequelize";
import config from 'config';

const schemaDb = config.get('sequelizeDbUsers.schemaUsers') as string;
const collectionUsers = config.get('sequelizeDbUsers.collectionUsers') as string;
const sequelize = new SequelizeDb(schemaDb);

export const Users = sequelize.clientDb.define(collectionUsers, {
    id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    },
    teudatZeut: {
    type: DataTypes.STRING,
    allowNull: false
    },
    password: {
    type: DataTypes.STRING,
    allowNull: false
    },
    date: {
    type: DataTypes.STRING,
    allowNull: true
    },
    entry: {
    type:  DataTypes.STRING,
    allowNull: true
    },
    startBreak: {
    type:  DataTypes.STRING,
    allowNull: true
    },
    endBreak: {
    type:  DataTypes.STRING,
    allowNull: true
    },
    exit: {
    type:  DataTypes.STRING,
    allowNull: true
    }
                           
});

connection();

async function connection () {
await sequelize.connect();
const users = await Users.findAll();
if (users.length == 0) {
    console.log('data in the db does not exist');
    } else {
    console.log(`data in the db already exists: ${users.length} items`, users.map((it: any) => {
        return {
            'id': it.get('id'),
            'tz': it.get('teudatZeut'),
            'date': it.get('date')
            
            
        
        }
        }));
    }
}



     
            
    
    
    

