export async function GET() {
  return new Response(JSON.stringify({ message: "Hello from API!" }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
/*
export async function GET() {
  try {
    const responseData = {
      message: "Hello from API!",
      timestamp: new Date().toISOString(),
    };

    return new Response(JSON.stringify(responseData), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "X-Powered-By": "Next.js API",
      },
    });
  } catch (error) {
    console.error("API Error:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

*/
