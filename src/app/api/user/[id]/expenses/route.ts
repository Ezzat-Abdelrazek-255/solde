import { connectDB } from "@/lib/db/connectDB";
import expenseModel from "@/lib/db/models/expense-model";
import mongoose from "mongoose";

export async function GET(
  _request: Request,
  { params }: { params: { id: string } },
) {
  if (!params.id) return Response.json({ message: "No ID provided" });

  try {
    await connectDB();
    const userId = params.id.replaceAll('"', "");
    const expenses = await expenseModel.find({
      user: userId,
    });

    return Response.json({
      message: "success",
      length: expenses.length,
      data: expenses,
    });
  } catch (error) {
    return Response.json({ message: "Something went wrong", error });
  }
}
