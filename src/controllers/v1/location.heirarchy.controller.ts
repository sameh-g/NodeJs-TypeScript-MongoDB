/**
 * Module dependencies.
 */
import { Router, Request, Response } from "express";

var redis = require('redis');
var client=redis.createClient(6379,'127.0.0.1')
export class LocationHeirarchyController {

    /**
     *
     */
    constructor() {        
    }
    /**
     * Get Locations
     * @param req 
     * @param res 
     */
public GetLocations(req: Request, res: Response) {

client.get("sameh",function(error:any,obj:any)
    {
if(error){throw error;};
if(obj){res.json("redis Cach found successfully.."+ obj)}
else 
{
    setTimeout(function(){ 
        client.set("sameh","dataaaaaa",function(error:any)
    {
        if(error){throw error;};
        
    })
        res.json("My Locations") }, 10000);
}
    })
    }
    public getRegions(req: Request, res: Response) {
        res.json("GetRegions.........")
    }      
    public getRegionByCode(req: Request, res: Response) {
        res.json("getRegionByCode.........")
    } 
    public getTerritoryByRegionCode(req: Request, res: Response) {
        res.json("getTerritoryByRegionCode.........")
    }       
    public getTerritoryByCode(req: Request, res: Response) {
        res.json("getTerritoryByCode.........")
    }   
    public getCountries(req: Request, res: Response) {
        res.json("getCountries.........")
    } 
    public getCountriesByRegionCode(req: Request, res: Response) {
        res.json("getCountriesByRegionCode.........")
    }   
    public getCountriesByCountryCode(req: Request, res: Response) {
        res.json("getCountriesByCountryCode.........")
    }
    public getCountryCenters(req: Request, res: Response) {
        res.json("getCountryCenters.........")
    }  
    public getCountryCenter(req: Request, res: Response) {
        res.json("getCountryCenter.........")
    }  
    public getSites(req: Request, res: Response) {
        res.json("getSites.........")
    }  
    public getSitesByCode(req: Request, res: Response) {
        res.json("getSitesByCode.........")
    } 
    public getSitesByCodeForSpicificDomain(req: Request, res: Response) {
        res.json("getSitesByCodeForSpicificDomain.........")
    } 
    public getSitesCountry(req: Request, res: Response) {
        res.json("getSitesCountry.........")
    } 
    public getSiteCountry(req: Request, res: Response) {
        res.json("getSiteCountry.........")
    }   
}