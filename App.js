"use strict";
exports.__esModule = true;
exports.App = void 0;
//import * as path from 'path';
var express = require("express");
var logger = require("morgan");
//import * as mongodb from 'mongodb';
//import * as url from 'url';
var bodyParser = require("body-parser");
var session = require("express-session");
var cookieParser = require("cookie-parser");
//var MongoClient = require('mongodb').MongoClient;
//var Q = require('q');
var ReportModel_1 = require("./model/ReportModel");
var HoodModel_1 = require("./model/HoodModel");
var CrimeModel_1 = require("./model/CrimeModel");
var ReviewModel_1 = require("./model/ReviewModel");
var UserModel_1 = require("./model/UserModel");
var CrimeTypeModel_1 = require("./model/CrimeTypeModel");
//import {DataAccess} from './DataAccess';
var GooglePassport_1 = require("./GooglePassport");
var passport = require("passport");
// Creates and configures an ExpressJS web server.
var App = /** @class */ (function () {
    //Run configuration methods on the Express instance.
    function App() {
        this.googlePassportObj = new GooglePassport_1["default"]();
        this.expressApp = express();
        this.middleware();
        this.routes();
        this.Reports = new ReportModel_1.ReportModel();
        this.Hoods = new HoodModel_1.HoodModel();
        this.Crimes = new CrimeModel_1.CrimeModel();
        this.Reviews = new ReviewModel_1.ReviewModel();
        this.Users = new UserModel_1.UserModel();
        this.CrimeType = new CrimeTypeModel_1.CrimeTypeModel();
        //
        this.report_idGenerator = 102;
        this.crime_idGenerator = 202;
        this.hood_idGenerator = 302;
        this.review_idGenerator = 402;
        this.user_idGenerator = 502;
    }
    // Configure Express middleware.
    App.prototype.middleware = function () {
        this.expressApp.use(logger("dev"));
        this.expressApp.use(bodyParser.json());
        this.expressApp.use(bodyParser.urlencoded({ extended: false }));
        this.expressApp.use(session({ secret: "keyboard cat", cookie: { maxAge: 1 * 60 * 10000 } }));
        this.expressApp.use(cookieParser());
        this.expressApp.use(passport.initialize());
        this.expressApp.use(passport.session());
    };
    App.prototype.validateAuth = function (req, res, next) {
        if (req.isAuthenticated()) {
            console.log("user is authenticated");
            return next();
        }
        console.log("user is not authenticated");
        res.redirect("/auth/google");
    };
    // Configure API endpoints.
    App.prototype.routes = function () {
        var _this = this;
        var router = express.Router();
        router.get("/auth/google", passport.authenticate("google", {
            scope: ["https://www.googleapis.com/auth/plus.login", "email"]
        }));
        router.get("/auth/google/callback", passport.authenticate("google", { failureRedirect: "/" }), function (req, res) {
            console.log("successfully authenticated user and returned to callback page.");
            console.log("redirecting to /#/map");
            res.redirect("/#/map");
            // post user to db
            _this.Users.model.create([_this.googlePassportObj.getProfile()], function (err) {
                if (err) {
                    console.log("object creation failed");
                }
            });
        });
        router.get("/app/getCurrentUser", this.validateAuth, function (req, res) {
            console.log("Return the information of the current user");
            res.send(req.user);
        });
        //#region Crime
        // Get router for the Crime by ID search
        router.get("/app/crime/:reportNumber", function (req, res) {
            var reportNumber = req.params.reportNumber;
            console.log("Query single Crime with report number: " + reportNumber);
            _this.Crimes.retrieveCrimeByReportNumber(res, {
                report_number: reportNumber
            });
        });
        /**
         * filter for crime model
         */
        router.get("/app/crime/hood/:hood/crimeType/:crimeType/from/:fromDate?/to/:toDate?", function (req, res) {
            var hood = req.params.hood;
            var crimeType = req.params.crimeType;
            var fromDate;
            if (!req.params.fromDate) {
                fromDate = "";
            }
            else {
                fromDate = req.params.fromDate;
            }
            var toDate;
            if (!req.params.toDate) {
                toDate = "";
            }
            else {
                toDate = req.params.toDate;
            }
            console.log("Query crimes with filter neightbor: " +
                hood +
                " ,crime type: " +
                crimeType +
                " ,from date: " +
                fromDate +
                " ,to Date " +
                toDate);
            _this.Crimes.crimeFilter(res, hood, crimeType, fromDate, toDate);
        });
        /**
         * filter for crime model
         */
        router.get("/app/crime/:hood/:crimeType/:fromDate?/:toDate?", function (req, res) {
            var hood = req.params.hood;
            var crimeType = req.params.crimeType;
            var fromDate;
            if (!req.params.fromDate) {
                fromDate = "";
            }
            else {
                fromDate = req.params.fromDate;
            }
            var toDate;
            if (!req.params.toDate) {
                toDate = "";
            }
            else {
                toDate = req.params.toDate;
            }
            console.log("Query crimes with filter neightbor: " +
                hood +
                " ,crime type: " +
                crimeType +
                " ,from date: " +
                fromDate +
                " ,to Date " +
                toDate);
            _this.Crimes.crimeFilter(res, hood, crimeType, fromDate, toDate);
        });
        // Get router for all Crimes
        router.get("/app/crime/", function (req, res) {
            console.log("Query All Crimes");
            _this.Crimes.retrieveAllCrimes(res);
        });
        // Add a crime with the specified information
        router.post("/app/crime/", function (req, res) {
            console.log(req.body);
            var jsonObj = req.body;
            _this.Crimes.model.create([jsonObj], function (err) {
                if (err) {
                    console.log("object creation failed");
                }
            });
            res.sendStatus(200);
        });
        //#endregion Crime
        //#region Report
        // Get router for the Report by Id
        router.get("/app/report/:reportId", function (req, res) {
            var id = req.params.reportId;
            console.log("Query single Report with id: " + id);
            _this.Reports.retrieveReportById(res, { reportId: id });
        });
        // Get router for all Report
        router.get("/app/report/", function (req, res) {
            console.log("Query All Report");
            _this.Reports.retrieveAllReports(res);
        });
        // Add a report with the specified information
        router.post("/app/report/", function (req, res) {
            console.log(req.body);
            var jsonObj = req.body;
            _this.Reports.model.create([jsonObj], function (err) {
                if (err) {
                    console.log("object creation failed");
                }
            });
            res.send(_this.report_idGenerator.toString());
            _this.report_idGenerator++;
        });
        //#endregion Report
        //#region Hood
        // Get router for the Hood by Id
        router.get("/app/hood/:hoodId", function (req, res) {
            var id = req.params.hoodId;
            console.log("Query single Hood with id: " + id);
            _this.Hoods.retrieveHoodDetails(res, { hoodId: id });
        });
        // Get router for all Hoods
        router.get("/app/hood/", function (req, res) {
            console.log("Query All Hood");
            _this.Hoods.retrieveAllHoods(res);
        });
        // Get the number of report in a given neighborhood
        router.get("/app/reportCount/:hoodId", function (req, res) {
            var id = req.params.hoodId;
            console.log("Count the number of reports in the hood with Id: " + id);
            _this.Hoods.retrieveHoodReportCount(res, { hoodId: id });
        });
        // Add a neighborhood with the specified information
        router.post("/app/hood/", function (req, res) {
            console.log(req.body);
            var jsonObj = req.body;
            _this.Hoods.model.create([jsonObj], function (err) {
                if (err) {
                    console.log("object creation failed");
                }
            });
            res.sendStatus(200);
        });
        //#endregion Hood
        //#region Review
        // Get router for the Review by hood beat
        router.get("/app/review/:beat", function (req, res) {
            var beat = req.params.beat;
            console.log("Query single review at the beat: " + beat);
            _this.Reviews.retrieveSpecificReview(res, { beat: beat });
        });
        // Get router for all the reviews
        router.get("/app/review/", this.validateAuth, function (req, res) {
            console.log("Query All reviews");
            _this.Reviews.retrieveAllReviews(res);
        });
        // Add a review with the specified information
        router.post("/app/review/", this.validateAuth, function (req, res) {
            console.log(req.body);
            var jsonObj = req.body;
            _this.Reviews.model.create([jsonObj], function (err) {
                if (err) {
                    console.log("object creation failed");
                }
            });
            res.sendStatus(200);
        });
        //#endregion Review
        //#region User
        // Get a user by email
        router.get("/app/user/:email/", function (req, res) {
            var email = req.params.email;
            console.log("Query for user using : " + email);
            _this.Users.retrieveUserById(res, { email: email });
        });
        // Get all users
        router.get("/app/users/", function (req, res) {
            console.log("Query for all users.");
            _this.Users.retrieveAllUsers(res);
        });
        // Add a new user
        router.post("/app/user/", function (req, res) {
            console.log(req.body);
            var jsonObj = req.body;
            _this.Users.model.create([jsonObj], function (err) {
                if (err) {
                    console.log("object creation failed");
                }
            });
            res.sendStatus(200);
        });
        //#endregion User
        //#region crimeType
        router.get("/app/crimeType/", function (req, res) {
            console.log("Get All Crime Type");
            _this.CrimeType.retrieveAllCrimeType(res);
        });
        //#endregion crimeType
        // Get crime from SPD
        router.get("/app/spd/", function (req, res) {
            console.log("Get data from SPD");
            _this.Crimes.getDataBase(res);
        });
        this.expressApp.use("/", router);
        this.expressApp.use("/app/json/", express.static(__dirname + "/app/json"));
        this.expressApp.use("/images", express.static(__dirname + "/img"));
        this.expressApp.use("/", express.static(__dirname + "/dist/seahood-app"));
    };
    return App;
}());
exports.App = App;
