import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  try {
    const { getOffersDeliveryZones } = await import(
      "../getOffersDeliveryZones"
    );
    const data = await getOffersDeliveryZones();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to fetch offers delivery zones",
      },
      { status: 500 }
    );
  }
};
