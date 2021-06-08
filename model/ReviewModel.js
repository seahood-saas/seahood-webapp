"use strict";
exports.__esModule = true;
exports.ReviewModel = void 0;
var Mongoose = require("mongoose");
var DataAccess_1 = require("../DataAccess");
var mongooseConnection = DataAccess_1.DataAccess.mongooseConnection;
var ReviewModel = /** @class */ (function () {
    function ReviewModel() {
        this.createSchema();
        this.createModel();
    }
    ReviewModel.prototype.createSchema = function () {
        this.schema = new Mongoose.Schema({
            reviewId: Number,
            review: String,
            beat: String,
            name: String,
            owner: String
        }, { collection: "reviews" });
    };
    ReviewModel.prototype.createModel = function () {
        this.model = mongooseConnection.model("Review", this.schema);
    };
    ReviewModel.prototype.retrieveSpecificReview = function (response, filter) {
        var query = this.model.findOne(filter);
        query.exec(function (err, itemArray) {
            response.json(itemArray);
        });
    };
    ReviewModel.prototype.retrieveAllReviews = function (response) {
        var query = this.model.find();
        query.exec(function (err, itemArray) {
            response.json(itemArray);
        });
    };
    ReviewModel.prototype.createReview = function (response, body) {
        var query = this.model.save([body]);
        query.exec(function (err, itemArray) {
            response.json(itemArray);
        });
    };
    return ReviewModel;
}());
exports.ReviewModel = ReviewModel;
