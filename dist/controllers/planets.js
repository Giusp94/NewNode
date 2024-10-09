"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteById = exports.updateById = exports.createPlanet = exports.getOneByID = exports.getAll = void 0;
const joi_1 = __importDefault(require("joi"));
let planets = [
    { id: 1, name: "Earth" },
    { id: 2, name: "Mars" },
];
const planetSchema = joi_1.default.object({
    id: joi_1.default.number().integer().required(),
    name: joi_1.default.string().required(),
});
const getAll = (req, res) => {
    res.status(200).json(planets);
};
exports.getAll = getAll;
const getOneByID = (req, res) => {
    const { id } = req.params;
    const planet = planets.find((planet) => planet.id === Number(id));
    res.status(200).json(planet);
};
exports.getOneByID = getOneByID;
const createPlanet = (req, res) => {
    const { id, name } = req.body;
    const newPlanet = { id: id, name };
    const validateNewPlanet = planetSchema.validate(newPlanet);
    if (validateNewPlanet.error) {
        res.status(400).json({ msg: validateNewPlanet.error.details[0].message });
        return;
    }
    else {
        planets = [...planets, newPlanet];
        res.status(201).json({ msg: "Planet create" });
    }
};
exports.createPlanet = createPlanet;
const updateById = (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    planets = planets.map((planet) => planet.id === Number(id) ? Object.assign(Object.assign({}, planet), { name }) : planet);
    res.status(200).json({ msg: "Pianeta aggiornato" });
};
exports.updateById = updateById;
const deleteById = (req, res) => {
    const { id } = req.params;
    planets = planets.filter((planet) => planet.id !== Number(id));
    res.status(200).json({ msg: "Pianeta eliminato" });
};
exports.deleteById = deleteById;
