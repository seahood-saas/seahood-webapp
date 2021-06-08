"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.CrimeModel = void 0;
var Mongoose = require("mongoose");
var DataAccess_1 = require("../DataAccess");
var mongooseConnection = DataAccess_1.DataAccess.mongooseConnection;
var mongooseObj = DataAccess_1.DataAccess.mongooseInstance;
var CrimeModel = /** @class */ (function () {
    function CrimeModel() {
        this.createSchema();
        this.createModel();
        this.crimeTypeModal = {
            "1": "ARSON",
            "2": "ASSULT OFFENSES",
            "3": "BURGLARY/BREAKING&ENTERING",
            "4": "COUNTERFEITING/FORGERY",
            "5": "DESTRUCTION/DAMAGE/VANDALISM OF PROPERTY",
            "6": "DRIVING UNDER THE INFLUENCE",
            "7": "FRAUD OFFENSES",
            "8": "LARCENY-THEFT",
            "9": "MOTOR VEHICLE THEFT",
            "10": "ROBBERY",
            "11": "STOLEN PROPERTY OFFENSES",
            "12": "TRESPASS OF REAL POPERTY",
            "13": "WEAPON LAW VIOLATIONS"
        };
    }
    CrimeModel.prototype.createSchema = function () {
        this.schema = new Mongoose.Schema({
            report_number: String,
            offense_id: String,
            offense_start_datetime: Date,
            offense_end_datetime: Date,
            report_datetime: Date,
            group_a_b: String,
            crime_against_category: String,
            offense_parent_group: String,
            offense: String,
            offense_code: String,
            precinct: String,
            sector: String,
            beat: String,
            mcpp: String,
            _100_block_address: String,
            longitude: Number,
            latitude: Number
        }, { collection: "crimes" });
    };
    CrimeModel.prototype.createModel = function () {
        this.model = mongooseConnection.model("Crimes", this.schema);
    };
    CrimeModel.prototype.retrieveAllCrimes = function (response) {
        var query = this.model.find({});
        query.exec(function (err, itemArray) {
            response.json(itemArray);
        });
    };
    CrimeModel.prototype.retrieveCrimeByReportNumber = function (response, filter) {
        var query = this.model.findOne(filter);
        query.exec(function (err, itemArray) {
            response.json(itemArray);
        });
    };
    CrimeModel.prototype.retrieveCrimeCount = function (response) {
        console.log("retrieve Crime Count ...");
        var query = this.model.estimatedDocumentCount();
        query.exec(function (err, numberOfCrimes) {
            console.log("number Of Crimes: " + numberOfCrimes);
            response.json(numberOfCrimes);
        });
    };
    /**
     * Filter the crime by neighbor, type, and date
     * @param response : response
     * @param hood : beat, default: all
     * @param crimeType : crime type, default: all
     * @param fromDate : from, default: this month
     * @param toDate : to
     */
    CrimeModel.prototype.crimeFilter = function (response, hood, crimeType, fromDate, toDate) {
        var filter = {};
        if (hood != "all") {
            filter["beat"] = hood;
        }
        //TODO: need to fix this
        if (crimeType != "all") {
            // var type = this.crimeTypeModal.model.find({Id: crimeType});
            // type.exec((err, itemArray) => {
            //   console.log(itemArray);
            //   let temp = JSON.parse(itemArray);
            //   filter["offense_parent_group"]  = temp.name;
            // });
            filter["offense_parent_group"] = this.crimeTypeModal[crimeType];
        }
        if (fromDate == "") {
            var date = new Date(), y = date.getFullYear(), m = date.getMonth();
            filter["report_datetime"] = { $gte: new Date(y, m, 1).toISOString() };
        }
        if (toDate != "" && fromDate != "") {
            filter["report_datetime"] = { $gte: new Date(fromDate).toISOString(), $lte: new Date(toDate).toISOString() };
        }
        else {
            filter["report_datetime"] = { $gte: new Date(fromDate).toISOString() };
        }
        console.log(filter);
        var query = this.model.find(filter);
        query.exec(function (err, itemArray) {
            //console.log(itemArray);
            response.json(itemArray);
        });
    };
    CrimeModel.prototype.getDataBase = function (response) {
        return __awaiter(this, void 0, void 0, function () {
            function GetRequestFromSPD() {
                return __awaiter(this, void 0, void 0, function () {
                    var config, res;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                config = {
                                    method: 'get',
                                    url: 'https://data.seattle.gov/resource/tazs-3rd5.json?$limit=200',
                                    headers: {}
                                };
                                return [4 /*yield*/, axios(config)];
                            case 1:
                                res = _a.sent();
                                return [2 /*return*/, res.data];
                        }
                    });
                });
            }
            var axios, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        axios = require("axios");
                        return [4 /*yield*/, GetRequestFromSPD().then(function (res) { return (data = res); })];
                    case 1:
                        _a.sent();
                        this.model.insertMany(data, function (err) {
                            if (err) {
                                console.log("object creation failed");
                            }
                        });
                        response.json(data);
                        return [2 /*return*/];
                }
            });
        });
    };
    return CrimeModel;
}());
exports.CrimeModel = CrimeModel;
