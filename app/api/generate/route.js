import OpenAI from "openai";

export async function POST(req) {
  try {
    const { name, email, skills, education, experience, job } = await req.json();

    if (!name || !email || !job) {
      return new Response(
        JSON.stringify({ error: "Name, email, and target job are required." }),
        { status: 400 }
      );
    }

    // 🚀 Tarik dari .env.local
    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const prompt = `
You are a professional resume & cover letter writer. Create:
1) RESUME (English)
2) RESUME (Malay)
3) COVER LETTER (English)
4) COVER LETTER (Malay)

Return in clear sections with headings.

User:
- Name: ${name}
- Email: ${email}
- Skills: ${skills}
- Education: ${education}
- Experience: ${experience}
- Target Job: ${job}
`;

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.3,
      messages: [
        {
          role: "system",
          content:
            "You create concise, ATS-friendly resumes and cover letters in English and Malay.",
        },
        { role: "user", content: prompt },
      ],
    });

    const text = completion.choices?.[0]?.message?.content ?? "";
    return new Response(JSON.stringify({ text }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Server error." }), {
      status: 500,
    });
  }
}
