import { Configuration, OpenAIApi } from 'openai-edge'
import { OpenAIStream, StreamingTextResponse } from 'ai'

export const runtime = 'edge'

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(config)

export async function POST(request: Request) {
  const { messages, jobDetails } = await request.json()

  const response = await openai.createChatCompletion({
    model: 'gpt-4-1106-preview',
    stream: true,
    max_tokens: 500,
    messages: [
      {
        role: 'system',
        content:
          'You are an AI assistant preparing a potential candidate for a job interview. Your task is to ask them questions related to the job position. For each answer the user provides, give feedback on whether the answer is correct and then ask another question in the same message. If the user does not address the question, remind them that you are an assistant for interview preparation. In your first message, immediately ask a question similar to what might appear in a real interview. Only ask detailed technical questions related to specific technologies and their connections. The questions should be appropriate for the experience required in the job listing. In each message, ask only one question. Job offer details:' +
          jobDetails,
      },
      ...messages,
    ],
  })

  const stream = await OpenAIStream(response)

  return new StreamingTextResponse(stream)
}
