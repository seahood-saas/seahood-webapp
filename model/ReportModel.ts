import Mongoose = require("mongoose");
import { DataAccess } from "../DataAccess";
import { IReportModel } from "../interfaces/IReportModel";
import { STATUS_CODES } from "http";

let mongooseConnection = DataAccess.mongooseConnection;
let mongooseObj = DataAccess.mongooseInstance;

class ReportModel {
  public schema: any;
  public model: any;

  public constructor() {
    this.createSchema();
    this.createModel();
  }

  public createSchema(): void {
    this.schema = new Mongoose.Schema(
      {
        reportId: Number,
        hoodId: Number,
        crimeId: Number,
      },
      { collection: "reports" }
    );
  }

  public createModel(): void {
    this.model = mongooseConnection.model<IReportModel>("Report", this.schema);
  }

  public retrieveReportById(response: any, filter: Object) {
    var query = this.model.findOne(filter);
    query.exec((err, itemArray) => {
      response.json(itemArray);
    });
  }
  public retrieveAllReports(response: any): any {
    var query = this.model.find({});
    query.exec((err, itemArray) => {
      response.json(itemArray);
    });
  }
}
export { ReportModel };
