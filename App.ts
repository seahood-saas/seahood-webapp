//import * as path from 'path';
import * as express from "express";
import * as logger from "morgan";
//import * as mongodb from 'mongodb';
//import * as url from 'url';
import * as bodyParser from "body-parser";
import * as session from "express-session";
import * as cookieParser from "cookie-parser";
//var MongoClient = require('mongodb').MongoClient;
//var Q = require('q');

import { ReportModel } from "./model/ReportModel";
import { HoodModel } from "./model/HoodModel";
import { CrimeModel } from "./model/CrimeModel";
import { ReviewModel } from "./model/ReviewModel";
import { UserModel } from "./model/UserModel";
import { CrimeTypeModel } from "./model/CrimeTypeModel";
//import {DataAccess} from './DataAccess';

import GooglePassportObj from "./GooglePassport";
import * as passport from "passport";

// Creates and configures an ExpressJS web server.
class App {
  // ref to Express instance
  public expressApp: express.Application;
  public Reports: ReportModel;
  public Hoods: HoodModel;
  public Crimes: CrimeModel;
  public Reviews: ReviewModel;
  public Users: UserModel;
  public CrimeType: CrimeTypeModel;
  public googlePassportObj: GooglePassportObj;
  // Id Generator
  public report_idGenerator: number;
  public crime_idGenerator: number;
  public hood_idGenerator: number;
  public review_idGenerator: number;
  public user_idGenerator: number;

  //Run configuration methods on the Express instance.
  constructor() {
    this.googlePassportObj = new GooglePassportObj();
    this.expressApp = express();
    this.middleware();
    this.routes();
    this.Reports = new ReportModel();
    this.Hoods = new HoodModel();
    this.Crimes = new CrimeModel();
    this.Reviews = new ReviewModel();
    this.Users = new UserModel();
    this.CrimeType = new CrimeTypeModel();
    //
    this.report_idGenerator = 102;
    this.crime_idGenerator = 202;
    this.hood_idGenerator = 302;
    this.review_idGenerator = 402;
    this.user_idGenerator = 502;
  }

  // Configure Express middleware.
  private middleware(): void {
    this.expressApp.use(logger("dev"));
    this.expressApp.use(bodyParser.json());
    this.expressApp.use(bodyParser.urlencoded({ extended: false }));
    this.expressApp.use(
      session({ secret: "keyboard cat", cookie: { maxAge: 1 * 60 * 10000 } })
    );
    this.expressApp.use(cookieParser());
    this.expressApp.use(passport.initialize());
    this.expressApp.use(passport.session());
  }

  private validateAuth(req, res, next): void {
    if (req.isAuthenticated()) {
      console.log("user is authenticated");
      return next();
    }
    console.log("user is not authenticated");
    res.redirect("/auth/google");
  }

  // Configure API endpoints.
  private routes(): void {
    let router = express.Router();

    router.get(
      "/auth/google",
      passport.authenticate("google", {
        scope: ["https://www.googleapis.com/auth/plus.login", "email"],
      })
    );

    router.get(
      "/auth/google/callback",
      passport.authenticate("google", { failureRedirect: "/" }),
      (req, res) => {
        console.log(
          "successfully authenticated user and returned to callback page."
        );
        console.log("redirecting to /#/map");
        res.redirect("/#/map");
        // post user to db
        this.Users.model.create(
          [this.googlePassportObj.getProfile()],
          (err) => {
            if (err) {
              console.log("object creation failed");
            }
          }
        );
      }
    );

    router.get("/app/getCurrentUser", this.validateAuth, (req, res) => {
      console.log("Return the information of the current user");

      res.send(req.user);
    });

    //#region Crime
    // Get router for the Crime by ID search
    router.get("/app/crime/:reportNumber", (req, res) => {
      var reportNumber = req.params.reportNumber;
      console.log("Query single Crime with report number: " + reportNumber);
      this.Crimes.retrieveCrimeByReportNumber(res, {
        report_number: reportNumber,
      });
    });

    /**
     * filter for crime model
     */
    router.get(
      "/app/crime/hood/:hood/crimeType/:crimeType/from/:fromDate?/to/:toDate?",
      (req, res) => {
        var hood = req.params.hood;
        var crimeType = req.params.crimeType;
        var fromDate;

        if (!req.params.fromDate) {
          fromDate = "";
        } else {
          fromDate = req.params.fromDate;
        }

        var toDate;

        if (!req.params.toDate) {
          toDate = "";
        } else {
          toDate = req.params.toDate;
        }

        console.log(
          "Query crimes with filter neightbor: " +
            hood +
            " ,crime type: " +
            crimeType +
            " ,from date: " +
            fromDate +
            " ,to Date " +
            toDate
        );

        this.Crimes.crimeFilter(res, hood, crimeType, fromDate, toDate);
      }
    );
    /**
     * filter for crime model
     */
    router.get(
      "/app/crime/:hood/:crimeType/:fromDate?/:toDate?",
      (req, res) => {
        var hood = req.params.hood;
        var crimeType = req.params.crimeType;
        var fromDate;

        if (!req.params.fromDate) {
          fromDate = "";
        } else {
          fromDate = req.params.fromDate;
        }

        var toDate;

        if (!req.params.toDate) {
          toDate = "";
        } else {
          toDate = req.params.toDate;
        }

        console.log(
          "Query crimes with filter neightbor: " +
            hood +
            " ,crime type: " +
            crimeType +
            " ,from date: " +
            fromDate +
            " ,to Date " +
            toDate
        );

        this.Crimes.crimeFilter(res, hood, crimeType, fromDate, toDate);
      }
    );

    // Get router for all Crimes
    router.get("/app/crime/", (req, res) => {
      console.log("Query All Crimes");
      this.Crimes.retrieveAllCrimes(res);
    });

    // Add a crime with the specified information
    router.post("/app/crime/", (req, res) => {
      console.log(req.body);
      var jsonObj = req.body;
      this.Crimes.model.create([jsonObj], (err) => {
        if (err) {
          console.log("object creation failed");
        }
      });
      res.sendStatus(200);
    });
    //#endregion Crime

    //#region Report
    // Get router for the Report by Id
    router.get("/app/report/:reportId", (req, res) => {
      var id = req.params.reportId;
      console.log("Query single Report with id: " + id);
      this.Reports.retrieveReportById(res, { reportId: id });
    });

    // Get router for all Report
    router.get("/app/report/", (req, res) => {
      console.log("Query All Report");
      this.Reports.retrieveAllReports(res);
    });

    // Add a report with the specified information
    router.post("/app/report/", (req, res) => {
      console.log(req.body);
      var jsonObj = req.body;
      this.Reports.model.create([jsonObj], (err) => {
        if (err) {
          console.log("object creation failed");
        }
      });
      res.send(this.report_idGenerator.toString());
      this.report_idGenerator++;
    });
    //#endregion Report

    //#region Hood
    // Get router for the Hood by Id
    router.get("/app/hood/:hoodId", (req, res) => {
      var id = req.params.hoodId;
      console.log("Query single Hood with id: " + id);
      this.Hoods.retrieveHoodDetails(res, { hoodId: id });
    });

    // Get router for all Hoods
    router.get("/app/hood/", (req, res) => {
      console.log("Query All Hood");
      this.Hoods.retrieveAllHoods(res);
    });

    // Get the number of report in a given neighborhood
    router.get("/app/reportCount/:hoodId", (req, res) => {
      var id = req.params.hoodId;
      console.log("Count the number of reports in the hood with Id: " + id);
      this.Hoods.retrieveHoodReportCount(res, { hoodId: id });
    });

    // Add a neighborhood with the specified information
    router.post("/app/hood/", (req, res) => {
      console.log(req.body);
      var jsonObj = req.body;
      this.Hoods.model.create([jsonObj], (err) => {
        if (err) {
          console.log("object creation failed");
        }
      });
      res.sendStatus(200);
    });
    //#endregion Hood

    //#region Review
    // Get router for the Review by hood beat
    router.get("/app/review/:beat", (req, res) => {
      var beat = req.params.beat;
      console.log("Query single review at the beat: " + beat);
      this.Reviews.retrieveSpecificReview(res, { beat: beat });
    });

    // Get router for all the reviews
    router.get("/app/review/", this.validateAuth, (req, res) => {
      console.log("Query All reviews");
      this.Reviews.retrieveAllReviews(res);
    });

    // Add a review with the specified information
    router.post("/app/review/", this.validateAuth, (req, res) => {
      console.log(req.body);
      var jsonObj = req.body;
      this.Reviews.model.create([jsonObj], (err) => {
        if (err) {
          console.log("object creation failed");
        }
      });
      res.sendStatus(200);
    });
    //#endregion Review

    //#region User

    // Get a user by email
    router.get("/app/user/:email/", (req, res) => {
      var email = req.params.email;
      console.log("Query for user using : " + email);
      this.Users.retrieveUserById(res, { email: email });
    });

    // Get all users
    router.get("/app/users/", (req, res) => {
      console.log("Query for all users.");
      this.Users.retrieveAllUsers(res);
    });

    // Add a new user
    router.post("/app/user/", (req, res) => {
      console.log(req.body);
      var jsonObj = req.body;
      this.Users.model.create([jsonObj], (err) => {
        if (err) {
          console.log("object creation failed");
        }
      });
      res.sendStatus(200);
    });
    //#endregion User

    //#region crimeType
    router.get("/app/crimeType/", (req, res) => {
      console.log("Get All Crime Type");
      this.CrimeType.retrieveAllCrimeType(res);
    });
    //#endregion crimeType

    // Get crime from SPD
    router.get("/app/spd/", (req, res) => {
      console.log("Get data from SPD");
      this.Crimes.getDataBase(res);
    });

    this.expressApp.use("/", router);
    this.expressApp.use("/app/json/", express.static(__dirname + "/app/json"));
    this.expressApp.use("/images", express.static(__dirname + "/img"));
    this.expressApp.use("/", express.static(__dirname + "/dist/seahood-app"));
  }
}

export { App };
