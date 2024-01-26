const fetch = require('node-fetch');

// Función para enviar una solicitud a la API de OpenAI con el mensaje del usuario
async function sendMessageToChatGPT(message) {
  const apiKey = 'TU_CLAVE_DE_API_DE_OPENAI'; // Reemplaza con tu clave de API
  const apiUrl = 'https://api.openai.com/v1/engines/davinci-codex/completions';
  
  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      body: JSON.stringify({
        prompt: message,
        max_tokens: 150, // Número máximo de tokens para la respuesta
      }),
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    return data.choices[0].text.trim();
  } catch (error) {
    console.error('Error al enviar la solicitud a ChatGPT:', error.message);
    return 'Lo siento, ha ocurrido un error al procesar tu solicitud.';
  }
}

// Ejemplo de cómo usar la función en un chatbot simple
async function chatbot(userMessage) {
  const response = await sendMessageToChatGPT(userMessage);
  console.log('Respuesta de ChatGPT:', response);
}

// Ejemplo de uso
chatbot("Hola, ¿cómo estás?");
