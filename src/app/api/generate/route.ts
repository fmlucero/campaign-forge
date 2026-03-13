import { NextResponse } from 'next/server';
import { GoogleGenAI, Type } from '@google/genai';

// Initialize the Google GenAI SDK
// It automatically picks up GEMINI_API_KEY from environment variables
const ai = new GoogleGenAI({});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { brief } = body;

    if (!brief || !brief.brand || !brief.product) {
      return NextResponse.json(
        { error: 'Missing required brief information.' },
        { status: 400 }
      );
    }

    const prompt = `
You are an expert digital marketing copywriter and conversion rate optimization specialist.
I need you to generate a high-converting landing page copy based on the following brief.

Brief Details:
- Brand Name: ${brief.brand}
- Product/Service: ${brief.product}
- Primary Goal: ${brief.goal}
- Target Audience & Key Benefits: ${brief.target}

Your response must be carefully crafted to maximize conversions for the stated goal.
`;

    const responseSchema = {
      type: Type.OBJECT,
      properties: {
        landingPage: {
          type: Type.OBJECT,
          properties: {
            hero: {
              type: Type.OBJECT,
              properties: {
                headline: { type: Type.STRING, description: "A catchy, benefit-driven H1" },
                subheadline: { type: Type.STRING, description: "A supporting sentence that explains the value proposition" },
                ctaText: { type: Type.STRING, description: "Action-oriented button text" }
              },
              required: ["headline", "subheadline", "ctaText"]
            },
            features: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING, description: "Feature or benefit title" },
                  description: { type: Type.STRING, description: "Short description of the feature" },
                  icon: { type: Type.STRING, description: "Name of an icon (e.g. 'Shield', 'Zap', 'Target', 'TrendingUp')" }
                },
                required: ["title", "description", "icon"]
              },
              description: "List of exactly 3 to 4 key features or benefits."
            },
            socialProof: {
              type: Type.OBJECT,
              properties: {
                quote: { type: Type.STRING, description: "A realistic testimonial quote" },
                author: { type: Type.STRING, description: "Fictional author name" },
                role: { type: Type.STRING, description: "Fictional author role or company" }
              },
              required: ["quote", "author", "role"]
            },
            footerCta: {
              type: Type.OBJECT,
              properties: {
                headline: { type: Type.STRING, description: "A final push to take action" },
                buttonText: { type: Type.STRING, description: "Button text for the footer" }
              },
              required: ["headline", "buttonText"]
            }
          },
          required: ["hero", "features", "socialProof", "footerCta"]
        }
      },
      required: ["landingPage"]
    };

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response generated from AI.");
    }
    
    // The response is guaranteed to be JSON matching the schema
    const parsedData = JSON.parse(text);

    return NextResponse.json(parsedData);
  } catch (error: any) {
    console.error("Error generating campaign:", error);
    return NextResponse.json(
      { error: 'Failed to generate campaign. Please check the server logs.' },
      { status: 500 }
    );
  }
}
