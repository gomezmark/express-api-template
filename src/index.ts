import Modules from "./modules";
import errorHandler from "./middleware/errorHandler.middleware"
const express = require("express");
const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(Modules);
app.use(errorHandler);
app.use('/public', express.static('public'));

const server = app.listen(port, () => console.log(`Running!`));

export default server;
