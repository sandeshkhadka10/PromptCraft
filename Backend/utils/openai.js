import "dotenv/config";

// here the message is user generated message
// and based upon that response it gives the response
const getOpenAIAPIResponse = async(message)=>{
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
        content: message
      }]
    })
  };

  try{
    const response = await fetch("https://integrate.api.nvidia.com/v1/chat/completions",options);
    const data = await response.json();
    // console.log(data.choices[0].message.content); reply yesma aako cha
    return data.choices[0].message.content; // yoh reply chai frontend ma pataune
  }catch(error){
    console.log(error);
  }
}

export default getOpenAIAPIResponse;

// Since it's a core function it should return every response that's why we used return instead of res.send