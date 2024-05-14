import { connectDB } from "@/lib/db/connectDB";
import budgetModel from "@/lib/db/models/budget-model";

export async function POST(request: Request) {
  const body = await request.json();

  try {
    await connectDB();
    const expense = await budgetModel.create(body);

    return Response.json({
      message: "Expense created successfully",
      data: expense,
    });
  } catch (error) {
    return Response.json({ message: "Something went wrong", error: error });
  }
}
