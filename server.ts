import express, { Request, Response } from "express";
import "express-async-errors";
import morgan from "morgan";
import Joi from "joi";

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

// Dichiarazione dei type
type Planet = {
  id: number;
  name: string;
};

type Planets = Planet[];

// Dichiarazione della variabile
let planets: Planets = [
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
const planetSchema = Joi.object({
  id: Joi.number().integer().required(),
  name: Joi.string().required(),
});

// Return all planets
app.get("/api/planets", (req: Request, res: Response) => {
  res.status(200).json(planets);
});

// Return Single planet
app.get("/api/planets/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const planet = planets.find((planet) => planet.id === Number(id));

  res.status(200).json(planet);
});

// Create a planet
app.post("/api/planets", (req: Request, res: Response) => {
  const { id, name } = req.body;
  const newPlanet: Planet = { id: id, name };
  // convalido il nuovo pianeta
  const validateNewPlanet = planetSchema.validate(newPlanet);

  if (validateNewPlanet.error) {
    res.status(400).json({ msg: validateNewPlanet.error.details[0].message });
    return;
  } else {
    planets = [...planets, newPlanet];
    res.status(201).json({ msg: "Pianeta creato" });
  }
});

// Modify planet
app.put("/api/planets/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const { name } = req.body;
  planets = planets.map((planet) =>
    planet.id === Number(id) ? { ...planet, name } : planet
  );

  res.status(200).json({ msg: "Pianeta modificato" });
});

// Delete planet
app.delete("/api/planets/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  planets = planets.filter((planet) => planet.id !== Number(id));

  res.status(200).json({ msg: "Pianeta eliminato" });
});

app.listen(port, () => {
  console.log(`App in ascolto su http://localhost:${port}`);
});
