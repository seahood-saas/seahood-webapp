import Mongoose = require("mongoose");
import { DataAccess } from "../DataAccess";
import { ICrimeTypeModel } from "../interfaces/ICrimeTypeModel";
import { STATUS_CODES } from "http";

let mongooseConnection = DataAccess.mongooseConnection;
let mongooseObj = DataAccess.mongooseInstance;

class CrimeTypeModel {
  public schema: any;
  public model: any;

  public constructor() {
    this.createSchema();
    this.createModel();
  }

  public createSchema(): void {
    this.schema = new Mongoose.Schema(
      {
        Id: String,
        name: String,
      },
      { collection: "crime type" }
    );
  }

  public createModel(): void {
    this.model = mongooseConnection.model<ICrimeTypeModel>("CrimeType", this.schema);
  }

  public retrieveCrimeTypeById(response: any, filter: Object) {
    var query = this.model.findOne(filter);
    query.exec((err, itemArray) => {
      response.json(itemArray);
    });
  }
  public retrieveAllCrimeType(response: any): any {
    var query = this.model.find({});
    query.exec((err, itemArray) => {
      response.json(itemArray);
    });
  }
}
export { CrimeTypeModel };
