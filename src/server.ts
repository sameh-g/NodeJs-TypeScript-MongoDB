/**
 * Module dependencies.
 */
import * as express from "express";
import * as compression from "compression";  // compresses requests
import * as session from "express-session";
import * as bodyParser from "body-parser";
import * as logger from "morgan";
import * as errorHandler from "errorhandler";
import * as dotenv from "dotenv";
import * as mongo from "connect-mongo";
import * as path from "path";
import * as mongoose from "mongoose";
// import * as passport from "passport";
import expressValidator = require("express-validator");


const MongoStore = mongo(session);

/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
dotenv.config({ path: ".env.variable" });


/**
 * Controllers (route handlers).
 */

import { LocationHeirarchyController } from "./controllers/v1/location.heirarchy.controller";

let locationsController = new LocationHeirarchyController();

/**
 * API keys and Passport configuration.
 */
// import * as passportConfig from "./config/passport";

/**
 * Create Express server.
 */
const app = express();

/**
 * Connect to MongoDB.
 */
// mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || process.env.MONGOLAB_URI);

mongoose.connection.on("error", () => {
  console.log("MongoDB connection error. Please make sure MongoDB is running.");
  process.exit();
});



/**
 * Express configuration.
 */
app.set("port", process.env.PORT || 3000);
app.use(compression());
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: process.env.SESSION_SECRET,
  store: new MongoStore({
    url: process.env.MONGODB_URI || process.env.MONGOLAB_URI,
    autoReconnect: true
  })
}));


/**
 * Primary app routes.
 */
app.get("/api/v1", locationsController.SetLocation);
app.get("/api/v1/check", locationsController.CHeckRedis);
app.post("/api/v1/update", locationsController.update);
app.get("/api/v1/region", locationsController.getRegions);
app.get("/api/v1/region/{regionCode}", locationsController.getRegionByCode);
app.get("/api/v1/region/{regionCode}/territory", locationsController.getTerritoryByRegionCode);
app.get("/api/v1/region/{regionCode}/territory{territoryCode}", locationsController.getTerritoryByCode);
app.get("/api/v1/region/{regionCode}/territory{territoryCode}/country", locationsController.getCountries);
app.get("/api/v1/region/{regionCode}/country", locationsController.getCountriesByRegionCode);
app.get("/api/v1/region/{regionCode}/country/{countryCode}", locationsController.getCountriesByCountryCode);
app.get("/api/v1/region/{regionCode}/country/{countryCode}/center", locationsController.getCountryCenters);
app.get("/api/v1/region/{regionCode}/country/{countryCode}/center/{centerCode}", locationsController.GetLocations);
app.get("/api/v1/region/{regionCode}/country/{countryCode}/center/{centerCode}/site", locationsController.GetLocations);
app.get("/api/v1/region/{regionCode}/country/{countryCode}/center/{centerCode}/site/{siteCode}", locationsController.GetLocations);
app.get("/api/v1/region/{regionCode}/country/{countryCode}/center/{centerCode}/site/domain/{domainCode}", locationsController.GetLocations);
app.get("/api/v1/region/{regionCode}/country/{countryCode}/site", locationsController.GetLocations);
app.get("/api/v1/region/{regionCode}/country/{countryCode}/site/{siteCode}", locationsController.GetLocations);

/**
 * Error Handler. Provides full stack - remove for production
 */
app.use(errorHandler());

/**
 * Start Express server.
 */
app.listen(app.get("port"), () => {
  console.log(("  App is running at http://localhost:%d in %s mode"), app.get("port"), app.get("env"));
  console.log("  Press CTRL-C to stop\n");
});

module.exports = app;