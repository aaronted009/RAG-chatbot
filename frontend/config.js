import  * as dotenv from "dotenv";
dotenv.config();

export const config = Object.freeze({
    PORT:parseInt(process.env.PORT),
    OPENAI_API_KEY:process.env.REACT_APP_OPENAI_API_KEY
});