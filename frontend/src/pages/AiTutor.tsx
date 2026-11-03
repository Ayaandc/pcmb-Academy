import React, { useEffect, useRef, useState } from 'react';
import { Camera, Clipboard, History, Send, Sparkles, WandSparkles } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ChatMessage } from '../types';
import { User } from '../types';
import { generateTutorResponse } from '../services/geminiService';
import { AcademyAvatar, UserAvatar } from '../components/Avatars';

const cleanAiText = (text: string) =>
  text
    .replace(/\$\$/g, '')
    .replace(/\\\[/g, '')
    .replace(/\\\]/g, '')
    .replace(/\\\(/g, '')
    .replace(/\\\)/g, '')
    .replace(/\\left|\\right/g, '')
    .replace(/\\,/g, ' ')
    .replace(/\\times/g, 'x')
    .replace(/\\cdot/g, '.')
    .replace(/\r\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();

const starterPrompts = [
  "Explain Newton's Laws",
  'Solve Integration',
  'Explain Hybridization',
  'Generate Biology Notes',
];

const AiTutor: React.FC<{ user: User }> = ({ user }) => {
  const [error, setError] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: "Hi! I'm your PCMB AI Tutor powered by Gemini. Ask any doubt and I will break it into clear, exam-ready steps.",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const isNearBottom = () => {
    const container = chatContainerRef.current;

    if (!container) {
      return true;
    }

    return container.scrollHeight - container.scrollTop - container.clientHeight < 160;
  };

  const scrollToLatest = (behavior: ScrollBehavior = 'smooth') => {
    messagesEndRef.current?.scrollIntoView({ behavior, block: 'end' });
  };

  useEffect(() => {
    scrollToLatest('auto');
  }, []);

  useEffect(() => {
    if (loading || isNearBottom()) {
      scrollToLatest();
    }
  }, [messages, loading]);

  useEffect(() => {
    if (!inputRef.current) return;
    inputRef.current.style.height = 'auto';
    inputRef.current.style.height = `${Math.min(inputRef.current.scrollHeight, 160)}px`;
  }, [input]);

  const handleSend = async (nextInput = input) => {
    if (!nextInput.trim() || loading) return;
    setError('');

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: nextInput,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const responseText = await generateTutorResponse(userMessage.text);

      const botMessage: ChatMessage = { id: (Date.now() + 1).toString(), role: 'model', text: cleanAiText(responseText), timestamp: new Date() };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'The AI tutor could not answer right now.');
    } finally { setLoading(false); }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const copyMessage = async (text: string) => {
    if (!navigator.clipboard) return;
    await navigator.clipboard.writeText(text);
  };

  return (
    <div className="relative flex h-[calc(100vh-124px)] min-h-[620px] flex-col overflow-hidden rounded-[34px] border border-white/80 bg-white/78 shadow-[0_36px_90px_-44px_rgba(40,24,92,0.46)] backdrop-blur-xl md:h-[calc(100vh-132px)]">
      <div className="pointer-events-none absolute -right-24 top-24 h-64 w-64 rounded-full bg-brand-500/15 blur-3xl" />
      <div className="deep-purple-gradient relative overflow-hidden px-5 py-5 text-white md:px-7">
        <div className="relative z-10 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <AcademyAvatar size="lg" online className="shadow-lg shadow-black/10" />
            <div>
              <p className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-white/60">AI Doubt Solver</p>
              <h2 className="text-xl font-extrabold tracking-normal md:text-2xl">Ask anything in PCMB</h2>
              <p className="mt-1 hidden text-xs font-medium text-white/68 sm:block">Step-by-step explanations powered by Gemini</p>
            </div>
          </div>
          <button disabled aria-label="Chat history is not available yet" className="flex h-11 w-11 cursor-not-allowed items-center justify-center rounded-2xl bg-white/16 text-white/50 shadow-lg shadow-black/10 backdrop-blur" title="Chat history is not available yet">
            <History size={19} />
          </button>
        </div>
        <div className="absolute -right-12 -top-16 h-40 w-40 rounded-full bg-white/12 blur-2xl" />
      </div>

      <div ref={chatContainerRef} className="chat-scroll glass-chat-bg flex-1 overflow-y-auto">
        <div className="mx-auto flex min-h-full w-full max-w-5xl flex-col px-4 pb-8 pt-5 md:px-7">
          <div className="mb-5 flex gap-2 overflow-x-auto pb-1">
            {starterPrompts.map((prompt) => (
              <button
                key={prompt}
                onClick={() => handleSend(prompt)}
                disabled={loading}
                className="premium-card premium-card-hover flex min-w-fit items-center gap-3 rounded-full px-4 py-3 text-left text-sm font-bold text-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
                  <WandSparkles size={17} />
                </span>
                {prompt}
              </button>
            ))}
          </div>

          <div className="space-y-6">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`message-fade-in flex w-full max-w-3xl items-start gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  {msg.role === 'user' ? <UserAvatar name={user.name} avatar={user.avatar} size="sm" /> : <AcademyAvatar size="sm" />}

                  <div className={`${msg.role === 'user' ? 'items-end' : 'items-start'} flex max-w-[82%] flex-col md:max-w-[72%]`}>
                    <div
                      className={`group relative max-w-full rounded-[24px] px-5 py-4 text-[15px] leading-7 shadow-lg ${
                        msg.role === 'user'
                          ? 'rounded-tr-md border border-brand-100 bg-brand-50 font-semibold text-slate-950 shadow-brand-100/80'
                          : 'rounded-tl-md border border-white/80 bg-white/94 text-slate-900 shadow-brand-100/80 backdrop-blur'
                      }`}
                    >
                      {msg.role === 'user' ? (
                        <p className="whitespace-pre-wrap">{msg.text}</p>
                      ) : (
                        <>
                          <div className="markdown-content">
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.text}</ReactMarkdown>
                          </div>
                          <button
                            onClick={() => copyMessage(msg.text)}
                            className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full border border-brand-100 bg-white text-slate-400 opacity-0 shadow-lg transition-all hover:text-brand-600 group-hover:opacity-100"
                            title="Copy response"
                          >
                            <Clipboard size={14} />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex w-full justify-start">
                <div className="message-fade-in flex w-full max-w-3xl items-start gap-3">
                  <AcademyAvatar size="sm" />
                  <div className="flex items-center gap-3 rounded-[24px] rounded-tl-md border border-white/80 bg-white/94 px-5 py-4 shadow-lg shadow-brand-100/80 backdrop-blur">
                    <div className="flex items-center gap-1.5">
                      <span className="typing-dot h-2 w-2 rounded-full bg-brand-600" />
                      <span className="typing-dot h-2 w-2 rounded-full bg-brand-600" />
                      <span className="typing-dot h-2 w-2 rounded-full bg-brand-600" />
                    </div>
                    <span className="text-sm font-bold text-slate-600">Thinking through the steps</span>
                  </div>
                </div>
              </div>
            )}
            {error && <p role="alert" className="rounded-2xl bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700">{error}</p>}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>

      <div className="border-t border-white/80 bg-white/86 p-3 backdrop-blur-xl md:p-4">
        <div className="mx-auto w-full max-w-5xl">
          <div className="flex items-end gap-2 rounded-[30px] border border-brand-100 bg-white/96 px-3 py-3 shadow-[0_24px_54px_-34px_rgba(40,24,92,0.48)] transition-all focus-within:border-brand-500 focus-within:ring-4 focus-within:ring-brand-50">
            <span className="hidden h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 sm:flex">
              <Sparkles size={19} />
            </span>
            <button disabled aria-label="Image upload is not available yet" className="flex h-11 w-11 flex-shrink-0 cursor-not-allowed items-center justify-center rounded-2xl bg-slate-50 text-slate-300" title="Image upload is not available yet">
              <Camera size={19} />
            </button>
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Type your question here..."
              className="min-h-[48px] max-h-40 flex-1 resize-none border-none bg-transparent px-1 py-3 text-[15px] leading-6 text-slate-950 outline-none placeholder:text-slate-400 focus:ring-0"
              rows={1}
            />
            <button
              onClick={() => handleSend()}
              disabled={!input.trim() || loading}
              className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full transition-all ${
                input.trim() && !loading
                  ? 'bg-gradient-to-r from-brand-600 to-brand-500 text-white shadow-lg shadow-brand-200 hover:-translate-y-0.5'
                  : 'cursor-not-allowed bg-slate-200 text-slate-400'
              }`}
              aria-label="Send message"
            >
              <Send size={18} />
            </button>
          </div>
          <p className="mt-2 text-center text-[11px] font-medium text-slate-400">AI can make mistakes. Verify important formulas and answers.</p>
        </div>
      </div>
    </div>
  );
};

export default AiTutor;
