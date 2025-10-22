# Exchange Rate Dashboard

A modern, responsive Next.js application for real-time currency exchange rates and conversion.

## Features

- 🔄 **Real-time Exchange Rates** - Fetch current exchange rates from ExchangeRate-API
- 💱 **Currency Converter** - Convert between popular currencies instantly
- 📊 **Popular Rates Display** - View exchange rates for major currencies at a glance
- 📅 **Historical Rates** - Track exchange rate changes over the last 7 days
- 🤖 **AI Chatbot Assistant** - Ask questions about currencies and exchange rates using OpenAI
- 📱 **Responsive Design** - Beautiful UI that works on mobile and desktop
- 🎨 **Modern UI** - Built with Tailwind CSS and Lucide icons
- ⌨️ **Keyboard Shortcuts** - Press ESC to close the chatbot

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory and add your OpenAI API key:
```env
OPENAI_API_KEY=your_openai_api_key_here
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## API Information

This application uses the free [ExchangeRate-API](https://www.exchangerate-api.com/) service.

### API Endpoints Used

**Current Exchange Rates:**
```
GET https://api.exchangerate-api.com/v4/latest/{base_currency}
```

**Parameters:**
- `base_currency`: The base currency code (e.g., USD, EUR, GBP)

**Response Format:**
```json
{
  "base": "USD",
  "date": "2024-10-22",
  "rates": {
    "EUR": 0.92,
    "GBP": 0.79,
    "JPY": 149.85
  }
}
```

## Supported Currencies

- USD - US Dollar
- EUR - Euro
- GBP - British Pound
- JPY - Japanese Yen
- CAD - Canadian Dollar
- AUD - Australian Dollar
- CHF - Swiss Franc
- CNY - Chinese Yuan

## Technologies Used

- **Next.js 14** - React framework with App Router
- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **OpenAI API** - AI-powered chatbot assistant
- **ExchangeRate-API** - Exchange rate data

## Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
exchange-rates-conversion/
├── app/
│   ├── api/
│   │   └── chat/
│   │       └── route.ts  # OpenAI chatbot API endpoint
│   ├── layout.tsx        # Root layout
│   ├── page.tsx          # Main dashboard page
│   └── globals.css       # Global styles
├── components/
│   └── Chatbot.tsx       # AI chatbot component
├── public/               # Static assets
├── .env                  # Environment variables
├── package.json          # Dependencies
├── tsconfig.json         # TypeScript config
├── tailwind.config.js    # Tailwind config
└── next.config.js        # Next.js config
```

## Chatbot Usage

The AI chatbot assistant is available in the bottom-right corner of the screen:

- **Open**: Click the chat icon button
- **Close**: Click the X button or press the **ESC** key
- **Ask Questions**: Type your question about currencies, exchange rates, or financial markets
- **Send**: Press Enter or click the send button

## License

MIT
