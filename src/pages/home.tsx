import  { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [salas, setSalas] = useState<any[]>([]); // Para armazenar as salas
  const [loading, setLoading] = useState(true); // Para exibir um indicador de carregamento
  const navigate = useNavigate();

  // Função para buscar as salas da API
  useEffect(() => {
    const fetchSalas = async () => {
      try {
        const response = await axios.get("http://localhost:5000/salas");
        setSalas(response.data);
        setLoading(false); // Atualiza o estado de loading quando as salas forem carregadas
      } catch (error) {
        console.error('Erro ao buscar salas:', error);
        setLoading(false); // Ainda desabilita o loading mesmo que ocorra um erro
      }
    };

    fetchSalas();
  }, []);

  // Função para navegar para a sala específica
  const entrarNaSala = (salaId: string) => {
    navigate(`/chat/${salaId}`);
  };

  // Exibindo um loading enquanto as salas estão sendo carregadas
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div>Carregando salas...</div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center w-full min-h-screen bg-[#ffffff] p-8">
  <div className="w-full max-w-4xl h-[85%] bg-[white] rounded-lg shadow-2xl p-8 overflow-hidden">
    
    {/* Título e contador de salas */}
    <div className='flex items-center justify-center'>
      <img src="/logosvg.png" alt="logo" className="w-64 h-32 mb-8" style={{ filter: "invert(45%) sepia(70%) saturate(200%) hue-rotate(170deg)" }}/>
    </div>
    
    {/* Lista de salas */}
    <div className="space-y-6">
      {salas.length === 0 ? (
        <div className="text-center text-white text-lg">Nenhuma sala disponível</div>
      ) : (
        salas.map((sala) => {
          const ultimaMsg = sala.msgs[sala.msgs.length - 1];
          const ultimaMsgTexto = ultimaMsg?.msg || "Nenhuma mensagem";
          const ultimaMsgNick = ultimaMsg?.nick || "Desconhecido";
          const ultimaMsgHora = ultimaMsg?.timestamp
            ? new Date(ultimaMsg.timestamp).toLocaleTimeString()
            : "Indefinido";

          return (
            <div
              key={sala._id}
              className="flex items-center space-x-4 p-5 rounded-xl bg-[#6A93B3] hover:bg-gray-500 cursor-pointer transition duration-200 transform hover:scale-105"
              onClick={() => entrarNaSala(sala._id)}
            >
              <div className="flex flex-col flex-1">
                <div className="flex justify-between items-center">
                  <span className="text-white font-semibold text-xl">{sala.nome}</span>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-gray-300 text-sm">
                    Última mensagem: {ultimaMsgTexto}
                  </span>
                  <span className="text-[#AEB1B2] hover:text-white text-xs">
                    {ultimaMsgNick} - {ultimaMsgHora}
                  </span>
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  </div>
</div>

  
  

  );
}

export default Home;
