import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import furiaBg from "./assets/csgo.png";

const botResponse = (msg: string): string => {
  const lower = msg.toLowerCase();

  if (lower.includes("próximo jogo")) {
    return "🔥 Próxima partida: FURIA x MIBR — 03/05 às 14h no IEM Major! Prepare-se para mais uma batalha épica!";
  }
  if (lower.includes("mvp")) {
    return "🏅 MVP do último jogo: KSCERATO com 28 kills! Um monstro no jogo!";
  }
  if (lower.includes("line")) {
    return "👥 A line-up da FURIA é: arT (IGL), yuurih, KSCERATO, chelo e FalleN. Pesa, né? 🐆";
  }
  if (lower.includes("jogadores")) {
    return "🎮 Jogadores da FURIA: arT (IGL), yuurih, KSCERATO, chelo e FalleN. Eles formam uma das melhores equipes do mundo!";
  }
  if (lower.includes("estatísticas")) {
    return "📊 A FURIA está atualmente em 5º lugar no ranking mundial HLTV e recentemente venceu 8 das últimas 10 partidas!";
  }
  if (lower.includes("histórico")) {
    return "🏆 Histórico da FURIA: A FURIA teve uma excelente trajetória nos torneios de CS, com destaque para o IEM Katowice 2020, onde terminaram em 2º lugar!";
  }
  if (lower.includes("rugido")) {
    return "🐆 RRRRRAAAAAAWWWRRRR!! A selva tá ON! FURIA dominando o cenário!";
  }
  if (lower.includes("últimos jogos")) {
    return "🕹️ Últimos jogos da FURIA: 3 vitórias consecutivas! A forma do time está excelente, com destaque para o KSCERATO.";
  }
  if (lower.includes("próximo torneio")) {
    return "🎮 O próximo torneio da FURIA é o IEM Major em maio, e a expectativa é grande! Prepare-se para o show!";
  }
  if (lower.includes("recordes")) {
    return "🏅 A FURIA detém vários recordes importantes, como o maior número de vitórias seguidas em grandes torneios internacionais e uma das maiores audiências em streams.";
  }
  if (lower.includes("história dos jogadores")) {
    return "🎤 Os jogadores da FURIA têm histórias inspiradoras! arT começou com 15 anos, KSCERATO é uma estrela que já conquistou grandes feitos em sua carreira!";
  }
  if (lower.includes("melhores momentos")) {
    return "🎥 Os melhores momentos da FURIA estão no canal oficial do YouTube! Não perca a chance de ver as jogadas épicas: [Link do Canal da FURIA].";
  }
  if (lower.includes("curiosidades")) {
    return "🔍 Curiosidade: a FURIA foi uma das primeiras organizações brasileiras a atingir o Top 5 do ranking mundial HLTV!";
  }
  if (lower.includes("como apoiar a furia")) {
    return "🛒 Você pode apoiar a FURIA comprando produtos oficiais na loja https://www.furia.gg/produtos ou pode nos seguir nas redes sociais para ficar por dentro das novidades!";
  }

  return "🤖 Ainda estou aprendendo... Tente perguntar sobre jogos, MVPs ou a loja!";
};

export default function App() {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Salve fã da FURIA! O que manda? 🐆🔥" },
  ]);
  const [input, setInput] = useState("");
  const [isBotTyping, setIsBotTyping] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    setIsBotTyping(true);

    setTimeout(() => {
      const replyText = botResponse(userMessage.text);
      const reply = { sender: "bot", text: replyText };
      setMessages((prev) => [...prev, reply]);
      setIsBotTyping(false);
    }, 800);
  };

  useEffect(() => {
    chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  return (
    <div className="relative bg-black text-white h-screen flex flex-col items-center justify-between px-4 py-6 sm:px-6 md:px-8 overflow-hidden">

      <img
        src={furiaBg}
        alt="FURIA Background"
        className="absolute inset-0 w-full h-full object-contain opacity-10 pointer-events-none select-none"
      />

      <h1 className="text-2xl sm:text-3xl font-bold text-yellow-400 text-center z-10">
        FURIA FanBot 🐆🔥 — Seu assistente oficial do time de CS:GO!
      </h1>

      <div
        ref={chatRef}
        className="flex-1 w-full max-w-xl overflow-y-auto my-4 p-4 bg-gray-900 rounded-lg shadow-inner sm:max-w-3xl z-10"
      >
        {messages.map((msg, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`my-2 p-3 rounded-xl max-w-[80%] ${
              msg.sender === "user" ? "ml-auto bg-yellow-600" : "mr-auto bg-gray-700"
            }`}
          >
            {msg.text}
          </motion.div>
        ))}

        {isBotTyping && (
          <motion.div
            key="bot-typing"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="my-2 p-3 rounded-xl max-w-[80%] mr-auto bg-gray-700 italic"
          >
            🤖 Pensando...
          </motion.div>
        )}
      </div>

      <div className="w-full max-w-xl flex gap-2 sm:max-w-3xl z-10">
        <input
          className="flex-1 p-3 rounded-xl bg-gray-800 text-white placeholder-gray-400 sm:p-4"
          placeholder="Digite sua mensagem..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-xl sm:py-3 sm:px-6"
        >
          Enviar
        </button>
      </div>
    </div>
  );
}
