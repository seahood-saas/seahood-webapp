"use strict";
exports.__esModule = true;
exports.CrimeTypeModel = void 0;
var Mongoose = require("mongoose");
var DataAccess_1 = require("../DataAccess");
var mongooseConnection = DataAccess_1.DataAccess.mongooseConnection;
var mongooseObj = DataAccess_1.DataAccess.mongooseInstance;
var CrimeTypeModel = /** @class */ (function () {
    function CrimeTypeModel() {
        this.createSchema();
        this.createModel();
    }
    CrimeTypeModel.prototype.createSchema = function () {
        this.schema = new Mongoose.Schema({
            Id: String,
            name: String
        }, { collection: "crime type" });
    };
    CrimeTypeModel.prototype.createModel = function () {
        this.model = mongooseConnection.model("CrimeType", this.schema);
    };
    CrimeTypeModel.prototype.retrieveCrimeTypeById = function (response, filter) {
        var query = this.model.findOne(filter);
        query.exec(function (err, itemArray) {
            response.json(itemArray);
        });
    };
    CrimeTypeModel.prototype.retrieveAllCrimeType = function (response) {
        var query = this.model.find({});
        query.exec(function (err, itemArray) {
            response.json(itemArray);
        });
    };
    return CrimeTypeModel;
}());
exports.CrimeTypeModel = CrimeTypeModel;
