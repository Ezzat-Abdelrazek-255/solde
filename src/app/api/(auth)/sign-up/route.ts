import { connectDB } from "@/lib/db/connectDB";
import userModel from "@/lib/db/models/user-model";

export async function POST(request: Request) {
  const body = await request.json();
  const { username, email, password } = body;

  if (!email || !password)
    return Response.json({
      message: "Email and password are required",
    });

  try {
    await connectDB();

    if (await userModel.findOne({ email: email })) {
      return Response.json({ message: "User already exists" });
    }

    const user = await userModel.create({ username, email, password });

    return Response.json({
      message: "User Successfully Created",
      data: {
        user,
      },
    });
  } catch (error) {
    console.log(error);

    return Response.json({
      message: "Something went wrong",
      error: error,
    });
  }
}
