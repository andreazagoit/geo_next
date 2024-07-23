import mongoose, { Schema } from "mongoose";

export const StationSchema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  yearValues: [
    {
      year: { type: Number, required: true },
      value: { type: Number, required: true },
    },
  ],
});

const StationModel =
  mongoose.models.Station || mongoose.model("Station", StationSchema);

export default StationModel;
