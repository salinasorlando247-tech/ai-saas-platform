import OpenAI from 'openai'
import dotenv from 'dotenv'
dotenv.config()
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

export async function routeAI(prompt){
  try{
    const res = await openai.chat.completions.create({
      model:"gpt-4o-mini",
      messages:[{ role:"user", content:prompt }]
    })
    return { provider:'openai', output: res.choices[0].message.content }
  }catch{
    return { provider:'fallback', output:'AI temporarily unavailable' }
  }
}
