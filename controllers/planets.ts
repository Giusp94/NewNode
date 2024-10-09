import { Request, Response } from "express";
import Joi from "joi";

type Planet = {
  id: number;
  name: string;
};

type Planets = Planet[];

let planets = [
  { id: 1, name: "Earth" },
  { id: 2, name: "Mars" },
];

const planetSchema = Joi.object({
  id: Joi.number().integer().required(),
  name: Joi.string().required(),
});

export const getAll = (req: Request, res: Response) => {
  res.status(200).json(planets);
};

export const getOneByID = (req: Request, res: Response) => {
  const { id } = req.params;
  const planet = planets.find((planet) => planet.id === Number(id));
  res.status(200).json(planet);
};
export const createPlanet = (req: Request, res: Response) => {
  const { id, name } = req.body;
  const newPlanet: Planet = { id: id, name };
  const validateNewPlanet = planetSchema.validate(newPlanet);

  if (validateNewPlanet.error) {
    res.status(400).json({ msg: validateNewPlanet.error.details[0].message });
    return;
  } else {
    planets = [...planets, newPlanet];
    res.status(201).json({ msg: "Planet create" });
  }
};
export const updateById = (req: Request, res: Response) => {
  const { id } = req.params;
  const { name } = req.body;
  planets = planets.map((planet) =>
    planet.id === Number(id) ? { ...planet, name } : planet
  );
  res.status(200).json({ msg: "Pianeta aggiornato" });
};
export const deleteById = (req: Request, res: Response) => {
  const { id } = req.params;
  planets = planets.filter((planet) => planet.id !== Number(id));
  res.status(200).json({ msg: "Pianeta eliminato" });
};
