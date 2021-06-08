import Mongoose = require("mongoose");
import { DataAccess } from "../DataAccess";
import { ICrimeModel } from "../interfaces/ICrimeModel";
import Axios = require("axios");
import { Response } from "express-serve-static-core";
import { CrimeTypeModel } from "./CrimeTypeModel";
let mongooseConnection = DataAccess.mongooseConnection;
let mongooseObj = DataAccess.mongooseInstance;

class CrimeModel {

  public schema: any;
  public model: any;
  public crimeTypeModal: {};

  public constructor() {
    this.createSchema();
    this.createModel();
    this.crimeTypeModal={
      "1":"ARSON",
      "2":"ASSULT OFFENSES",
      "3":"BURGLARY/BREAKING&ENTERING",
      "4":"COUNTERFEITING/FORGERY",
      "5":"DESTRUCTION/DAMAGE/VANDALISM OF PROPERTY",
      "6":"DRIVING UNDER THE INFLUENCE",
      "7":"FRAUD OFFENSES",
      "8": "LARCENY-THEFT",
      "9":"MOTOR VEHICLE THEFT",
      "10": "ROBBERY",
      "11":"STOLEN PROPERTY OFFENSES",
      "12": "TRESPASS OF REAL POPERTY",
      "13":"WEAPON LAW VIOLATIONS"

    };
  }

  public createSchema(): void {
    this.schema = new Mongoose.Schema(
      {
        report_number:            String,
        offense_id:               String,
        offense_start_datetime:   Date,
        offense_end_datetime:     Date,
        report_datetime:          Date,
        group_a_b:                String,
        crime_against_category:   String,
        offense_parent_group:     String,
        offense:                  String,
        offense_code:             String,
        precinct:                 String,
        sector:                   String,
        beat:                     String,
        mcpp:                     String,
        _100_block_address:       String,
        longitude:                Number,
        latitude:                 Number
      },
      { collection: "crimes"  },
      
    );
  }

  public createModel(): void {
    this.model = mongooseConnection.model<ICrimeModel>("Crimes", this.schema);
  }

  public retrieveAllCrimes(response: any): any {
    var query = this.model.find({});
    query.exec((err, itemArray) => {
      response.json(itemArray);
    });
  }

  public retrieveCrimeByReportNumber(response: any, filter: Object): any {
    var query = this.model.findOne(filter);
    query.exec((err, itemArray) => {
      response.json(itemArray);
    });
  }

  public retrieveCrimeCount(response: any): any {
    console.log("retrieve Crime Count ...");
    var query = this.model.estimatedDocumentCount();
    query.exec((err, numberOfCrimes) => {
      console.log("number Of Crimes: " + numberOfCrimes);
      response.json(numberOfCrimes);
    });
  }

  /**
   * Filter the crime by neighbor, type, and date
   * @param response : response 
   * @param hood : beat, default: all
   * @param crimeType : crime type, default: all
   * @param fromDate : from, default: this month
   * @param toDate : to
   */
  public crimeFilter(response: any, hood: string, crimeType: string, fromDate: string, toDate: string) {
    var filter= {};
    if(hood != "all"){
      filter["beat"] = hood;
    }

    //TODO: need to fix this
    if(crimeType != "all"){
      // var type = this.crimeTypeModal.model.find({Id: crimeType});
      // type.exec((err, itemArray) => {
      //   console.log(itemArray);
      //   let temp = JSON.parse(itemArray);
      //   filter["offense_parent_group"]  = temp.name;
      // });
      filter["offense_parent_group"]  = this.crimeTypeModal[crimeType];
      
    }
    if(fromDate==""){
      var date = new Date(), y = date.getFullYear(), m = date.getMonth();
      filter["report_datetime"] = {$gte: new Date(y,m,1).toISOString()};
    }
    if (toDate != "" && fromDate!=""){
      filter["report_datetime"] = {$gte: new Date(fromDate).toISOString(), $lte: new Date(toDate).toISOString()};
    }else{
      filter["report_datetime"] = {$gte: new Date(fromDate).toISOString()};
    }

    console.log(filter);
    var query = this.model.find(filter);

    query.exec((err, itemArray) => {
      //console.log(itemArray);
      response.json(itemArray);
    });
  }

  public async getDataBase(response: any): Promise<any> {

    //get data from SPD using axios
    var axios = require("axios");
    async function GetRequestFromSPD() {
      var config = {
        method: 'get',
        url: 'https://data.seattle.gov/resource/tazs-3rd5.json?$limit=200',
        headers: {}
      };
      const res = await axios(config);
      
      return res.data;
    }

    //Save data to database
    let data;
    await GetRequestFromSPD().then((res) => (data = res));

    this.model.insertMany(data, (err) => {
      if (err) {
        console.log("object creation failed");
      }
    });
    response.json(data);
  }
}
export { CrimeModel };
