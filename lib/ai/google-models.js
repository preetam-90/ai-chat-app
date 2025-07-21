// This file is intentionally a .js file to avoid TypeScript compilation issues
// It will be dynamically imported only when Google AI is configured

// Function to initialize Google models
export async function initGoogleModels(provider) {
  try {
    // Check if we're in a browser environment
    if (typeof window !== 'undefined') {
      console.log('Running in browser environment, skipping Google AI SDK import');
      return false;
    }

    // Check if the module exists by using require.resolve
    try {
      require.resolve('@ai-sdk/google');
    } catch (e) {
      console.warn('Google AI SDK module not found. Please install it with: npm install @ai-sdk/google --legacy-peer-deps');
      return false;
    }

    // Dynamically import the Google AI SDK
    const { google } = await import('@ai-sdk/google');
    
    // Update the provider configuration with Google models
    if (provider && provider.languageModels) {
      provider.languageModels['chat-model'] = google('gemini-1.5-pro');
      provider.languageModels['chat-model-reasoning'] = google('gemini-1.5-pro');
      provider.languageModels['title-model'] = google('gemini-1.5-flash');
      provider.languageModels['artifact-model'] = google('gemini-1.5-pro');
    }
    
    if (provider && provider.imageModels) {
      provider.imageModels['small-model'] = google.imageModel('gemini-1.5-pro-vision');
    }
    
    console.log('Successfully loaded Google AI models');
    return true;
  } catch (error) {
    console.error('Failed to initialize Google models:', error);
    return false;
  }
}
