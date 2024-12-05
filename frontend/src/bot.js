import OpenAIApi from "openai";

const openai = new OpenAIApi({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export async function sendMessageToOpenAI(message) {
  const url = "http://127.0.0.1:8000/ask-bot";

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: message,
      }),
    });

    // If the response is not 2xx, throw an error
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    // If the response is 200 OK, return the response in JSON format.
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    return "Désolé, nous rencontrons un ennui momentané. Veuillez réessayer.";
  }
}
