import express, { Request, Response } from "express";
import "express-async-errors";
import morgan from "morgan";
import {
  createPlanet,
  deleteById,
  getAll,
  getOneByID,
  updateById,
} from "./controllers/planets";

// DOTENV si utilizza per tenere in un file separato informazioni
// quali port, database, crittografia, ecc
import "dotenv/config";

// Dichiarazione della porta di ascolto e del route
const app = express();
const port = process.env.PORT;

// Dichiarazione dell'utilizzo del tipo json e
// registrazione delle richieste del Cliente,
// usando express e morgan
app.use(express.json());
app.use(morgan("dev"));

// Return all planets
app.get("/api/planets", getAll);

// Return Single planet
app.get("/api/planets/:id", getOneByID);

// Create a planet
app.post("/api/planets", createPlanet);

// Modify planet
app.put("/api/planets/:id", updateById);

// Delete planet
app.delete("/api/planets/:id", deleteById);

app.listen(port, () => {
  console.log(`App in ascolto su http://localhost:${port}`);
});
