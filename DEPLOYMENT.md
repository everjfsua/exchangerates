# Netlify Deployment Guide

## Issues Fixed

### 1. ESLint Errors
- ✅ Fixed missing dependency warning in `useEffect` hook
- ✅ Wrapped `fetchExchangeRates` function with `useCallback` to prevent infinite loops
- ✅ Fixed unescaped quotes in JSX by using HTML entities (`&quot;`)
- ✅ Fixed quote escaping in Chatbot component

### 2. Build Configuration
- ✅ Added `netlify.toml` configuration file
- ✅ Configured Next.js plugin for Netlify
- ✅ Set Node.js version to 18

## Deployment Steps

### 1. Connect Repository to Netlify
1. Go to [Netlify](https://app.netlify.com/)
2. Click "Add new site" → "Import an existing project"
3. Choose GitHub and select the `everjfsua/exchangerates` repository
4. Netlify will auto-detect the Next.js framework

### 2. Configure Environment Variables
In Netlify dashboard, add the following environment variable:
- **Key**: `OPENAI_API_KEY`
- **Value**: Your OpenAI API key

### 3. Deploy Settings
The following settings should be auto-detected from `netlify.toml`:
- **Build command**: `npm run build`
- **Publish directory**: `.next`
- **Node version**: 18

### 4. Deploy
Click "Deploy site" and Netlify will:
1. Install dependencies
2. Run ESLint checks
3. Build the Next.js application
4. Deploy to production

## Verification

After deployment, verify:
- ✅ Homepage loads correctly
- ✅ Currency converter works
- ✅ Exchange rates display properly
- ✅ Chatbot opens and responds (requires OpenAI API key)
- ✅ Historical rates load on demand
- ✅ Responsive design on mobile

## Troubleshooting

### If build fails:
1. Check build logs in Netlify dashboard
2. Verify environment variables are set correctly
3. Ensure Node version is 18 or higher
4. Run `npm run build` locally to test

### If chatbot doesn't work:
1. Verify `OPENAI_API_KEY` is set in Netlify environment variables
2. Check API key is valid and has credits
3. Review function logs in Netlify dashboard

## Local Testing

Before deploying, always test locally:
```bash
# Run linter
npm run lint

# Build for production
npm run build

# Test production build
npm start
```

## Repository
- **GitHub**: https://github.com/everjfsua/exchangerates
- **Branch**: main
