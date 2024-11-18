# Fine Voicing

Fine Voicing is a tool to evaluate the quality of voice assistants.

Features:
- Generate conversations with a voice assistant, using text or TTS.
- Evaluate the conversation quality.
- Evaluate the extracted information.

## Installation

```bash
npm install
```

## Usage

```bash
npm start
```

## Test Suite

The test suite is a collection of test cases that are used to evaluate the voice assistant.

To add a new test case, create a new JSON file in the `test-suites` directory and add the test case to the file.
Use the `test-suites/test.example.json` as a template.

```json
{
    "voice_model": {
        "provider": "openai",
        "model": "realtime",
        "voice": "alloy",
        "api_key": "your_api_key_here"
    },
    "instructions": "You're an helpful assistant speaking with a human being or an AI assistant",
    "test_mode": "text", // text or tts
    "turns": 1 // number of conversation turns to be generated
}
```

## Test Results

The test results are stored in the `test-results` directory.
See the `test-results/test-result.example.json` as an example.
Note that all the information logged in the conversation were generated by the models, and are not based on any personal information.

```json
{
  "conversation": [
    {
      "role": "user",
      "content": "Olá, bom dia! Meu nome é João Ferreira e estou a ligar-me para manifestar o meu interesse em alugar uma propriedade que vi anunciada no vosso website. A referência do anúncio é 2052. \n\nGostaria de saber se posso agendar uma visita para a próxima semana. Estou disponível na terça e quinta-feira à tarde. \n\nSe possível, estou interessado em iniciar o contrato de aluguer dentro das próximas duas semanas, então gostaria de saber mais sobre o processo. \n\nAguardo as vossas instruções e, se precisar de repetir alguma informação, não hesitem em pedir. Muito obrigado pela atenção!"
    },
    {
      "role": "assistant",
      "content": "Bom dia, Sr. João Ferreira. Agradecemos o seu interesse. Anotei que está interessado na propriedade com a referência 2052 e está disponível para uma visita na próxima semana, na terça ou quinta-feira à tarde. Poderia confirmar qual o melhor horário para si em ambos os dias?\n\nAlém disso, registrei que pretende iniciar o contrato de aluguer dentro das próximas duas semanas. Irei transferir a informação para um agente humano, que entrará em contacto consigo para agendarem uma visita e fornecer-lhe mais detalhes sobre o processo de arrendamento. \n\nMuito obrigado pelo seu contacto. Tenha um bom dia!"
    },
    {
      "role": "user",
      "content": "Muito obrigado pela rápida resposta! Na terça-feira, estou disponível a partir das 14h00, e na quinta-feira, a partir das 15h00. Qualquer destes horários é conveniente para mim, pelo que fico a aguardar por um contacto para confirmar a visita.\n\nAgradeço por encaminhar as informações para um agente humano, e estarei atento ao vosso contacto. \n\nTenha um ótimo dia também!"
    },
    {
      "role": "assistant",
      "content": "Muito obrigado, Sr. João Ferreira, por fornecer os horários de sua disponibilidade. Vou anotar que na terça-feira está disponível a partir das 14h00 e na quinta-feira a partir das 15h00. Encaminharei estas informações para um agente humano que entrará em contacto consigo para agendar a visita.\n\nAgradecemos o seu interesse e disponibilidade. Desejo-lhe um ótimo dia!"
    }
  ],
  "evaluation": {
    "conversation": {
      "evaluation": [
        {
          "score": 5,
          "explanation": "The assistant greeted the caller politely and collected all required information in a structured and friendly manner. It also confirmed the details provided by the caller."
        },
        {
          "score": 5,
          "explanation": "The assistant effectively summarized the caller's availability, confirmed the next steps, and expressed appreciation for the caller's cooperation and interest."
        }
      ]
    },
    "information": "The necessary information extracted from the conversation includes:\n\n- Name: João Ferreira\n- Property of interest: Referência do anúncio 2052\n- Available dates for a visit: Tuesday after 14h00 and Thursday after 15h00\n- Move in date/period: Within the next two weeks\n\nAll required information has been collected from the conversation."
  }
}
```

## Configuration

The configuration is done through the `config.json` file.
Use the `config.example.json` as a template.

```json
{ 
    "conversation_generator": {
        "provider": "openai",
        "model": "gpt-4o-mini",
        "api_key": "your_api_key_here",
        "system_prompt_path": "./prompts/defaults/conversation-generation.txt"
    },
    "conversation_evaluator": {
        "conversation": {
            "provider": "openai",
            "model": "gpt-4o-mini",
            "api_key": "your_api_key_here",
            "system_prompt_path": "./prompts/defaults/conversation-evaluation.txt"
        },
        "information_extraction": {
            "provider": "openai",
            "model": "gpt-4o-mini",
            "api_key": "your_api_key_here",
            "system_prompt_path": "./prompts/defaults/conversation-information-extraction.txt"
        }
    },
    "test_suite": {
        "dir": "./test-suites",
        "results_dir": "./test-results"
    }
}
```

## Prompts

Prompts are located in the `prompts` directory.
Three default prompts are provided:
- `conversation-generation.txt`: Used to generate conversations.
- `conversation-evaluation.txt`: Used to evaluate the quality of conversations.
- `conversation-information-extraction.txt`: Used to evaluate the extracted information from conversations.

## Architecture

The project is split into three main parts:
- `src/conversation-generator.ts`: Used to generate conversations.
- `src/conversation-evaluator.ts`: Used to evaluate the quality of conversations.
- `src/test-bench.ts`: Used to run the test suites.

## Roadmap

- Add support for [Ultravox](https://www.ultravox.ai/), an open-weight speech-to-speech model.
- Enable to run the tests using real human voice instead of generated text/TTS.
- Automate the turn management (currently hardcoded in the test definition).
- Explore a more agentic design.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

# About me

I'm a software developer turned product manager, turned software developer again thanks to generate AI. 
This projects has been developed with support of [Cursor](https://www.cursor.com/).

Please reach out if you have any questions or feedback!
LinkedIn: https://www.linkedin.com/in/arnaudbreton/