import { useState, useCallback } from 'react';
import { useApp } from '../context/AppContext';
import { ChatMessage, ExtractedFields } from '../types';
import {
  extractJobTitle,
  extractLocation,
  extractSeniority,
  extractUrgency,
  extractIndustry,
} from './useExtraction';

const WELCOME_MESSAGE: ChatMessage = {
  id: 'welcome',
  role: 'assistant',
  content: "Hi! I'm your Job Ad Advisor. Tell me about the position you're hiring for — job title, location, seniority level, and any other details.",
  timestamp: new Date(),
};

function generateFollowUp(fields: ExtractedFields): string | null {
  if (!fields.jobTitle) return "What's the job title for the position you're looking to fill?";
  if (!fields.location) return `Great, a ${fields.jobTitle} role! Which city or canton in Switzerland will this position be based in?`;
  if (!fields.seniority) return `Got it — ${fields.location}. Is this a Junior, Mid-level, Senior, Lead, or Director position?`;
  if (!fields.urgency) return `Perfect. How urgently do you need to fill this role? (Immediately, within 2 weeks, 1 month, 3 months, or no rush?)`;
  if (!fields.industry) return `Almost there! What industry or sector is this position in? (e.g., Technology, Finance, Pharma, Consulting)`;
  return `Great! I have all the key details for your **${fields.seniority} ${fields.jobTitle}** position in **${fields.location}**. Click "Proceed to Analysis" to see market insights and salary benchmarks.`;
}

export function useChat(sessionId: string | null) {
  const { dispatch } = useApp();
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME_MESSAGE]);
  const [isTyping, setIsTyping] = useState(false);
  const [extractedFields, setExtractedFields] = useState<ExtractedFields>({});

  const sendMessage = useCallback(
    async (content: string) => {
      if (!sessionId || !content.trim()) return;

      const userMsg: ChatMessage = {
        id: `user-${Date.now()}`,
        role: 'user',
        content: content.trim(),
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, userMsg]);
      dispatch({ type: 'ADD_MESSAGE', payload: { sessionId, message: userMsg } });

      // Extract fields from all messages combined
      const allText = content + ' ' + Object.values(extractedFields).join(' ');

      const newFields: ExtractedFields = { ...extractedFields };
      let updated = false;

      if (!newFields.jobTitle) {
        const title = extractJobTitle(content);
        if (title) { newFields.jobTitle = title; updated = true; }
      }
      if (!newFields.location) {
        const loc = extractLocation(content);
        if (loc) { newFields.location = loc; updated = true; }
      }
      if (!newFields.seniority) {
        const sen = extractSeniority(content);
        if (sen) { newFields.seniority = sen; updated = true; }
      }
      if (!newFields.urgency) {
        const urg = extractUrgency(content);
        if (urg) { newFields.urgency = urg; updated = true; }
      }
      if (!newFields.industry) {
        const ind = extractIndustry(allText);
        if (ind) { newFields.industry = ind; updated = true; }
      }

      if (updated) {
        setExtractedFields(newFields);
        dispatch({ type: 'UPDATE_FIELDS', payload: { sessionId, fields: newFields } });
      }

      setIsTyping(true);
      await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 600));

      const reply = generateFollowUp(newFields) || "Thanks! Is there anything else you'd like to add about this role?";

      const assistantMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        role: 'assistant',
        content: reply,
        timestamp: new Date(),
      };

      setIsTyping(false);
      setMessages(prev => [...prev, assistantMsg]);
      dispatch({ type: 'ADD_MESSAGE', payload: { sessionId, message: assistantMsg } });

      // Update session status
      dispatch({
        type: 'UPDATE_SESSION_STATUS',
        payload: { sessionId, status: 'In Progress' },
      });
    },
    [sessionId, extractedFields, dispatch]
  );

  return { messages, isTyping, sendMessage, extractedFields };
}
