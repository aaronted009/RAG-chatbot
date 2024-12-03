import axios from "axios";

export async function sendMessageToOpenAI(message) {
  try {
    const res = await axios.post("http://127.0.0.1:5000/api/send-message", {
      message: message,
    });

    // Return the response from the Python backend
    return res.data.response;
  } catch (error) {
    console.error("Error communicating with the Python backend:", error);
    return "An error occurred while processing your request.";
  }
}
