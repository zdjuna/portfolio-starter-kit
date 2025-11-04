# Qwen API Chat Application

A simple Next.js application to interact with the Qwen API (Alibaba Cloud's Large Language Model).

## Features

- 🤖 Direct integration with Qwen API (OpenAI-compatible endpoint)
- 💬 Real-time chat interface
- 🎤 Speech-to-Text (STT) support using Web Speech API
- 🎯 Model selection (qwen-plus, qwen-max, qwen-turbo)
- 🎨 Clean, modern UI with Tailwind CSS
- 🔒 Secure API key handling via environment variables

## API Details

- **Endpoint**: `https://dashscope-intl.aliyuncs.com/compatible-mode/v1/chat/completions`
- **Authentication**: Bearer Token (API Key)
- **Format**: OpenAI-compatible API
- **Available Models**:
  - `qwen-plus` - Balanced performance and cost
  - `qwen-max` - Maximum capability
  - `qwen-turbo` - Fast responses

## Setup Instructions

### 1. Get Your Qwen API Key

1. Visit [Qwen API Platform](https://qwen.ai/apiplatform)
2. Sign up or log in
3. Navigate to API Keys section
4. Create a new API key
5. Copy your API key

### 2. Configure Environment Variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Edit `.env` and add your API key:

```env
QWEN_API_KEY=your_actual_api_key_here
```

### 3. Install Dependencies

```bash
npm install
# or
pnpm install
```

### 4. Run the Development Server

```bash
npm run dev
# or
pnpm dev
```

### 5. Access the Application

Open one of these URLs in your browser:
- **Text Chat**: [http://localhost:3000/qwen](http://localhost:3000/qwen)
- **Speech-to-Text Chat**: [http://localhost:3000/qwen-stt](http://localhost:3000/qwen-stt)

## Project Structure

```
app/
├── api/
│   └── qwen/
│       └── route.ts          # API route that proxies Qwen API calls
├── qwen/
│   └── page.tsx              # Text chat UI page
└── qwen-stt/
    └── page.tsx              # Speech-to-Text chat UI page
```

## How It Works

1. **Frontend** (`app/qwen/page.tsx`):
   - React component with chat interface
   - Handles user input and message display
   - Makes requests to the Next.js API route

2. **Backend API Route** (`app/api/qwen/route.ts`):
   - Receives requests from the frontend
   - Adds authentication headers with API key
   - Proxies requests to Qwen API
   - Returns responses to the frontend

3. **Security**:
   - API key is stored in environment variables
   - Never exposed to the frontend
   - All API calls go through the backend route

## Request Format

The app sends requests in this format:

```json
{
  "model": "qwen-plus",
  "messages": [
    {
      "role": "system",
      "content": "You are a helpful assistant."
    },
    {
      "role": "user",
      "content": "Hello, who are you?"
    }
  ]
}
```

## Response Format

Qwen API returns responses in OpenAI-compatible format:

```json
{
  "choices": [
    {
      "message": {
        "role": "assistant",
        "content": "I am Qwen, a large language model created by Alibaba Cloud."
      }
    }
  ]
}
```

## Speech-to-Text (STT) Interface

The app includes a Speech-to-Text interface at `/qwen-stt` that allows you to speak your messages instead of typing them.

### Features:
- Real-time speech recognition using Web Speech API
- Visual feedback while listening
- Support for continuous speech input
- Works alongside traditional text input

### Browser Support:
- ✅ Chrome (recommended)
- ✅ Microsoft Edge
- ✅ Safari
- ❌ Firefox (limited support)

### Usage:
1. Click the "🎤 Speak" button
2. Allow microphone access when prompted
3. Speak your message clearly
4. Click "Stop" when finished
5. Click "Send" to submit your message

### Troubleshooting STT:
- **Microphone not working**: Ensure browser has microphone permission
- **Speech not recognized**: Speak clearly and check microphone levels
- **Browser not supported**: Use Chrome, Edge, or Safari

## Troubleshooting

### API Key Not Set Error

If you see "QWEN_API_KEY environment variable is not set":
1. Ensure `.env` file exists in the root directory
2. Verify the API key is correctly set in `.env`
3. Restart the development server

### Network Errors

If you see network-related errors:
1. Check your internet connection
2. Verify the API key is valid
3. Ensure you're not hitting rate limits

### CORS Errors

The app uses a Next.js API route to avoid CORS issues. All API calls should go through `/api/qwen`.

## Additional Resources

- [Qwen API Documentation](https://www.alibabacloud.com/help/en/model-studio/use-qwen-by-calling-api)
- [Qwen API Platform](https://qwen.ai/apiplatform)
- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)

## License

This is a demo application. Use it as you see fit.
