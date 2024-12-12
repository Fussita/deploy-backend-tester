import { Provider } from "@nestjs/common";
import { connect } from "mongoose";
import { envs } from "src/config/envs";

export const MongooseDataBaseProvider: Provider = 
  {
    provide: 'NoSQL',
    useFactory: async () => {
      try {
        const connection = await connect( `mongodb://${envs.db_user}:${envs.db_password}@${envs.db_host}:27017/`, {dbName: envs.db_name });
        return connection;
      } catch (error) {
        console.log(`Error al conectar a MongoDB: ${error.message}`);
        throw error;
      }
    },
  }