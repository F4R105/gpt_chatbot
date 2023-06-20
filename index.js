const express = require('express')
const app = express()
const openai = require('./openai')

app.use(express.json())

app.get('/', async (req, res) => {
  const user_query = req.body.query

  try {
    const gpt_response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: user_query,
      temperature: 0.7,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
  
    res.json({
      response: gpt_response.data.choices[0].text
    })
  }catch(err){
    console.log(err)
    res.json({error: err})
  }
})

const PORT = 5000
app.listen(PORT, ()=>{
  console.log('Server is listening on port', PORT)
  console.log(`http://localhost:${PORT}`)
})