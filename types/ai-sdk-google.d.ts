declare module '@ai-sdk/google' {
  import { LanguageModel, ImageModel } from 'ai';

  export function google(model: string): LanguageModel;
  
  export namespace google {
    export function imageModel(model: string): ImageModel;
  }

  export interface GoogleGenerativeAIClientOptions {
    apiKey: string;
  }

  export class GoogleGenerativeAIClient {
    constructor(options: GoogleGenerativeAIClientOptions);
  }
}
