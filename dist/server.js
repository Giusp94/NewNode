"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("express-async-errors");
const morgan_1 = __importDefault(require("morgan"));
const joi_1 = __importDefault(require("joi"));
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
// Dichiarazione della variabile
let planets = [
    {
        id: 1,
        name: "Earth",
    },
    {
        id: 2,
        name: "Mars",
    },
];
// Configuriamo delle validazioni
const planetSchema = joi_1.default.object({
    id: joi_1.default.number().integer().required(),
    name: joi_1.default.string().required(),
});
// Return all planets
app.get("/api/planets", (req, res) => {
    res.status(200).json(planets);
});
// Return Single planet
app.get("/api/planets/:id", (req, res) => {
    const { id } = req.params;
    const planet = planets.find((planet) => planet.id === Number(id));
    res.status(200).json(planet);
});
// Create a planet
app.post("/api/planets", (req, res) => {
    const { id, name } = req.body;
    const newPlanet = { id: id, name };
    // convalido il nuovo pianeta
    const validateNewPlanet = planetSchema.validate(newPlanet);
    if (validateNewPlanet.error) {
        res.status(400).json({ msg: validateNewPlanet.error.details[0].message });
        return;
    }
    else {
        planets = [...planets, newPlanet];
        res.status(201).json({ msg: "Pianeta creato" });
    }
});
// Modify planet
app.put("/api/planets/:id", (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    planets = planets.map((planet) => planet.id === Number(id) ? Object.assign(Object.assign({}, planet), { name }) : planet);
    res.status(200).json({ msg: "Pianeta modificato" });
});
// Delete planet
app.delete("/api/planets/:id", (req, res) => {
    const { id } = req.params;
    planets = planets.filter((planet) => planet.id !== Number(id));
    res.status(200).json({ msg: "Pianeta eliminato" });
});
app.listen(port, () => {
    console.log(`App in ascolto su http://localhost:${port}`);
});
