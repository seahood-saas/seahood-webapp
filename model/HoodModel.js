"use strict";
exports.__esModule = true;
exports.HoodModel = void 0;
var Mongoose = require("mongoose");
var DataAccess_1 = require("../DataAccess");
var mongooseConnection = DataAccess_1.DataAccess.mongooseConnection;
var mongooseObj = DataAccess_1.DataAccess.mongooseInstance;
var HoodModel = /** @class */ (function () {
    function HoodModel() {
        this.createSchema();
        this.createModel();
    }
    HoodModel.prototype.createSchema = function () {
        this.schema = new Mongoose.Schema({
            hoodId: Number,
            beat: String,
            name: String,
            reports: [
                {
                    reportId: Number
                },
            ]
        }, { collection: "hoods" });
    };
    HoodModel.prototype.createModel = function () {
        this.model = mongooseConnection.model("Hood", this.schema);
    };
    HoodModel.prototype.retrieveHoodDetails = function (response, filter) {
        var query = this.model.findOne(filter);
        query.exec(function (err, itemArray) {
            response.json(itemArray);
        });
    };
    HoodModel.prototype.retrieveAllHoods = function (response) {
        var query = this.model.find();
        query.exec(function (err, itemArray) {
            response.json(itemArray);
        });
    };
    HoodModel.prototype.retrieveHoodReportCount = function (response, filter) {
        var query = this.model.findOne(filter);
        query.exec(function (err, innerTaskList) {
            if (err) {
                console.log("error retrieving report count");
            }
            else {
                if (innerTaskList == null) {
                    response.status(404);
                    response.json("{count: -1}");
                }
                else {
                    console.log("number of Reports: " + innerTaskList.reports.length);
                    response.json("{count:" + innerTaskList.reports.length + "}");
                }
            }
        });
    };
    return HoodModel;
}());
exports.HoodModel = HoodModel;
