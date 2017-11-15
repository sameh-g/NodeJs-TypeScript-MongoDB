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
}