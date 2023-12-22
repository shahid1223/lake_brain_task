import connectToMongoDB from "@/lib/mongodb";
import User from "../../../models/user";
import { NextResponse } from "next/server";
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

export async function POST(request) {
    const { name, email, password, loginType = "normal" } = await request.json();
    await connectToMongoDB();
    const userExists = await User.findOne({ email });

    if (userExists) {
        return NextResponse.json({ message: "User is already registered with this email" }, { status: 409 });
    }

    let hashedPassword;

    if (loginType === "normal") {
        const salt = await bcrypt.genSalt(10);
        hashedPassword = await bcrypt.hash(password, salt);
    } else {
        hashedPassword = password;
    }

    const user = await User.create({ name, email, password: hashedPassword });

    const payload = {
        user: {
            id: user.id,
        },
    };

    const token = jwt.sign(payload, "2454fsdf5ds4fsd4f5sd4f5d6", { expiresIn: "1h" })
    return NextResponse.json({ message: "registered successfully", token, userExists, code: 200 }, { status: 200 });
}
