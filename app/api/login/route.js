import connectToMongoDB from "@/lib/mongodb";
import User from "../../../models/user";
import { NextResponse } from "next/server";
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

export async function POST(request) {

    console.log(process.env.JWT_SECRET)

    const { email, password } = await request.json();

    console.log(email)

    await connectToMongoDB();
    const userExists = await User.findOne({ email });

    if (!userExists) {
        return NextResponse.json({ message: "User is not registered with this username" }, { status: 404 });
    }

    const isMatch = await bcrypt.compare(password, userExists.password);
    if (!isMatch) {
        return NextResponse.json({ message: "Please enter correct credintials" }, { status: 404 });
    }

    const payload = {
        user: {
            id: userExists.id,
        },
    };

   const token = jwt.sign(payload, "2454fsdf5ds4fsd4f5sd4f5d6", { expiresIn: "1h" })
   return NextResponse.json({ message: "Loged in successfully" , token , userExists}, { status: 200 });
}
