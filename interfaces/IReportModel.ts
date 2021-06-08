import Mongoose = require("mongoose");

interface IReportModel extends Mongoose.Document {
  reportId: number;
  hoodId: number;
  crimeId: number;
}
export { IReportModel };
