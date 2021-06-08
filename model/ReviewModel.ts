import Mongoose = require("mongoose");
import { DataAccess } from "../DataAccess";
import { IReviewModel } from "../interfaces/IReviewModel";
import { STATUS_CODES } from "http";

let mongooseConnection = DataAccess.mongooseConnection;

class ReviewModel {
  public schema: any;
  public model: any;

  public constructor() {
    this.createSchema();
    this.createModel();
  }

  public createSchema(): void {
    this.schema = new Mongoose.Schema(
      {
        reviewId: Number,
        review: String,
        beat: String,
        name: String,
        owner: String,
      },
      { collection: "reviews" }
    );
  }
  
  public createModel() {
    this.model = mongooseConnection.model<IReviewModel>("Review", this.schema);
   
  }

  public retrieveSpecificReview(response: any, filter: Object) {
    var query = this.model.findOne(filter);
    query.exec((err, itemArray) => {
      response.json(itemArray);
    });
  }

  public retrieveAllReviews(response: any) {
    var query = this.model.find();
    query.exec((err, itemArray) => {
      response.json(itemArray);
    });
  }
  public createReview(response:any, body:any){
    var query = this.model.save([body]);
    query.exec((err,itemArray)=>{
      response.json(itemArray);
    })
  }
}
export { ReviewModel };
