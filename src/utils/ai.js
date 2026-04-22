import axios from 'axios';
import { HOSPITALS, DOCTORS, NGOS, specialtyLabel } from '../data';

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
const ANTHROPIC_API_KEY = import.meta.env.VITE_ANTHROPIC_API_KEY;
const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;

// Local fallback logic
function localFallback(query) {
  const q = query.toLowerCase();

  if (q.includes("desert") || q.includes("underserved") || q.includes("gap")) {
    const deserts = HOSPITALS.filter(h => h.medicalDesertScore >= 7);
    return `**Medical Deserts Detected (${deserts.length} facilities):**\n\n` +
      deserts.map(h => `🔴 **${h.name}** [${h.id}] — ${h.city}, ${h.state}\n  Desert Score: ${h.medicalDesertScore}/10 | Doctors: ${h.numberDoctors} | Beds: ${h.capacity}\n  Key gaps: ${h.capabilities.slice(0,2).join(", ")}`).join("\n\n") +
      "\n\n**Recommendation:** Prioritize NGO deployment to Malkangiri [H008] and Kishori [H012] — both score 10/10 with near-zero specialist coverage.";
  }

  if (q.includes("transfer") || q.includes("available")) {
    const avail = DOCTORS.filter(d => d.availableForTransfer);
    return `**Doctors Available for Transfer (${avail.length}):**\n\n` +
      avail.map(d => `🟢 **${d.name}** [${d.id}] — ${specialtyLabel(d.specialty)}\n  Currently: ${d.hospital}, ${d.city}\n  Fee: ${d.consultationFee === 0 ? "Free" : "₹" + d.consultationFee}`).join("\n\n");
  }

  if (q.includes("cardiology") || q.includes("cardiac") || q.includes("heart")) {
    const cardio = HOSPITALS.filter(h => h.specialties.includes("cardiology"));
    return `**Cardiology Services in India (${cardio.length} facilities):**\n\n` +
      cardio.map(h => `${h.medicalDesertScore <= 3 ? "🟢" : "🟡"} **${h.name}** [${h.id}] — ${h.city}, ${h.state}\n  Score: ${h.medicalDesertScore}/10 | Doctors: ${h.numberDoctors}`).join("\n\n");
  }

  // Triage logic for chatbot
  if (q.includes("chest pain") || q.includes("breathing") || q.includes("severe") || q.includes("bleeding")) {
    return "🔴 **SERIOUS CONDITION DETECTED**\n\nYour symptoms indicate a potentially life-threatening emergency. Please press the **EMERGENCY** button below immediately to find the nearest hospital and ambulance services. Do not wait.";
  }

  if (q.includes("fever") || q.includes("headache") || q.includes("cough") || q.includes("cold") || q.includes("mild")) {
    return "🟢 **Mild Condition**\n\nBased on your symptoms, this appears to be a mild issue. \n- **Home Remedies:** Stay hydrated, rest well, and consume warm fluids.\n- **OTC Medicines:** You may consider paracetamol for fever or body ache.\n- **Precautions:** Avoid cold drinks and monitor your temperature.\n\n*Disclaimer: I am an AI, not a doctor. If symptoms persist for more than 3 days or worsen, please consult a healthcare professional.*";
  }

  return `I found relevant data for your query. Based on the **${HOSPITALS.length} facilities** mapped across India:\n\n- **${HOSPITALS.filter(h=>h.medicalDesertScore>=7).length} critical medical deserts** identified\n- **${DOCTORS.filter(d=>d.availableForTransfer).length} doctors** available for transfer\n- **${NGOS.length} NGOs** active in underserved regions\n\nPlease ask a more specific question for detailed analysis.`;
}

// System prompt with context
const getSystemPrompt = () => `You are MedMap IDP Agent. Act as a Medical Triage Assistant. 

Your role:
1. BE EXTREMELY CONCISE. No long explanations. Minimum work.
2. Medical Triage Flow:
   - When a user mentions symptoms, ask 1 clarifying question.
   - ALWAYS suggest 3 possible options for the user to choose from. 
   - Format options like this: [OPTION: Option Text].
   - Example: "Are you feeling dizzy? [OPTION: Yes, severely] [OPTION: Slightly] [OPTION: No]".
3. Analysis:
   - Detect EMERGENCY (🔴) vs NORMAL (🟢).
   - If EMERGENCY: Tell them to act NOW. Suggest nearest hospital [HXXX] from data.
   - Provide Google Maps links: [Get Directions](https://www.google.com/maps/dir/?api=1&destination=LAT,LNG).

Data for context:
HOSPITALS: ${JSON.stringify(HOSPITALS.map(h => ({ id: h.id, name: h.name, city: h.city, state: h.state, lat: h.lat, lng: h.lng, score: h.medicalDesertScore })))}
DOCTORS: ${JSON.stringify(DOCTORS.map(d => ({ name: d.name, specialty: d.specialty, city: d.city, available: d.availableForTransfer })))}
`;

// 1. OpenAI
async function callOpenAI(messages) {
  if (!OPENAI_API_KEY) throw new Error("No OpenAI key");
  const formattedMessages = [
    { role: "system", content: getSystemPrompt() },
    ...messages.map(m => ({ role: m.role, content: m.content }))
  ];
  const res = await axios.post("https://api.openai.com/v1/chat/completions", {
    model: "gpt-4o-mini",
    messages: formattedMessages,
    temperature: 0.3
  }, {
    headers: { "Authorization": `Bearer ${OPENAI_API_KEY}` }
  });
  return res.data.choices[0].message.content;
}

// 2. Anthropic
async function callAnthropic(messages) {
  if (!ANTHROPIC_API_KEY) throw new Error("No Anthropic key");
  const res = await axios.post("https://api.anthropic.com/v1/messages", {
    model: "claude-3-haiku-20240307",
    system: getSystemPrompt(),
    messages: messages.map(m => ({ role: m.role, content: m.content })),
    max_tokens: 1000
  }, {
    headers: { "x-api-key": ANTHROPIC_API_KEY, "anthropic-version": "2023-06-01", "content-type": "application/json" }
  });
  return res.data.content[0].text;
}

// 3. Groq
async function callGroq(messages) {
  if (!GROQ_API_KEY) throw new Error("No Groq key");
  const formattedMessages = [
    { role: "system", content: getSystemPrompt() },
    ...messages.map(m => ({ role: m.role, content: m.content }))
  ];
  const res = await axios.post("https://api.groq.com/openai/v1/chat/completions", {
    model: "llama3-8b-8192",
    messages: formattedMessages
  }, {
    headers: { "Authorization": `Bearer ${GROQ_API_KEY}` }
  });
  return res.data.choices[0].message.content;
}

export async function askAI(messages) {
  try {
    return await callOpenAI(messages);
  } catch (err1) {
    console.warn("OpenAI failed, trying Anthropic...", err1.message);
    try {
      return await callAnthropic(messages);
    } catch (err2) {
      console.warn("Anthropic failed, trying Groq...", err2.message);
      try {
        return await callGroq(messages);
      } catch (err3) {
        console.warn("All APIs failed. Using local fallback...", err3.message);
        // Get the last user message
        const lastMsg = messages.filter(m => m.role === 'user').pop();
        return localFallback(lastMsg ? lastMsg.content : "");
      }
    }
  }
}
