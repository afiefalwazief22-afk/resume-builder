export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, experience, skills } = body;

    // Dummy response (tak call API betul)
    const fakeResume = `
📄 Resume untuk ${name}

📧 Email: ${email}

💼 Pengalaman:
- ${experience || "Tiada pengalaman lagi, tetapi semangat tinggi!"}

🛠️ Skills:
- ${skills || "Belum isi, tapi cepat belajar!"}

🎯 Ringkasan:
Calon yang berdedikasi, rajin, dan sesuai untuk kerja moden.
    `;

    return new Response(
      JSON.stringify({ resume: fakeResume }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: "Server error" }),
      { status: 500 }
    );
  }
}