/**
 * Module dependencies.
 */
import { Router, Request, Response } from "express";
var mongo = require('mongoose');

export class ProtocolController {
    /**
     *
     */

     x:string;
    // constructor() {
    // }

    /**
     * POST /protocol reports
     * Send a contact form via Nodemailer.
     */
    public postProtocolReports(req: Request, res: Response) {

        console.log(req.body)
        if (req.body.DefaultView == true) {
            mongo.connection.db.eval("GetUserReports('2016-01-01','2020-01-01','RASHA.SAYED','CP',0,10000)")
                .then(function (_res: any) {
                    var Protocols = [];
                    Protocols = _res;


                    res.status(201).send({ protocols: Protocols })
                }).catch(function (reason: any) {
                    console.log(reason)
                });

        } else {

            let NeededByFrom = null
            if ((req.body.NeededByFrom)) {
                let reqNeededByFrom = new Date(req.body.NeededByFrom);
                NeededByFrom = `'${reqNeededByFrom.toISOString()}'`
            }
            let NeededByTo = null;
            console.log(req.body.NeededByTo)

            if ((req.body.NeededByTo)) {


                console.log(req.body.NeededByTo)
                let reqNeededByTo: any = new Date(req.body.NeededByTo);
                console.log(reqNeededByTo)

                console.log(new Date(reqNeededByTo).getDate())

                reqNeededByTo = new Date(reqNeededByTo).setDate(reqNeededByTo.getDate() + 1);
                console.log(new Date(reqNeededByTo))

                reqNeededByTo = new Date(reqNeededByTo).setMilliseconds(-1)
                console.log(reqNeededByTo)

                reqNeededByTo = new Date(reqNeededByTo);
                console.log(reqNeededByTo)

                console.log(reqNeededByTo.getHours())

                // NeededByTo = `${reqNeededByTo.getFullYear()}-${reqNeededByTo.getMonth()+1}-${reqNeededByTo.getDate()} ${reqNeededByTo.getHours()}:${reqNeededByTo.getMinutes()}:${reqNeededByTo.getMilliseconds()}`
                NeededByTo = `'${reqNeededByTo.toISOString()}'`

                console.log(NeededByTo)
            }

            let ShortNames = [];
            let FunctionMessage = ` FilterReports('2016-01-01','2020-01-01',
            '${req.body.BusinessUnit}',
               ${NeededByFrom},${NeededByTo}
               ,${Transformfunction(req.body.ShortNames)},
               ${Transformfunction(req.body.TrialStartYears)}
              ,${Transformfunction(req.body.Disciplines)},
              ${Transformfunction(req.body.Owners)},
              ${Transformfunction(req.body.Contributors)},
              ${Transformfunction(req.body.Reviewers)},
              ${Transformfunction(req.body.Regions)},
              ${Transformfunction(req.body.Territories)},
              ${Transformfunction(req.body.Countries)},0,5000)`;
            console.log('"' + FunctionMessage + '"')
            mongo.connection.db.eval(FunctionMessage)
                .then(function (_res: any) {
                    let Protocols = [];
                    Protocols = _res;
                    console.log("Hooooooooooooooosdsdoo")
                    //    res.status(200).send({Protocols:protoc})
                    res.json(Protocols)

                })
        }

    }


}


export function Transformfunction(arr: any) {
    let stringArray = "[";
    if (arr.length > 0) {
        let stringArray = "[";
        arr.forEach(function (element: any) {
            stringArray += "'" + element + "',";
        })

        stringArray = stringArray.slice(0, -1);

        stringArray += "]";

        return stringArray
    } else {
        return "[]";
    }
}