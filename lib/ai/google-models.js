// This file is intentionally a .js file to avoid TypeScript compilation issues
// It will be dynamically imported only when Google AI is configured

// Function to initialize Google models
export async function initGoogleModels(provider) {
  try {
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
    
    return true;
  } catch (error) {
    console.error('Failed to initialize Google models:', error);
    return false;
  }
}
