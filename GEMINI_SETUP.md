# Setting Up Google Gemini AI Integration

This AI chatbot application now supports Google's Gemini AI models alongside xAI models. Follow these steps to set up and use Gemini:

## Prerequisites

1. A Google Cloud account with access to the Vertex AI API
2. A Google API key for Gemini models

## Setup Instructions

1. **Get a Google API Key**:
   - Go to the [Google AI Studio](https://makersuite.google.com/)
   - Create an API key for Gemini models
   - Copy your API key

2. **Configure Environment Variables**:
   - Create a `.env` file in the root directory (if it doesn't exist)
   - Add your Google API key:
     ```
     GOOGLE_API_KEY=your-google-api-key
     ```

3. **Install Dependencies**:
   - The application already has the required dependencies installed
   - If needed, you can manually install them:
     ```
     npm install @ai-sdk/google --legacy-peer-deps
     ```

## Using Gemini Models

The application now provides the following Gemini models:

- **Gemini Pro**: Main chat model for general conversations
- **Gemini Reasoning**: Enhanced model with reasoning capabilities
- **Gemini Pro Vision**: For image analysis and generation

The application will automatically use Gemini models if the `GOOGLE_API_KEY` environment variable is set. If not, it will fall back to the xAI models.

## Model Selection

Users can switch between different models using the model selector in the UI. The available models include:

- Gemini Pro
- Gemini Reasoning
- Grok Vision (xAI)
- Grok Reasoning (xAI)

## Troubleshooting

If you encounter issues with the Gemini integration:

1. Verify your API key is correct and has the necessary permissions
2. Check that the `GOOGLE_API_KEY` environment variable is properly set
3. Restart the application after making changes to environment variables
