import Mongoose = require("mongoose");

interface ICrimeTypeModel extends Mongoose.Document {
  Id: number;
  name: string;
}
export { ICrimeTypeModel };