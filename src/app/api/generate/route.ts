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

LANGUAGE PROTOCOL:
1. ANALYZE the language used in the "Brief Details" below.
2. DETECT if it is English, Spanish, or another language.
3. GENERATE ALL content (headlines, features, CTAs, author roles, UI labels) STRICTLY in that detected language.
4. Do not translate English inputs into Spanish or vice versa. If I write in English, you respond in English. If I write in Spanish, you respond in Spanish.

THEMING (V3 Extreme Adaptability):
- Design a complete theme (Dark/Light mode, HEX palette, font pairing, borderRadius) tailored to the product's identity.

Brief Details:
- Brand Name: ${brief.brand}
- Product/Service: ${brief.product}
- Primary Goal: ${brief.goal}
- Target Audience & Key Benefits: ${brief.target}
`;

    const responseSchema = {
      type: Type.OBJECT,
      properties: {
        landingPage: {
          type: Type.OBJECT,
          properties: {
            language: { type: Type.STRING, description: "The detected language of the brief, e.g. 'en-US' or 'es-ES'" },
            theme: {
              type: Type.OBJECT,
              properties: {
                primaryColor: { type: Type.STRING, description: "A primary HEX color code (e.g. '#3b82f6')" },
                secondaryColor: { type: Type.STRING, description: "A complementary secondary HEX color code" },
                backgroundColor: { type: Type.STRING, description: "The main background color HEX for the entire page" },
                textColor: { type: Type.STRING, description: "The main text color HEX for optimal contrast against the background" },
                fontFamily: { type: Type.STRING, enum: ["inter", "outfit", "playfair", "spaceGrotesk", "jakarta"], description: "The selected font family identifier" },
                borderRadius: { type: Type.STRING, enum: ["none", "sm", "md", "full"], description: "The border radius scale for elements" }
              },
              required: ["primaryColor", "secondaryColor", "backgroundColor", "textColor", "fontFamily", "borderRadius"]
            },
            hero: {
              type: Type.OBJECT,
              properties: {
                headline: { type: Type.STRING, description: "A catchy, benefit-driven H1" },
                subheadline: { type: Type.STRING, description: "A supporting sentence that explains the value proposition" },
                ctaText: { type: Type.STRING, description: "Action-oriented button text" }
              },
              required: ["headline", "subheadline", "ctaText"]
            },
            featuresTitle: { type: Type.STRING, description: "Title for the features section, e.g. 'Why choose us?' localized" },
            featuresSubtitle: { type: Type.STRING, description: "Subtitle for the features section localized" },
            features: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING, description: "Feature or benefit title" },
                  description: { type: Type.STRING, description: "Short description of the feature" },
                  icon: { type: Type.STRING, description: "Name of an icon from Lucide" }
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
          required: ["language", "theme", "hero", "featuresTitle", "featuresSubtitle", "features", "socialProof", "footerCta"]
        }
      },
      required: ["landingPage"]
    };

    const response = await ai.models.generateContent({
      model: 'gemini-3.1-flash-lite-preview',
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
