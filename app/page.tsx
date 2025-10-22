'use client'

import { useState, useEffect, useCallback } from 'react'
import { TrendingUp, RefreshCw, ArrowRightLeft, Calendar, DollarSign } from 'lucide-react'
import Chatbot from '@/components/Chatbot'

interface ExchangeRates {
  [key: string]: number
}

interface HistoricalRate {
  date: string
  rate: number
}

export default function Home() {
  const [baseCurrency, setBaseCurrency] = useState('USD')
  const [targetCurrency, setTargetCurrency] = useState('EUR')
  const [amount, setAmount] = useState('100')
  const [rates, setRates] = useState<ExchangeRates>({})
  const [loading, setLoading] = useState(false)
  const [lastUpdated, setLastUpdated] = useState<string>('')
  const [convertedAmount, setConvertedAmount] = useState<number | null>(null)
  const [historicalRates, setHistoricalRates] = useState<HistoricalRate[]>([])
  const [historicalLoading, setHistoricalLoading] = useState(false)

  const popularCurrencies = ['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD', 'CHF', 'CNY']

  const fetchExchangeRates = useCallback(async () => {
    setLoading(true)
    try {
      const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${baseCurrency}`)
      const data = await response.json()
      setRates(data.rates)
      setLastUpdated(new Date().toLocaleString())
    } catch (error) {
      console.error('Error fetching exchange rates:', error)
    } finally {
      setLoading(false)
    }
  }, [baseCurrency])

  const fetchHistoricalRates = async () => {
    setHistoricalLoading(true)
    try {
      const historicalData: HistoricalRate[] = []
      const today = new Date()
      
      // Fetch rates for the last 7 days
      for (let i = 0; i < 7; i++) {
        const date = new Date(today)
        date.setDate(date.getDate() - i)
        const dateString = date.toISOString().split('T')[0]
        
        // Note: ExchangeRate-API free tier doesn't support historical data
        // This is a simulation - in production, you'd use a paid API or different endpoint
        const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${baseCurrency}`)
        const data = await response.json()
        
        if (data.rates[targetCurrency]) {
          historicalData.push({
            date: dateString,
            rate: data.rates[targetCurrency] * (1 + (Math.random() - 0.5) * 0.02) // Simulated variation
          })
        }
      }
      
      setHistoricalRates(historicalData.reverse())
    } catch (error) {
      console.error('Error fetching historical rates:', error)
    } finally {
      setHistoricalLoading(false)
    }
  }

  useEffect(() => {
    fetchExchangeRates()
  }, [baseCurrency, fetchExchangeRates])

  useEffect(() => {
    if (rates[targetCurrency] && amount) {
      const result = parseFloat(amount) * rates[targetCurrency]
      setConvertedAmount(result)
    }
  }, [amount, targetCurrency, rates])

  const handleSwapCurrencies = () => {
    setBaseCurrency(targetCurrency)
    setTargetCurrency(baseCurrency)
  }

  return (
    <main className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <TrendingUp className="w-12 h-12 text-primary-600" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-3">
            Exchange Rate Dashboard
          </h1>
          <p className="text-lg text-gray-600">
            Real-time currency conversion and historical rates
          </p>
        </div>

        {/* Currency Converter Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <ArrowRightLeft className="w-6 h-6 text-primary-600" />
              Currency Converter
            </h2>
            <button
              onClick={fetchExchangeRates}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* From Currency */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                From
              </label>
              <div className="space-y-3">
                <select
                  value={baseCurrency}
                  onChange={(e) => setBaseCurrency(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  {popularCurrencies.map((currency) => (
                    <option key={currency} value={currency}>
                      {currency}
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Enter amount"
                />
              </div>
            </div>

            {/* Swap Button */}
            <div className="hidden md:flex items-center justify-center">
              <button
                onClick={handleSwapCurrencies}
                className="p-3 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
              >
                <ArrowRightLeft className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            {/* To Currency */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                To
              </label>
              <div className="space-y-3">
                <select
                  value={targetCurrency}
                  onChange={(e) => setTargetCurrency(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  {popularCurrencies.map((currency) => (
                    <option key={currency} value={currency}>
                      {currency}
                    </option>
                  ))}
                </select>
                <div className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-lg font-semibold text-gray-900">
                  {convertedAmount ? convertedAmount.toFixed(2) : '0.00'}
                </div>
              </div>
            </div>
          </div>

          {/* Conversion Rate Display */}
          {rates[targetCurrency] && (
            <div className="bg-primary-50 rounded-lg p-4 border border-primary-200">
              <p className="text-center text-gray-700">
                <span className="font-semibold">1 {baseCurrency}</span> ={' '}
                <span className="font-semibold text-primary-700">
                  {rates[targetCurrency].toFixed(4)} {targetCurrency}
                </span>
              </p>
            </div>
          )}

          {lastUpdated && (
            <p className="text-sm text-gray-500 text-center mt-4">
              Last updated: {lastUpdated}
            </p>
          )}
        </div>

        {/* Popular Exchange Rates */}
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <DollarSign className="w-6 h-6 text-primary-600" />
            Popular Exchange Rates (Base: {baseCurrency})
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {popularCurrencies
              .filter((currency) => currency !== baseCurrency)
              .map((currency) => (
                <div
                  key={currency}
                  className="bg-gradient-to-br from-primary-50 to-indigo-50 rounded-lg p-4 border border-primary-200 hover:shadow-md transition-shadow"
                >
                  <div className="text-sm font-medium text-gray-600 mb-1">
                    {baseCurrency} → {currency}
                  </div>
                  <div className="text-2xl font-bold text-gray-900">
                    {rates[currency] ? rates[currency].toFixed(4) : 'Loading...'}
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Historical Rates Section */}
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Calendar className="w-6 h-6 text-primary-600" />
              Historical Rates (Last 7 Days)
            </h2>
            <button
              onClick={fetchHistoricalRates}
              disabled={historicalLoading}
              className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${historicalLoading ? 'animate-spin' : ''}`} />
              Load Historical
            </button>
          </div>

          {historicalRates.length > 0 ? (
            <div className="space-y-3">
              {historicalRates.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <span className="font-medium text-gray-700">{item.date}</span>
                  <span className="font-semibold text-gray-900">
                    1 {baseCurrency} = {item.rate.toFixed(4)} {targetCurrency}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <Calendar className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>Click &quot;Load Historical&quot; to view past exchange rates</p>
              <p className="text-sm mt-2">
                Note: Historical data is simulated for demonstration purposes
              </p>
            </div>
          )}
        </div>

        {/* API Information */}
        <div className="mt-8 bg-white rounded-2xl shadow-xl p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            API Request Parameters
          </h2>
          <div className="space-y-4 text-gray-700">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-lg mb-2">Current Exchange Rates</h3>
              <code className="block bg-gray-800 text-green-400 p-3 rounded text-sm overflow-x-auto">
                GET https://api.exchangerate-api.com/v4/latest/{'{base_currency}'}
              </code>
              <p className="mt-2 text-sm">
                <strong>Parameters:</strong> base_currency (e.g., USD, EUR, GBP)
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-lg mb-2">Response Format</h3>
              <code className="block bg-gray-800 text-green-400 p-3 rounded text-sm overflow-x-auto whitespace-pre">
{`{
  "base": "USD",
  "date": "2024-10-22",
  "rates": {
    "EUR": 0.92,
    "GBP": 0.79,
    "JPY": 149.85,
    ...
  }
}`}
              </code>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-lg mb-2">Features</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Real-time exchange rate conversion</li>
                <li>Support for multiple currencies</li>
                <li>Historical rate tracking (simulated)</li>
                <li>Responsive design for all devices</li>
                <li>Auto-refresh capability</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Chatbot */}
      <Chatbot />
    </main>
  )
}
