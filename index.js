const express = require('express');
const cors = require('cors');
const { Configuration, OpenAIApi } = require("openai");
const {CONSTANTS} = require("./constants")

const configuration = new Configuration({
    apiKey: CONSTANTS.API_KEY,
});
const openai = new OpenAIApi(configuration);

const app = express();
app.use(express.static('public', { index: 'login.html' }));
app.use(express.json());
app.use(cors());

app.post('/chat', async (req, res) => {
    const userMessage = req.body.message;
    const resp = await getResponseFromOpenAI(userMessage);
    if(resp.result){
        let content="";
        for (const obj of resp.data) {
            content += obj.content;
            console.log(content);
        }
        res.json({ result:true,response: content });
    }else{
        res.json({result:false,message:resp.message})
    }
});

async function getResponseFromOpenAI(text) {
  try {
    const chat_completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: text }],
    });
    return {result:true,data:chat_completion.data.choices};
  } catch (error) {
      console.log(error);
      return {result:false,message:error.response.statusText}
  }
}

app.listen(CONSTANTS.PORT, () => {
  console.log(`Server running on port ${CONSTANTS.PORT}`);
});
