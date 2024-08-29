const express = require('express');
const bodyParser = require('body-parser');
const { connectDB, disconnectDB } = require('./config/connectionDB.js');
const env = require('./config/configServer.js');
const router = require('./routes/index.js');


const app = express();
connectDB();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/api/', router);

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
