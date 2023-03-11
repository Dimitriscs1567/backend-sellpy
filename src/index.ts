import express from "express";
import { handleErrors } from "./controllers/error";
import dbFunctions from "./database";
import itemRoutes from "./routes/item";
import cartRoutes from "./routes/cart";

const app = express();

const PORT = 3000;

dbFunctions.initiateMongoose();
dbFunctions.createInitialData();

app.use(express.json());

app.use("/items", itemRoutes);
app.use("/carts", cartRoutes);
app.use(handleErrors);

app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
