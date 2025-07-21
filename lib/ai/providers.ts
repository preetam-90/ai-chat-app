import {
  customProvider,
  extractReasoningMiddleware,
  wrapLanguageModel,
} from 'ai';
import { xai } from '@ai-sdk/xai';
import {
  artifactModel,
  chatModel,
  reasoningModel,
  titleModel,
} from './models.test';
import { isTestEnvironment } from '../constants';
import { isGoogleAIConfigured } from './google-config';

// Determine which provider to use based on configuration
const useGoogleModels = !isTestEnvironment && isGoogleAIConfigured();

// Create the provider with xAI models first
let providerConfig = {
  languageModels: {
    'chat-model': xai('grok-2-vision-1212'),
    'chat-model-reasoning': wrapLanguageModel({
      model: xai('grok-3-mini-beta'),
      middleware: extractReasoningMiddleware({ tagName: 'think' }),
    }),
    'title-model': xai('grok-2-1212'),
    'artifact-model': xai('grok-2-1212'),
    'xai-chat-model': xai('grok-2-vision-1212'),
    'xai-reasoning-model': wrapLanguageModel({
      model: xai('grok-3-mini-beta'),
      middleware: extractReasoningMiddleware({ tagName: 'think' }),
    }),
  },
  imageModels: {
    'small-model': xai.imageModel('grok-2-image'),
    'xai-small-model': xai.imageModel('grok-2-image'),
  },
};

// Create the provider first
export const myProvider = isTestEnvironment
  ? customProvider({
      languageModels: {
        'chat-model': chatModel,
        'chat-model-reasoning': reasoningModel,
        'title-model': titleModel,
        'artifact-model': artifactModel,
      },
    })
  : customProvider(providerConfig);

// If Google AI is configured, try to load it after provider is created
// This ensures the app works even if Google AI fails to load
if (useGoogleModels && typeof window === 'undefined') {
  // Only attempt to load on the server side
  import('./google-models.js')
    .then(module => {
      module.initGoogleModels(providerConfig)
        .then(success => {
          if (success) {
            console.log('Successfully initialized Google AI models');
          } else {
            console.log('Failed to initialize Google AI models, using xAI models as fallback');
          }
        })
        .catch(error => {
          console.error('Error initializing Google AI models:', error);
        });
    })
    .catch(error => {
      console.error('Failed to load Google AI models module:', error);
    });
}
