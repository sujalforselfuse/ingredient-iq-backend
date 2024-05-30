const express=require('express');
const router=express.Router();
require('dotenv').config({path:'../.env'});
const vision = require('@google-cloud/vision');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GEN_AI_KEY);


const credentials = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON);

/* const CONFIG = {
  credentials: {
    client_email: CREDENTIALS.client_email,
    private_key: CREDENTIALS.private_key
  }
} */

const client = new vision.ImageAnnotatorClient({credentials:credentials});

const detectText = async (imageUrl) => {

  console.log('Detecting text in the image.')
  const request = {
    image: {
      source: {
        imageUri: imageUrl,
      },
    },
  };

  const [result] = await client.textDetection(request);
  const detections = result.textAnnotations;

  if (detections.length > 0) {
    console.log('Text:', detections[0].description);
    return detections[0].description;
  } else {
    return 'No text detected in the image.';
  }
  const template="[ {Ingredient:ingredient name , Healthiness Rating (out of 10):rating | Explanation:explanation}, {Ingredient:ingredient name , Healthiness Rating (out of 10):rating | Explanation:explanation}, {Ingredient:ingredient name , Healthiness Rating (out of 10):rating | Explanation:explanation}...}";
  run("I am giving you list of nutritional information of food and category of food item is Packaged food. Mark all the ingredients of item out of 10 whether it is healthy or not. Give the output in given template manner and give only things asked in template and don't include any other titles "+ template+ detections[0].description);
}
//detectText('https://www.unileverfoodsolutions.co.in/wp-content/uploads/2020/04/ketchup-fop-02.png');


 router.post('/detect-text', async (req, res) => {
  const { imageUrl, category } = req.body;

  if (!imageUrl || !category) {
      return res.status(400).json({ error: 'imageUrl and category are required' });
  }

  try {
      const detectedText = await detectText(imageUrl);
      res.json({ category, detectedText });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});


// Access your API key as an environment variable (see "Set up your API key" above)


async function run(pro) {
  // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = pro;

  const result = await model.generateContent(prompt);//shayad befor prompt
  const response = await result.response;
  const text = response.text();
  console.log(text)





} 

module.exports = router;




