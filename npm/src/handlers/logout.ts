import { cookies } from "next/headers";


export async function POST() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete("access_token");
    cookieStore.delete("employee_store_id");
    cookieStore.delete("delivery_token");
    cookieStore.delete("roles");

    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: (error as Error).message }, { status: 500 });
  }
}
