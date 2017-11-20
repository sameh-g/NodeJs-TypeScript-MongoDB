
import { Router, Request, Response } from "express";
import { retry, AsyncBooleanResultCallback } from "async";
import { lchmod } from "fs";

var redis = require('redis');
var client = redis.createClient(6379, '127.0.0.1')
export class RedisHelper {

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
    // public CheckingtheExistenceofKeys2(key: any) {

    //     console.log(this.CheckingtheExistenceofKeys(key).then(function (e) { return true; }));
    //     let c= this.CheckingtheExistenceofKeys(key).then(function () { return true; })
    //     console.log(c);
    // }
    public CheckingtheExistenceofKeys(key: any) {
         var  result:boolean;
        client.exists(key, function (err: any, reply: any) {
            if (reply === 1) {
               result=true
               console.log("true",result)

            } else {
                console.log("false",result)

                  result=false;
            }
        })
        // return result
        // return new Promise(
        //     function (resolve, reject) {
        //         client.exists(key, function (err: any, reply: any) {
        //             if (reply === 1) {
        //                 //   console.log("resolve");
        //                 resolve(true); // fulfilled
        //             } else {
        //                 //   console.log("reject");

        //                 reject(false)
        //             }

        //         }
        //         )
        //     });
        // let final = c.then(function (e) { return e });

        // console.log(final, "ccc")

//          var isMomHappy = true;

//         // // Promise
//         var willIGetNewPhone = new Promise(
//             function (resolve, reject) {
//                 client.exists(key, function (err: any, reply: any) {
//                     if (reply === 1) {
//                         console.log("resolve");
//                         resolve(isMomHappy); // fulfilled

//                     } else {
//                         var reason = new Error('mom is not happy');
//                         reject(isMomHappy); // reject
//                     }

//                 }

//                 )
//             });

//         var result: any;


//             willIGetNewPhone.then(function (fulfilled) {
//                 // yay, you got a new phone
//                 result = fulfilled;
//                 console.log(result, "result")
//                 return result;
//                 // output: { brand: 'Samsung', color: 'black' }
//             })
//                 .catch(function (error) {
//                     // oops, mom don't buy it
//                     console.log(error.message);
//                     console.log(result, "result")

//                     result = error;

//                     // output: 'mom is not happy'
//                 });
//                 console.log(result, "result")
                
// return result;

        // console.log(result, "resultdwsd")

    }
}