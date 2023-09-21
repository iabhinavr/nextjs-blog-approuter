import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function GET (request) {

    let type = request.nextUrl.searchParams.get('type');
    let path = '';

    switch(type) {
        case 'post':
            path = '/blog/[postSlug]';
            break;
        case 'page':
            path = '/[pageSlug]';
            break;
        case 'home':
            path = '/blog';
            break;
    }

    if(request.nextUrl.searchParams.get('secret') !== process.env.REVALIDATION_SECRET) {
        return NextResponse.json({ message: "Invalid token" }, { status: 400 });
    }

    try {
        revalidatePath(path);
        return NextResponse.json({ revalidated: true, path: path, time: Date.now() });
    }
    catch (error) {
        return NextResponse.json({ revalidated: false, message: err.message }, { status: 400 });
    }

}