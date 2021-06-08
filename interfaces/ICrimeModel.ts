import Mongoose = require("mongoose");

interface ICrimeModel extends Mongoose.Document {
  // crimeId: number;
  // type: string;
  // description: string;
  // date: string;
  // lat: number;
  // long: number;

  report_number: string;
  offense_id: string;
  offense_start_datetime: Date;
  offense_end_datetime: Date;
  report_datetime: Date;
  group_a_b: string;
  crime_against_category: string;
  offense_parent_group: string;
  offense: string;
  offense_code: string;
  precinct: string;
  sector: string;
  beat: string;
  mcpp: string;
  _100_block_address: string;
  longitude: number;
  latitude: number;
}
export { ICrimeModel };
