export const dynamic = "force-dynamic";
import * as path from "path";

import mongoose from "mongoose";
import StationModel from "../schemas/station.schema";
import { connectDB } from "@/utils/db";
import * as fs from "fs";
import csv from "csv-parser";

// @ts-ignore
import stationData from "../../../data/stazioni.csv";

export async function GET() {
  await connectDB();

  const stations = await StationModel.find();

  return Response.json(stations);
}

export async function PUT() {
  await connectDB();

  const results: any[] = []; // Define the type explicitly

  try {
    // Use async iterator to process the stream
    for await (const data of stationData) {
      results.push(data);
    }

    // Process the results and update MongoDB
    const stations = results.map((row) => {
      const id = row.IDStazione;
      return {
        id,
        name: row.Nome,
        values: generateRandomYearValues(),
      };
    });

    for (const station of stations) {
      await StationModel.updateOne({ id: station.id }, station, {
        upsert: true,
      });
    }

    return new Response(JSON.stringify("Data imported successfully"), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error importing data:", error); // Improved error logging
    return new Response(JSON.stringify("Failed to import data"), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

const generateRandomYearValues = () => {
  const years = [2019, 2020, 2021, 2022, 2023];

  // Generate 24 random numbers between 50 and 400
  const values = Array.from(
    { length: 24 },
    () => Math.floor(Math.random() * 351) + 50
  ).sort((a, b) => a - b);

  return years.map((year) => ({
    year,
    values,
  }));
};
