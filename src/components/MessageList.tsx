type Message = {
  role: 'user' | 'assistant';
  content: string;
};

type Props = {
  messages: Message[];
};

export default function MessageList({ messages }: Props) {
  return (
    <div className="space-y-2 mt-4">
      {messages.map((msg, idx) => (
        <div
          key={idx}
          className={`p-3 rounded ${
            msg.role === 'user'
              ? 'bg-blue-100 dark:bg-blue-900 text-right'
              : 'bg-gray-100 dark:bg-gray-700 text-left'
          }`}
        >
          <span className="block whitespace-pre-wrap">{msg.content}</span>
        </div>
      ))}
    </div>
  );
}