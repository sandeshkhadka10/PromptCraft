// using npm package to interact with the model
// import 'dotenv/config';
// import OpenAI from 'openai';

// const client = new OpenAI({
//   apiKey: process.env.NVIDIA_API_KEY,
//   baseURL: 'https://integrate.api.nvidia.com/v1',
// });

// const response = await client.chat.completions.create({
//   model: "openai/gpt-oss-120b",
//   messages: [{ role: "user", content: "Joke related to computer science" }]
// });

// console.log(response.choices[0].message.content);

// using api endpoint to interact with models
import express from "express";
import "dotenv/config";
import cors from "cors";

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(cors());

app.listen(PORT, ()=>{
  console.log(`Server is running on PORT ${PORT}`);
});

app.post("/test",async(req,res)=>{
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.NVIDIA_API_KEY}`
    },
    body: JSON.stringify({
      model: "openai/gpt-oss-120b",
      messages: [{
        role: "user",
        content: req.body.message
      }]
    })
  };

  try{
    const response = await fetch("https://integrate.api.nvidia.com/v1/chat/completions",options);
    const data = await response.json();
    console.log(data.choices[0].message.content); // reply yesma aako cha
    res.send(data.choices[0].message.content); // yoh reply chai frontend ma pataune
  }catch(error){
    console.log(error);
  }
});
