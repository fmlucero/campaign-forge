import { NextResponse } from 'next/server';
import { GoogleGenAI, Type } from '@google/genai';

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

    const goalStrategies: Record<string, string> = {
      lead_gen: `LEAD GENERATION — The primary objective is capturing leads (emails, signups, demo requests).
        Tone: Inviting, value-first, low-commitment. Emphasize "free", "no credit card", "get started".
        Landing page: Hero should promise a clear benefit with a signup form CTA. Social proof should reduce friction.
        Emails: Welcome → deliver promised value immediately. Follow-up → educate and build trust. Conversion → soft push to upgrade/buy.
        Ads: Focus on the free offer or lead magnet. Use curiosity-driven headlines.`,
      sales: `DIRECT SALES — The primary objective is driving immediate purchases or paid conversions.
        Tone: Urgent, persuasive, benefit-heavy with pricing psychology. Use scarcity and social proof aggressively.
        Landing page: Hero should create desire with a strong value proposition. Include pricing anchors, guarantees, and urgency triggers.
        Emails: Welcome → showcase the product's best features. Follow-up → handle objections, share case studies. Conversion → limited-time offer with urgency.
        Ads: Focus on ROI, transformation, and time-limited offers. Use strong action verbs.`,
      waitlist: `PRODUCT WAITLIST / PRE-LAUNCH — The primary objective is building anticipation and collecting early adopters.
        Tone: Exclusive, exciting, forward-looking. Emphasize "be the first", "early access", "limited spots".
        Landing page: Hero should create FOMO and exclusivity. Highlight what makes this different. CTA is "Join the Waitlist".
        Emails: Welcome → confirm their spot and build excitement. Follow-up → share behind-the-scenes or development updates. Conversion → invite to share with friends for priority access.
        Ads: Focus on exclusivity and innovation. Tease features without revealing everything.`,
      awareness: `BRAND AWARENESS — The primary objective is introducing the brand and building recognition, not immediate conversion.
        Tone: Storytelling, aspirational, emotionally resonant. Focus on brand values and mission over features.
        Landing page: Hero should tell the brand story. Features section should communicate values and vision. CTA is soft: "Learn More", "Explore", "Discover".
        Emails: Welcome → share the brand origin story. Follow-up → highlight community and values. Conversion → invite to follow on social or join community.
        Ads: Focus on brand story, values, and emotional connection. Use evocative imagery descriptions.`,
      reengagement: `RE-ENGAGEMENT / WIN-BACK — The primary objective is bringing back inactive users or past customers.
        Tone: Personal, nostalgic, "we miss you" energy. Acknowledge absence without guilt-tripping. Offer a compelling reason to return.
        Landing page: Hero should remind them what they loved. Highlight what's new or improved since they left. CTA: "Come Back", "See What's New".
        Emails: Welcome → "we noticed you've been away" with a personal touch. Follow-up → showcase new features or improvements. Conversion → exclusive comeback offer or discount.
        Ads: Focus on what's changed, new features, or a special returning-customer offer.`,
      event: `EVENT / LAUNCH PROMOTION — The primary objective is driving registrations or attendance for a specific event, webinar, or product launch.
        Tone: Energetic, time-sensitive, FOMO-driven. Emphasize the date, speakers/features, and what attendees will gain.
        Landing page: Hero should feature the event name, date, and key value prop prominently. Include speaker/feature highlights and a countdown feel. CTA: "Register Now", "Save Your Spot".
        Emails: Welcome → confirm registration and build excitement with agenda preview. Follow-up → speaker spotlight or exclusive content teaser. Conversion → last-chance reminder with urgency.
        Ads: Focus on the event date, key benefit of attending, and social proof (past attendees, speaker credibility).`,
    };

    const goalContext = goalStrategies[brief.goal] || goalStrategies.lead_gen;

    const prompt = `
You are an expert digital marketing strategist, copywriter, art director, and conversion rate optimization specialist.
I need you to generate a COMPLETE marketing campaign based on the following brief. This includes:
1. A high-converting landing page
2. An email sequence (3 emails)
3. Ad variations for different platforms
4. A visual identity guide

CAMPAIGN STRATEGY:
${goalContext}

CRITICAL: The campaign strategy above MUST deeply influence every piece of content you generate — the tone, word choice, CTA copy, email structure, ad angles, and even the visual identity mood. Two campaigns with different goals for the same product should feel completely different.

LANGUAGE PROTOCOL:
1. ANALYZE the language used in the "Brief Details" below.
2. DETECT if it is English, Spanish, or another language.
3. GENERATE ALL content STRICTLY in that detected language.
4. Do not translate English inputs into Spanish or vice versa. If I write in English, you respond in English. If I write in Spanish, you respond in Spanish.

THEMING (V3 Extreme Adaptability):
- Design a complete theme (Dark/Light mode, HEX palette, font pairing, borderRadius) tailored to the product's identity AND the campaign goal.
- A "Direct Sales" campaign should feel bold and urgent. A "Brand Awareness" campaign should feel warm and editorial. A "Waitlist" campaign should feel sleek and exclusive. Let the goal drive the visual decisions.

Brief Details:
- Brand Name: ${brief.brand}
- Product/Service: ${brief.product}
- Campaign Goal: ${brief.goal}
- Target Audience & Key Benefits: ${brief.target}

IMPORTANT GUIDELINES:
- Landing page: Structure and copy must align with the campaign strategy above.
- Emails: Each email should have a distinct purpose in the funnel as described in the strategy.
- Ads: Adapt tone and length per platform. Google ads should be concise, Facebook/Instagram more visual/emotional, LinkedIn professional.
- Visual Identity: Provide a cohesive brand guide with color rationale, typography choices, and brand do's/don'ts.
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
            featuresTitle: { type: Type.STRING, description: "Title for the features section localized" },
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
        },
        emailSequence: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              subject: { type: Type.STRING, description: "Email subject line" },
              preheader: { type: Type.STRING, description: "Preview text shown in inbox" },
              body: { type: Type.STRING, description: "Full email body copy with paragraphs separated by \\n\\n" },
              ctaText: { type: Type.STRING, description: "Call-to-action button text" },
              ctaUrl: { type: Type.STRING, description: "Placeholder URL for the CTA, e.g. https://example.com/signup" },
              type: { type: Type.STRING, enum: ["welcome", "follow_up", "conversion", "reminder"], description: "The email type in the sequence" }
            },
            required: ["subject", "preheader", "body", "ctaText", "ctaUrl", "type"]
          },
          description: "A sequence of 3 emails: welcome, follow_up, and conversion"
        },
        adVariations: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              platform: { type: Type.STRING, enum: ["google", "facebook", "instagram", "linkedin", "twitter"], description: "Target ad platform" },
              headline: { type: Type.STRING, description: "Ad headline adapted to platform constraints" },
              description: { type: Type.STRING, description: "Ad description/body copy" },
              ctaText: { type: Type.STRING, description: "Call-to-action text" },
              format: { type: Type.STRING, description: "Recommended ad format, e.g. 'Search Ad', 'Carousel', 'Single Image', 'Sponsored Post'" }
            },
            required: ["platform", "headline", "description", "ctaText", "format"]
          },
          description: "4-5 ad variations across different platforms"
        },
        visualIdentity: {
          type: Type.OBJECT,
          properties: {
            colorPalette: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING, description: "Color name, e.g. 'Primary Blue'" },
                  hex: { type: Type.STRING, description: "HEX color code" },
                  usage: { type: Type.STRING, description: "Where and how to use this color" }
                },
                required: ["name", "hex", "usage"]
              },
              description: "5-6 colors in the brand palette"
            },
            typography: {
              type: Type.OBJECT,
              properties: {
                headingFont: { type: Type.STRING, description: "Recommended heading font name" },
                bodyFont: { type: Type.STRING, description: "Recommended body font name" },
                rationale: { type: Type.STRING, description: "Why these fonts were chosen for this brand" }
              },
              required: ["headingFont", "bodyFont", "rationale"]
            },
            logoDirection: { type: Type.STRING, description: "Creative direction for the logo: style, imagery, symbolism to consider" },
            moodAndTone: { type: Type.STRING, description: "Overall brand voice and visual mood description" },
            doList: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "3-5 brand guidelines DO's"
            },
            dontList: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "3-5 brand guidelines DON'Ts"
            }
          },
          required: ["colorPalette", "typography", "logoDirection", "moodAndTone", "doList", "dontList"]
        }
      },
      required: ["landingPage", "emailSequence", "adVariations", "visualIdentity"]
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
