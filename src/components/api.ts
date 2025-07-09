export async function callOpenAI(messages: { role: string; content: string }[]) {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  const endpoint = import.meta.env.VITE_OPENAI_ENDPOINT;
  const deployment = import.meta.env.VITE_OPENAI_DEPLOYMENT;
  const apiVersion = import.meta.env.VITE_OPENAI_API_VERSION;

  const res = await fetch(
    `${endpoint}/openai/deployments/${deployment}/chat/completions?api-version=${apiVersion}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': apiKey,
      },
      body: JSON.stringify({
        messages,
        temperature: 0.7,
      }),
    }
  );

  const data = await res.json();
  return data.choices[0]?.message?.content || 'AI 没有返回内容。';
}
