"use client";

import { useState } from "react";
import { saveAs } from "file-saver";
import { Document, Packer, Paragraph } from "docx";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    skills: "",
    education: "",
    experience: "",
    job: "",
  });
  const [result, setResult] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    setResult(data.text || "");
    setLoading(false);
  };

  const downloadDocx = async () => {
    const doc = new Document({
      sections: [
        {
          children: result
            .split("\n")
            .map((line) => new Paragraph(line)),
        },
      ],
    });
    const blob = await Packer.toBlob(doc);
    saveAs(blob, "resume.docx");
  };

  return (
    <main className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="py-20 text-center bg-gradient-to-b from-white to-gray-50 dark:from-black dark:to-gray-900">
        <h1 className="text-4xl md:text-6xl font-bold">
          AI Resume & Cover Letter Generator
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Instantly generate professional resumes & cover letters in English & Malay. 
          Perfect for job seekers in Malaysia & beyond.
        </p>
        <div className="mt-6">
          <Button size="lg">Get Started</Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>⚡ Fast</CardTitle>
          </CardHeader>
          <CardContent>
            Generate resumes & cover letters in seconds.
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>🌍 Bilingual</CardTitle>
          </CardHeader>
          <CardContent>
            English & Malay versions ready instantly.
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>🔒 Private</CardTitle>
          </CardHeader>
          <CardContent>
            Your data is not stored — safe & secure.
          </CardContent>
        </Card>
      </section>

      {/* Demo Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900 px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Try It Now</h2>
        <form
          onSubmit={handleSubmit}
          className="max-w-2xl mx-auto space-y-4"
        >
          {["name", "email", "skills", "education", "experience", "job"].map(
            (field) => (
              <input
                key={field}
                type="text"
                name={field}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                value={form[field]}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 bg-background text-foreground"
                required={["name", "email", "job"].includes(field)}
              />
            )
          )}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Generating..." : "Generate Document"}
          </Button>
        </form>

        {result && (
          <div className="mt-8 max-w-3xl mx-auto">
            <h3 className="text-xl font-semibold mb-2">Generated Output</h3>
            <pre className="p-4 border rounded-lg whitespace-pre-wrap text-sm bg-card text-card-foreground">
              {result}
            </pre>
            <Button onClick={downloadDocx} className="mt-4">
              Download as Word (.docx)
            </Button>
          </div>
        )}
      </section>

      {/* Pricing Section */}
      <section className="py-16 max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-8">Pricing</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Free</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-2">✔ Generate documents</p>
              <p className="mb-2">✔ Download as Word</p>
              <p className="mb-4">❌ No PDF export</p>
              <Button variant="outline">Start Free</Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Pro (Coming Soon)</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-2">✔ Unlimited downloads</p>
              <p className="mb-2">✔ PDF export</p>
              <p className="mb-2">✔ Priority support</p>
              <Button>Upgrade</Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 max-w-3xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">FAQ</h2>
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Is my data safe?</CardTitle>
            </CardHeader>
            <CardContent>
              Yes, we don’t store your personal info on our servers.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Can I use it for free?</CardTitle>
            </CardHeader>
            <CardContent>
              Yes, free tier is available for everyone.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Do you support other languages?</CardTitle>
            </CardHeader>
            <CardContent>
              Currently English & Malay. More coming soon.
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-muted-foreground border-t">
        <p>© {new Date().getFullYear()} Nakai — Built with ❤️ in Malaysia</p>
      </footer>
    </main>
  );
}
