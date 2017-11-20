import { RedisHelper } from './../../Helper/redisHelper';
/**
 * Module dependencies.
 */
import { Router, Request, Response } from "express";
import { error } from 'util';
var redis = require('redis');
var client = redis.createClient(6379, '127.0.0.1')

export class LocationHeirarchyController {
 public   obj:object={id:0,name:"rasha"};
    self:any;
    /**
     *
     */
    redisHelper: RedisHelper;
    constructor() {
        
    }
/**
 * Stactic Obj
 */

    /**
     * Get Locations
     * @param req 
     * @param res 
     */
     SetLocation=(req: Request, res: Response) =>{
        console.log(this.obj)
        client.set('framework', this.obj, function (err: any, reply: any) {

            console.log(reply);
            res.json(reply);
        });

    }
    
StoringHash=(req:Request,res:Response)=>{

    client.hmset('frameworks', 'javascript', 'AngularJS', 'css', 'Bootstrap', 'node', 'Express');
    
    client.hgetall('frameworks', function(err:any, object:any) {
        res.json(object);
    });

}

DeleteKey=(req:Request,res:Response)=>{
    client.del('frameworks', function(err:any, reply:any) {
        console.log(reply);
    });
}


    public CHeckRedis(req: Request, res: Response) {

        client.exists("framework", function (err: any, reply: any) {
            if (reply === 1) {
                client.get('framework', function(err: any, reply: any) {
                    res.json(`result:${reply}`);
                });
               

            } else {
                res.json(`result:${false}`);


            }
        })

    }
    public update(req: Request, res: Response) {
       console.log(req.body.key,"body")
                client.set('framework',req.body.key, function (err: any, sets: any) {
                    console.log("sets",sets)
                   
                });
               
                client.get('framework', function(err:any, gets:any) {
                    console.log("gets",gets)
                    
                    res.status(200).send({"result":gets})
                     });
            } 


    

    public GetLocations(req: Request, res: Response) {

        client.get("sameh", function (error: any, obj: any) {
            if (error) { throw error; };
            if (obj) { res.json("redis Cach found successfully.." + obj) }
            else {
                setTimeout(function () {

                    client.set("sameh", "dataaaaaa", function (error: any) {
                        if (error) { throw error; };

                    })
                    res.json("My Locations")
                }, 10000);
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