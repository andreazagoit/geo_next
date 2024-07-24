import StationModel from "../../schemas/station.schema";
import { connectDB } from "@/utils/db";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  try {
    await connectDB();

    const foundStation = await StationModel.findOne({ id });

    if (foundStation) {
      return new Response(JSON.stringify(foundStation), { status: 200 });
    } else {
      return new Response("Station not found", { status: 404 });
    }
  } catch (error) {
    console.error("Error fetching station:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
