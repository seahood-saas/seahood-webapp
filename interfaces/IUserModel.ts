import Mongoose = require("mongoose");

interface IUserModel extends Mongoose.Document {
  ssoId: string;
  name: string;
  email: string;
}
export { IUserModel };
