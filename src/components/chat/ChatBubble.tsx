import React from 'react';
import { ChatMessage } from '../../types';

interface ChatBubbleProps {
  message: ChatMessage;
}

function formatContent(content: string) {
  // Bold text between **
  const parts = content.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    return <span key={i}>{part}</span>;
  });
}

export default function ChatBubble({ message }: ChatBubbleProps) {
  const isUser = message.role === 'user';

  if (isUser) {
    return (
      <div className="flex justify-end">
        <div className="max-w-[80%] bg-blue-600 text-white px-4 py-2.5 rounded-2xl rounded-br-sm text-sm leading-relaxed">
          {message.content}
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-end gap-2">
      <div className="w-7 h-7 rounded-full bg-violet-600 flex items-center justify-center shrink-0">
        <span className="text-white text-xs font-bold">AI</span>
      </div>
      <div className="max-w-[85%] bg-slate-100 text-slate-800 px-4 py-2.5 rounded-2xl rounded-bl-sm text-sm leading-relaxed">
        {formatContent(message.content)}
      </div>
    </div>
  );
}
