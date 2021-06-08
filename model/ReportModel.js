"use strict";
exports.__esModule = true;
exports.ReportModel = void 0;
var Mongoose = require("mongoose");
var DataAccess_1 = require("../DataAccess");
var mongooseConnection = DataAccess_1.DataAccess.mongooseConnection;
var mongooseObj = DataAccess_1.DataAccess.mongooseInstance;
var ReportModel = /** @class */ (function () {
    function ReportModel() {
        this.createSchema();
        this.createModel();
    }
    ReportModel.prototype.createSchema = function () {
        this.schema = new Mongoose.Schema({
            reportId: Number,
            hoodId: Number,
            crimeId: Number
        }, { collection: "reports" });
    };
    ReportModel.prototype.createModel = function () {
        this.model = mongooseConnection.model("Report", this.schema);
    };
    ReportModel.prototype.retrieveReportById = function (response, filter) {
        var query = this.model.findOne(filter);
        query.exec(function (err, itemArray) {
            response.json(itemArray);
        });
    };
    ReportModel.prototype.retrieveAllReports = function (response) {
        var query = this.model.find({});
        query.exec(function (err, itemArray) {
            response.json(itemArray);
        });
    };
    return ReportModel;
}());
exports.ReportModel = ReportModel;
