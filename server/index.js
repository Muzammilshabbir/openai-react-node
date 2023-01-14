const { Configuration, OpenAIApi } = require("openai")
const express = require('express'); 
const app = express(); 
const router = express.Router(); 
const bodyParser = require('body-parser')
const cors = require('cors')

require('dotenv').config({path: '../.env'});

const configuration = new Configuration({
    organization: process.env.OPENAI_ORGANIZATION,
    apiKey: process.env.OPENAI_API_KEY,
});


app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())

app.use(bodyParser.json())
const openai = new OpenAIApi(configuration);

router.post('/', async function(req, res) { 
    
    const message = req.body.message || '';
    if (message.trim().length === 0) {
      res.status(400).json({
        error: {
          message: "Please enter a valid animal",
        }
      });
      return;
    }

    try {
        const completion = await openai.createCompletion({
          model: "text-davinci-003",
          prompt: message,
          temperature: 0.7,
          max_tokens: 500,
        });

        res.status(200).json({ result: completion.data.choices[0].text });
      } catch(error) {
        // Consider adjusting the error handling logic for your use case
        if (error.response) {
          console.error(error.response.status, error.response.data);
          res.status(error.response.status).json(error.response.data);
        } else {
          console.error(`Error with OpenAI API request: ${error.message}`);
          res.status(500).json({
            error: {
              message: 'An error occurred during your request.',
            }
          });
        }
      }
}); 

app.use('/', router); 
app.listen(process.env.port || 3000); 
console.log('Running at Port 3000'); 
