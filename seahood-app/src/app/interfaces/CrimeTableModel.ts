interface ICrimeModel {
  report_number: string;
  report_datetime: Date;
  mcpp: string;
  _100_block_address: string;
  offense_parent_group: string;
  offense: string;
  //   longitude: number;
  //   latitude: number;
}
export default ICrimeModel;
