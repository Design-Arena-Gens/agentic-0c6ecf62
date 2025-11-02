import { createOpenAI } from "@ai-sdk/openai";
import { convertToCoreMessages, generateText } from "ai";
import { NextResponse } from "next/server";

const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const systemPrompt = `You are BrandFlow, a bilingual (Arabic + English) AI creative director. 
Your responsibilities:
- Produce social media design concepts, campaign ideas, writing in both languages when helpful.
- Build full brand identity systems: color palettes, typography, logo concepts, usage guidelines, motion principles.
- Generate detailed video and motion design briefs: storyboards, shot lists, script lines, voice-over, and music directions.
- Deliver output as structured, actionable plans with bullet lists, tables, and clear headings.
- Ask clarifying questions only when essential. Otherwise, make reasonable assumptions and keep the project moving.
- Always include production-ready details: dimensions, file formats, timeline estimates, asset checklists.
- End each response with a short "Next Steps" section summarizing what the client should do next.`;

export async function POST(req: Request) {
  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json(
      {
        error:
          "Missing OPENAI_API_KEY. Add it to your environment variables to enable the assistant.",
      },
      { status: 500 },
    );
  }

  try {
    const body = await req.json();
    const messages = Array.isArray(body?.messages) ? body.messages : [];

    const result = await generateText({
      model: openai("gpt-4o-mini"),
      system: systemPrompt,
      messages: convertToCoreMessages(messages),
      temperature: 0.4,
      maxOutputTokens: 1400,
    });

    return NextResponse.json({
      content: result.text,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error: "حدث خطأ أثناء التواصل مع نموذج الذكاء الاصطناعي. حاول مرة أخرى.",
      },
      { status: 500 },
    );
  }
}
