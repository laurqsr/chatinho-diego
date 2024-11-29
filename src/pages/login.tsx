import { useState } from 'react';
import imagem from '../assets/Component1.png';
import gif from '../assets/videoplayback.gif'; // Substitua pelo caminho correto
import { useNavigate } from 'react-router-dom';
import imagem2 from '../assets/AAA.png';
import axios from 'axios'; // Importe o axios

function Login() {
  const navigate = useNavigate();
  const [nome, setNome] = useState("");
  const [showV, setShowV] = useState(false);

  // Função para enviar o nome e fazer login
  const pegarNome = async () => {
    if (nome) {
      setShowV(true); // Mostrar o gif de carregamento

      try {
        // Realiza a requisição POST para a API de login
        const response = await axios.post("http://localhost:5000/entrar", {
          nick: nome
        });

        // Supondo que a resposta contenha um token
        if (response.data.token) {
          // Armazenar o token e o idUser no localStorage
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('iduser', response.data.idUser);
          localStorage.setItem('nick', response.data.nick);
          console.log(response)
          // Agora que o token está armazenado, podemos navegar para a página principal ou qualquer outra página protegida
          setTimeout(() => {
            navigate('/home');
          }, 1000);
        } else {
          console.error("Token não recebido da API");
        }
      } catch (error) {
        console.error("Erro ao fazer login:", error);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#ffffff] p-6">
      <img src="/logosvg.png" alt="logo" className="w-64 h-32 mb-8" style={{ filter: "invert(45%) sepia(70%) saturate(200%) hue-rotate(170deg)" }}/>

      <div className="w-full max-w-md bg-[#D8DFF1] p-8 rounded-xl shadow-2xl">
        <input
          type="text"
          className="w-full bg-transparent border-b-2 border-[#3e4b5b] text-white text-lg px-4 py-3 mb-6 focus:outline-none focus:ring-2 focus:ring-[#00b7ff] placeholder:text-[#3e4b5b]"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Insira seu nick"
        />

        <button
          onClick={pegarNome}
          className="w-full py-3 bg-[#6A93B3] text-white text-lg font-medium rounded-full hover:bg-gradient-to-l transition duration-200"
        >
          Entrar
        </button>
      </div>

      {showV && (
        <div className="absolute w-full h-full flex items-center justify-center z-50 bg-black opacity-50">
          <div className="spinner-border animate-spin rounded-full border-4 border-t-4 border-white w-16 h-16"></div>
        </div>
      )}
    </div>
  );
}

export default Login;
