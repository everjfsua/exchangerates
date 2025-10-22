import { OpenAI } from 'openai'
import { NextRequest, NextResponse } from 'next/server'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json()

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant specialized in currency exchange rates, financial markets, and currency conversion. Provide accurate, concise information about currencies, exchange rates, and related financial topics.'
        },
        ...messages
      ],
      temperature: 0.7,
      max_tokens: 500,
    })

    return NextResponse.json({
      message: response.choices[0].message.content
    })
  } catch (error) {
    console.error('OpenAI API error:', error)
    return NextResponse.json(
      { error: 'Failed to get response from chatbot' },
      { status: 500 }
    )
  }
}
