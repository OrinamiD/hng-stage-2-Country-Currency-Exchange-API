// import { type NextFunction, type Request, type Response } from "express";
// import type { Country } from "../types.js";

// export function validateCountry(
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) {
//   const { name, population, currency_code } = req.body as Partial<Country>;
//   const errors: any = {};

//   if (!name) errors.name = "is required";
//   if (population === undefined) errors.population = "is required";
//   if (!currency_code) errors.currency_code = "is required";

//   if (Object.keys(errors).length > 0) {
//     return res
//       .status(400)
//       .json({ error: "Validation failed", details: errors });
//   }
//   next();
// }
