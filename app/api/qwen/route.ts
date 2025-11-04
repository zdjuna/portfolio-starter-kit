import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { messages, model = 'qwen-plus' } = body;

    const apiKey = process.env.QWEN_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: 'QWEN_API_KEY environment variable is not set' },
        { status: 500 }
      );
    }

    // Call Qwen API (OpenAI-compatible endpoint)
    const response = await fetch(
      'https://dashscope-intl.aliyuncs.com/compatible-mode/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model,
          messages,
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Qwen API error:', errorData);
      return NextResponse.json(
        { error: `Qwen API error: ${response.status}`, details: errorData },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error calling Qwen API:', error);
    return NextResponse.json(
      { error: 'Failed to call Qwen API', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
