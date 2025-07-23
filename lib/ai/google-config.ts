// Mock GoogleGenerativeAIClient for build compatibility
export class GoogleGenerativeAIClient {
  apiKey: string;

  constructor(options: { apiKey: string }) {
    this.apiKey = options.apiKey;
  }
}

// Check if Google AI is configured
export function isGoogleAIConfigured(): boolean {
  // Temporarily disable Google AI to fix build issues
  return false;

  // Uncomment this when the zod issue is resolved
  // const apiKey = process.env.GOOGLE_API_KEY;
  // return !!apiKey;
}

// Create a Google AI client if configured
export function getGoogleAIClient(): GoogleGenerativeAIClient | null {
  if (!isGoogleAIConfigured()) {
    return null;
  }

  const apiKey = process.env.GOOGLE_API_KEY;
  if (!apiKey) {
    return null;
  }

  return new GoogleGenerativeAIClient({ apiKey });
}
