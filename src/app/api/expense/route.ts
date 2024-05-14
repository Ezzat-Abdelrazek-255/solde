import { connectDB } from "@/lib/db/connectDB";
import expenseModel from "@/lib/db/models/expense-model";

export async function GET(request: Request) {
  try {
    await connectDB();

    const res = await expenseModel.find({});

    console.log(res);
  } catch (error) {}
}

export async function POST(request: Request) {
  const body = await request.json();

  try {
    await connectDB();
    const expense = await expenseModel.create(body);
    return Response.json({
      message: "Expense created successfully",
      data: expense,
    });
  } catch (error) {
    return Response.json({ message: "Something went wrong", error: error });
  }
}
