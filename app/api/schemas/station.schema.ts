import mongoose, { Schema } from "mongoose";

export const StationSchema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  values: [
    {
      year: { type: Number, required: true },
      values: { type: [Number], required: true },
    },
  ],
});

const StationModel =
  mongoose.models.Station || mongoose.model("Station", StationSchema);

export default StationModel;
