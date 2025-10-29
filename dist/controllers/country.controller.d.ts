import { type Request, type Response } from "express";
export declare const refreshCountries: (req: Request, res: Response) => Promise<void>;
export declare const getAllCountries: (req: Request, res: Response) => Promise<void>;
export declare const getCountryByName: (req: Request<{
    name: string;
}>, res: Response) => Promise<void>;
export declare const deleteCountry: (req: Request<{
    name: string;
}>, res: Response) => Promise<void>;
export declare const getStatus: (req: Request, res: Response) => Promise<void>;
export declare const getImage: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=country.controller.d.ts.map