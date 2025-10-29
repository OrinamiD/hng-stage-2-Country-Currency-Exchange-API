export declare const refreshCountry: () => Promise<{
    message: string;
    last_refreshed_at: Date;
}>;
export declare const getAllCountry: (filters: any) => Promise<any[]>;
export declare const getCountryName: (name: string) => Promise<any>;
export declare const deleteOneCountry: (name: string) => Promise<{
    message: string;
}>;
export declare const fetchStatus: () => Promise<{
    total_countries: number;
    last_refreshed_at: any;
}>;
//# sourceMappingURL=country.service.d.ts.map