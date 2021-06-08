import Mongoose = require("mongoose");
import { DataAccess } from "../DataAccess";
import { IHoodModel } from "../interfaces/IHoodModel";
import { STATUS_CODES } from "http";

let mongooseConnection = DataAccess.mongooseConnection;
let mongooseObj = DataAccess.mongooseInstance;

class HoodModel {
  public schema: any;
  public model: any;

  public constructor() {
    this.createSchema();
    this.createModel();
  }

  public createSchema(): void {
    this.schema = new Mongoose.Schema(
      {
        hoodId: Number,
        beat: String,
        name: String,
        reports: [
          {
            reportId: Number,
          },
        ],
      },
      { collection: "hoods" }
    );
  }

  public createModel(): void {
    this.model = mongooseConnection.model<IHoodModel>("Hood", this.schema);
  }

  public retrieveHoodDetails(response: any, filter: Object) {
    var query = this.model.findOne(filter);
    query.exec((err, itemArray) => {
      response.json(itemArray);
    });
  }

  public retrieveAllHoods(response: any) {
    var query = this.model.find();
    query.exec((err, itemArray) => {
      response.json(itemArray);
    });
  }

  public retrieveHoodReportCount(response: any, filter: Object) {
    var query = this.model.findOne(filter);
    query.exec((err, innerTaskList) => {
      if (err) {
        console.log("error retrieving report count");
      } else {
        if (innerTaskList == null) {
          response.status(404);
          response.json("{count: -1}");
        } else {
          console.log("number of Reports: " + innerTaskList.reports.length);
          response.json("{count:" + innerTaskList.reports.length + "}");
        }
      }
    });
  }
}
export { HoodModel };
