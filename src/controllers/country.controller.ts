import { type Request, type Response } from "express";
import * as service from "../services/country.service.js";
import fs from "fs";
import path from "path";

export const refreshCountries = async (req: Request, res: Response) => {
  try {
    const result = await service.refreshCountry();
    res.json(result);
  } catch (err: any) {
    res.status(503).json({
      error: "External data source unavailable",
      details: err.message,
    });
  }
};

export const getAllCountries = async (req: Request, res: Response) => {
  try {
    const countries = await service.getAllCountry(req.query);
    res.json(countries);
  } catch {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getCountryByName = async (
  req: Request<{ name: string }>,
  res: Response
) => {
  try {
    const country = await service.getCountryName(req.params.name);
    res.json(country);
  } catch (err: any) {
    res.status(404).json({ error: "Country not found" });
  }
};

export const deleteCountry = async (
  req: Request<{ name: string }>,
  res: Response
) => {
  try {
    const result = await service.deleteOneCountry(req.params.name);
    res.json(result);
  } catch (err: any) {
    res.status(404).json({ error: "Country not found" });
  }
};

export const getStatus = async (req: Request, res: Response) => {
  try {
    const status = await service.fetchStatus();
    res.json(status);
  } catch {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getImage = async (req: Request, res: Response) => {
  const imagePath = path.join(__dirname, "../../cache/summary.png");
  if (!fs.existsSync(imagePath)) {
    return res.status(404).json({ error: "Summary image not found" });
  }
  res.sendFile(imagePath);
};
