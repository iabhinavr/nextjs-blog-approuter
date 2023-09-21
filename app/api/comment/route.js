import { NextResponse } from "next/server";
import { createComment } from "../../../lib/comments";

export async function POST(request) {

    const body = await request.json();

    const resJson = await createComment(body);

    if (resJson.errors) {
        return NextResponse.json({ message: resJson.errors[0].message, body: body }, { status: 400 });
    }

    else if (resJson.data.createComment !== null && resJson.data.createComment.success === true) {
        return NextResponse.json({ message: "Your comment is awaiting approval" });
    }

    return NextResponse.json({ message: "Some error occurred" }, { status: 500 });
}