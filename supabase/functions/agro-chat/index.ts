import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const body = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    // Handle crop prediction
    if (body.type === 'crop_prediction') {
      const { parameters } = body;
      
      const predictionPrompt = `Based on the following soil and environmental parameters, recommend the best crop to grow:
      
- Nitrogen (N): ${parameters.N}
- Phosphorus (P): ${parameters.P}
- Potassium (K): ${parameters.K}
- Temperature: ${parameters.temperature}°C
- Humidity: ${parameters.humidity}%
- pH Level: ${parameters.ph}
- Rainfall: ${parameters.rainfall}mm

I have a dataset of 2200 crop records with these exact parameters. Analyze these values and recommend ONE crop name that would thrive best in these conditions. Common crops in the dataset include: rice, maize, chickpea, kidneybeans, pigeonpeas, mothbeans, mungbean, blackgram, lentil, pomegranate, banana, mango, grapes, watermelon, muskmelon, apple, orange, papaya, coconut, cotton, jute, coffee.

Respond with ONLY the crop name, followed by a brief explanation of why this crop is suitable for these conditions.`;

      const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-2.5-flash",
          messages: [
            { role: "system", content: "You are an agricultural expert AI that analyzes soil and environmental data to recommend optimal crops." },
            { role: "user", content: predictionPrompt }
          ],
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("AI gateway error:", response.status, errorText);
        throw new Error("Failed to get crop prediction");
      }

      const data = await response.json();
      const prediction = data.choices[0].message.content;

      return new Response(
        JSON.stringify({ prediction }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Handle chat messages
    const { messages } = body;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          {
            role: "system",
            content: `You are an expert agricultural advisor AI assistant specializing in smart farming, crop management, and precision agriculture. 

Your expertise includes:
- Soil health and NPK nutrient management
- Crop yield optimization and prediction
- Irrigation scheduling and water conservation
- Pest and disease management
- Fertilizer recommendations
- Weather impact on farming
- Sustainable farming practices
- Regional crop varieties and best practices

Provide clear, practical, and actionable advice to farmers. When answering:
- Be concise but thorough
- Use simple language that farmers can understand
- Provide specific recommendations when possible
- Consider regional farming practices
- Emphasize sustainable and efficient methods
- If you need more information to give accurate advice, ask clarifying questions

Always prioritize farmer success and environmental sustainability.`,
          },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limits exceeded, please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Payment required, please add funds to your Lovable AI workspace." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "AI gateway error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("chat error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
