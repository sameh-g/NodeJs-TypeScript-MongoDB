/**
 * Module dependencies.
 */
import { Router, Request, Response } from "express";
import { default as reports } from "../../models/analsysireports.model";

var mongo = require('mongoose');

export class AnlysisReportsController {

    /**
     *
     */
    constructor() {        
    }
    /**
     * Post Reports
     * @param req 
     * @param res 
     */
    public postReports(req: Request, res: Response) {

        reports.find({}).then(function (_res) {
            // console.log(JSON.stringify(_res, undefined, 2));
            res.status(200).send({ reports: _res })
        }
        )
    }
}