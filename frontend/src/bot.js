import OpenAIApi from "openai";

const openai = new OpenAIApi({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    dangerouslyAllowBrowser:true,
});



export async function sendMessageToOpenAI(message){

/* 
     const res = await openai.chat.completions.create({
        messages: [
            {
                role: "user",
                content: message,
            }
        ],
        model: "gpt-3.5-turbo", // Use GPT-3.5 Turbo for free access
        temperature: 0.7,       // Uncommented for meaningful configuration
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
    });
 */
 
    return "Simulation ..."; //res.data.choices[0].text;
}