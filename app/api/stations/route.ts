export const dynamic = "force-dynamic";

import mongoose from "mongoose";
import StationModel, { StationSchema } from "../schemas/station.schema";

export async function GET() {
  mongoose
    .connect(process.env.MONGODB_URI!)
    .then(() => console.log("Connected to DB"))
    .catch((error) => console.log("error", error));

  const stations = await StationModel.find();

  return Response.json(stations);
}
