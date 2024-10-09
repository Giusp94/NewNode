"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("express-async-errors");
const morgan_1 = __importDefault(require("morgan"));
const planets_1 = require("./controllers/planets");
// DOTENV si utilizza per tenere in un file separato informazioni
// quali port, database, crittografia, ecc
require("dotenv/config");
// Dichiarazione della porta di ascolto e del route
const app = (0, express_1.default)();
const port = process.env.PORT;
// Dichiarazione dell'utilizzo del tipo json e
// registrazione delle richieste del Cliente,
// usando express e morgan
app.use(express_1.default.json());
app.use((0, morgan_1.default)("dev"));
// Return all planets
app.get("/api/planets", planets_1.getAll);
// Return Single planet
app.get("/api/planets/:id", planets_1.getOneByID);
// Create a planet
app.post("/api/planets", planets_1.createPlanet);
// Modify planet
app.put("/api/planets/:id", planets_1.updateById);
// Delete planet
app.delete("/api/planets/:id", planets_1.deleteById);
app.listen(port, () => {
    console.log(`App in ascolto su http://localhost:${port}`);
});
