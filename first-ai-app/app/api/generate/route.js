export async function POST(req) {
  try {
    const { prompt } = await req.json();

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "openrouter/auto",
          messages: [
            {
              role: "user",
              content: `Write a short Instagram caption for: ${prompt}`,
            },
          ],
        }),
      },
    );

    const data = await response.json();

    console.log("AI Response:", data);

    return Response.json({
      result: data?.choices?.[0]?.message?.content || "No response",
    });
  } catch (error) {
    console.error(error);

    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
}
