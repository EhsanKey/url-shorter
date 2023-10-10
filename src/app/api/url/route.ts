import connect from "@/lib/mongodb";
import Url from "@/model/Url";
import { NextRequest, NextResponse } from "next/server";
import shortHash from "shorthash2";







export async function POST(request: NextRequest) {
  try {
    await connect();

    const { url } = await request.json();
    console.log(url);

    if (!url) {
      return NextResponse.json(
        {
          message: "Please add a url",
        },
        { status: 400 }
      );
    }
    const findUrl = await Url.findOne({ url });
    if (findUrl) {
      return NextResponse.json(
        {
          message: "Url already exists",
          data: {
            url: findUrl.url,
            surl: findUrl.surl,
          },
        },
        { status: 400 }
      );
    }

    const hash = shortHash(url);
    const shortUrl = `${process.env.BASE_URL}/${hash}`;
    const newUrl = new Url({
      url: url,
      surl: shortUrl,
    });

    await newUrl.save();
    return NextResponse.json(
      {
        message: "Url created",
        data: {
          url: newUrl.url,
          surl: newUrl.surl,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Something went wrong",
      },
      { status: 500 }
    );
  }
}
