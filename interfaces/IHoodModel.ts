import Mongoose = require("mongoose");

interface IHoodModel extends Mongoose.Document {
  hoodId: number;
  beat: string;
  name: string;
  reports: [
    {
      reportId: number;
    }
  ];
}
export { IHoodModel };
