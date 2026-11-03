import { apiRequest } from './api';

export const generateTutorResponse = async (prompt: string): Promise<string> => {
  const data = await apiRequest<{ text: string }>('/api/ai/ask', { method: 'POST', body: JSON.stringify({ prompt }) });
  return data.text;
};
