import React, { useEffect } from 'react';

const Chatbot = () => {
  useEffect(() => {
    // Append the chatbot script to the document
    const script = document.createElement('script');
    script.src = 'https://www.chatbase.co/embed.min.js';
    script.defer = true;
    script.setAttribute('chatbotId', 'JP8qzXDvnu_FbvQ_GpAFY');
    script.setAttribute('domain', 'www.chatbase.co');
    
    document.body.appendChild(script);

    // Return a cleanup function to remove the script when the component is unmounted
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.embeddedChatbotConfig = {
              chatbotId: "JP8qzXDvnu_FbvQ_GpAFY",
              domain: "www.chatbase.co"
            };
          `
        }}
      />
    </div>
  );
};

export default Chatbot;
