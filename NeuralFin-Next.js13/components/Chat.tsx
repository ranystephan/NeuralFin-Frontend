'use client'

import useState from 'react-usestateref'

enum Creator {
  Me = 0,
  Bot = 1,
}

interface MessageProps {
  text: string;
  from: Creator;
  key: number;
}

interface InputProps {
  onSend: (input: string) => void;
  disabled: boolean;
}

const ChatMessage = ({ text, from }: MessageProps) => {
  return (
    <>
      {from === Creator.Me && (
        <div className="bg-white p-4 rounded-lg flex gap-4 mt-6 items-center whitespace-pre-wrap">
          <p className="text-gray-700">{text}</p>
        </div>
      )}
      {from === Creator.Bot && (
        <div className="bg-gray-100 bg-opacity-80 p-4 rounded-lg flex gap-4 mt-4 items-center whitespace-pre-wrap">
          <p className="text-gray-700">{text}</p>
        </div>
      )}
    </>
  );
};

const ChatInput = ({ onSend, disabled }: InputProps) => {
  const [input, setInput] = useState('');

  const sendInput = () => {
    onSend(input);
    setInput('');
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode === 13) {
      sendInput();
    }
  };

  return (
    <div className="bg-white border-2 p-2 rounded-lg flex justify-center">
      <input
        value={input}
        onChange={(ev: React.ChangeEvent<HTMLInputElement>) => setInput(ev.target.value)}
        className="w-full py-2 px-3 text-gray-800 rounded-lg focus:outline-none"
        type="text"
        placeholder="Ask me anything finance related..."
        disabled={disabled}
        onKeyDown={(ev) => handleKeyDown(ev)}
      />
      {disabled && (
        <svg
          aria-hidden="true"
          className="mt-1 w-8 h-8 mr-2 text-gray-200 animate-spin fill-blue-600"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92"
            fill="currentColor"
          />
        </svg>
      )}
      {!disabled && (
        <button
          onClick={() => sendInput()}
          className="p-2 rounded-md text-gray-500 bottom-1.5 right-1"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill='none'
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke='currentColor'
            className="w-6 h-6"
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d="M6 12L3.269 3.126A59.768 59.768 0 0112 6c3.309 0 6 2.691 6 6s-2.691 6-6 6c-1.74 0-3.309-.747-4.4-1.942"
            />
          </svg>
        </button>
      )}
    </div>
  );
};

const Chat = () => {
  const [messages, setMessages, messagesRef] = useState<MessageProps[]>([]);
  const [loading, setLoading] = useState(false);

  const callApi = async (input: string) => {
    setLoading(true);

    const myMessage: MessageProps = {
      text: input,
      from: Creator.Me,
      key: new Date().getTime()
    };
    setMessages(prevMessages => [...prevMessages, myMessage]);

    const response = await fetch('/api/generate-answer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt: input })
    }).then((response) => response.json());
    setLoading(false);

    if (response.text) {
      const botMessage: MessageProps = {
      text: response.text,
      from: Creator.Bot,
      key: new Date().getTime()
      };
      setMessages(prevMessages => [...prevMessages, botMessage]);
    } else {
      console.log(response);
    }

  };

  return (
    <div className="relative max-w-2xl mx-auto">
      <div className="sticky top-0 w-full pt-10 px-4">
        <ChatInput onSend={(input) => callApi(input)} disabled={loading} />
      </div>

      <div className="mt-10 px-4">
        {messages.map((msg: MessageProps) => (
          <ChatMessage key={msg.key} text={msg.text} from={msg.from} />
        ))}
        {messages.length == 0 && <p className="text-center text-gray-400">I am at your service</p>}
      </div>
    </div>
  );
};

export default Chat;
