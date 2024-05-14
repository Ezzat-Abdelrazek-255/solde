import { connectDB } from "@/lib/db/connectDB";
import budgetModel from "@/lib/db/models/budget-model";

export async function GET(
  _request: Request,
  { params }: { params: { id: string } },
) {
  if (!params.id) return Response.json({ message: "No ID provided" });

  try {
    await connectDB();
    const userId = params.id.replaceAll('"', "");
    const budgets = await budgetModel.find({
      user: userId,
    });

    return Response.json({
      message: "success",
      length: budgets.length,
      data: budgets,
    });
  } catch (error) {
    return Response.json({ message: "Something went wrong", error });
  }
}
