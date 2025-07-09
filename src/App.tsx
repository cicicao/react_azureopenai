import { useState } from 'react';
import ChatInput from './components/ChatInput';
import MessageList from './components/MessageList';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

function App() {
  const [messages, setMessages] = useState<Message[]>([]);

  const handleSend = async (userInput: string) => {
    const newMessages = [...messages, { role: 'user' as const, content: userInput }];
    setMessages(newMessages);

    const assistantMessage = await callOpenAI(newMessages);
    setMessages([...newMessages, assistantMessage]);
  };

  return (
    <div className="max-w-2xl mx-auto p-4 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-900 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">💬 AI Chat Assistant</h1>
      <MessageList messages={messages} />
      <ChatInput onSend={handleSend} />
    </div>
  );
}

export default App;

async function callOpenAI(messages: Message[]): Promise<Message> {
  console.log('callOpenAI is called');
  console.log('API Key:', import.meta.env.VITE_OPENAI_API_KEY);

  const key = import.meta.env.VITE_OPENAI_API_KEY;
  const endpoint = import.meta.env.VITE_OPENAI_ENDPOINT;
  const deployment = import.meta.env.VITE_OPENAI_DEPLOYMENT;
  const apiVersion = import.meta.env.VITE_OPENAI_API_VERSION;

  console.log('API Key present:', key ? 'yes' : 'no');
  console.log('Endpoint:', endpoint);
  console.log('Deployment:', deployment);
  console.log('API version:', apiVersion);

  const url = `${endpoint}/openai/deployments/${deployment}/chat/completions?api-version=${apiVersion}`;
  console.log('Request URL:', url);

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'api-key': key,
    },
    body: JSON.stringify({
      messages,
      temperature: 0.7,
      max_tokens: 800,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    console.error('OpenAI error:', error);
    return {
      role: 'assistant',
      content: `⚠️ Azure OpenAI 错误: ${response.status}`,
    };
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content ?? '⚠️ 无响应内容';

  return {
    role: 'assistant',
    content,
  };
}
