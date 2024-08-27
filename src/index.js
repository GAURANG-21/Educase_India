import express from "express"
import bodyParser from "body-parser";
import { connectDB, disconnectDB } from "./config/connectionDB.js";
import {env} from './config/configServer.js'

const app = express();
await connectDB();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.listen(env.PORT, 
    ()=>{
        console.log(`Server is running on PORT ${env.PORT}`);
        if(process.env.DB_SYNC) db.sequelize.sync({ alter: true });
    }
)

process.on("SIGINT", async () => {
    await disconnectDB();
    process.exit(0);
  });