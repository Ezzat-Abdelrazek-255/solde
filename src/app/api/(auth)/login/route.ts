import { connectDB } from "@/lib/db/connectDB";
import userModel from "@/lib/db/models/user-model";
import bcrypt from "bcryptjs";
export async function POST(request: Request) {
  const body = await request.json();
  const { email, password } = body;
  try {
    await connectDB();
    if (!email || !password) {
      return Response.json({
        message: "Both email and password are required to login and sign up",
      });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return Response.json({ message: "Invalid credentials" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return Response.json({ message: "Invalid credentials" });
    return Response.json({ message: "Login successful", data: { user } });
  } catch (error) {
    return Response.json({ message: "Something went wrong", error: error });
  }
}
