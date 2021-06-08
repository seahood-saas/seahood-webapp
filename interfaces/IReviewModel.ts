import Mongoose = require("mongoose");

interface IReviewModel extends Mongoose.Document {
  reviewId: number;
  review: string;
  beat: string;
  name: string;
  owner: string;
}
export { IReviewModel };
