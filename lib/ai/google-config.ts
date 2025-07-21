import { GoogleGenerativeAIClient } from '@ai-sdk/google';

// Initialize the Google AI client with your API key
// This key should be stored in your environment variables
export const googleAIClient = new GoogleGenerativeAIClient({
  apiKey: process.env.GOOGLE_API_KEY || '',
});

// Export a function to check if the Google API key is configured
export function isGoogleAIConfigured(): boolean {
  return !!process.env.GOOGLE_API_KEY;
}
