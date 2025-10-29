import express, { Router } from "express";
import {
  deleteCountry,
  getAllCountries,
  getCountryByName,
  getImage,
  getStatus,
  refreshCountries,
} from "../controllers/country.controller.js";

const router: Router = express.Router();

router.post("/countries/refresh", refreshCountries);
router.get("/countries", getAllCountries);
router.get("/countries/:name", getCountryByName);
router.delete("/countries/:name", deleteCountry);
router.get("/status", getStatus);
router.get("/countries/image", getImage);

export default router;
