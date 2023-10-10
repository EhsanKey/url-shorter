import { NextResponse } from "next/server";
import connect from "../../../../lib/mongodb";
import Url from "@/model/Url";

export async function GET(
  request: Request,
  { params }: { params: { surl: string } }
) {
  try {
    await connect();
    console.log(params);

    const { surl } = params;
    const exist = await Url.findOne({
      surl: `${process.env.BASE_URL}/${surl}`,
    });
    if (!exist)
      return NextResponse.json("Url not found", { status: 404, headers: {} });
    return NextResponse.json(
      {
        message: "Url found",
        data: {
          url: exist.url,
          surl: exist.surl,
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
