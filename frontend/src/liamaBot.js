//LA-376b66e145604ad98e5f34e25fa2d319510e5110e443434b88b394d9e8727c58



import LlamaAI from 'llamaai';
const apiToken = process.env.REACT_APP_LIAMA_API_KEY;
const llamaAPI = new LlamaAI(apiToken);


/* const openai = new OpenAIApi({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    dangerouslyAllowBrowser:true,
});
 */


// Build the Request

export async function sendMessageToOpenAI(message){
    const apiRequestJson = {
        "messages": [
            {"role": "user", "content": message},
        ],
        "stream": false,
        "function_call": "information_extraction",
       };
     
       // Execute the Request
        llamaAPI.run(apiRequestJson)
          .then(response => {
            // Process response

            console.log(response);
            return response;
          })
          .catch(error => {
            // Handle errors
            return "Je ne suis pas en mesure de réponde à la question actuellement.";
          });
     
    
    
    
    

   /*   const res = await openai.chat.completions.create({
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
    }); */

 
   // return "Simulation ..."; //res.data.choices[0].text;
}