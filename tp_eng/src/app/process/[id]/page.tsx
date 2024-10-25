"use client";
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface IProcess {
  numeroProcesso?: string;
  classe?: {
    codigo: number;
    nome: string;
  };
  sistema?: {
    codigo: number;
    nome: string;
  };
  formato?: {
    codigo: number;
    nome: string;
  };
  tribunal?: string;
  dataHoraUltimaAtualizacao?: string;
  grau?: string;
  dataAjuizamento?: string;
  movimentos?: Array<{
    codigo: number;
    nome: string;
    dataHora: string;
  }>;
}

interface JsonResponse {
  data: {
    hits: {
      hits: Array<{
        _source: IProcess;
      }>;
    };
  };
}

export default function Process() {
  const params = useParams();
  const [processInfo, setProcessInfo] = useState<IProcess | undefined>();
  const [showMovimentos, setShowMovimentos] = useState(false); // Estado para controlar a visibilidade dos movimentos

  useEffect(() => {
    if (typeof params.id !== 'string') return;
    if (!params.id) return;

    getProcessInfo(params.id);
  }, [params]);

  function getProcessInfo(id: string) {
    axios.get(`/api/process/${id}`, {
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then(response => {
      const info: JsonResponse = response.data;
      console.log("processo obtido", info);
      setProcessInfo(info.data.hits.hits[0]._source); // Acessando _source
    })
    .catch(error => {
      console.error("Erro ao obter o processo", error);
    });
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-900 to-purple-800 p-4">
      <header className="text-white text-3xl font-bold mb-8">
        Detalhes do Processo
      </header>

      <main className="bg-white rounded-lg shadow-lg p-8 max-w-4xl w-full">
        {processInfo ? (
          <>
            <h1 className="text-2xl font-bold mb-4 text-gray-800">Processo: {processInfo.numeroProcesso}</h1>
            <p className="text-gray-700 mb-4"><strong>Classe:</strong> {processInfo.classe?.nome}</p>
            <p className="text-gray-700 mb-4"><strong>Tribunal:</strong> {processInfo.tribunal}</p>
            <p className="text-gray-700 mb-4"><strong>Formato:</strong> {processInfo.formato?.nome}</p>
            <p className="text-gray-700 mb-4"><strong>Última Atualização:</strong> {new Date(processInfo.dataHoraUltimaAtualizacao || "").toLocaleString()}</p>
            <p className="text-gray-700 mb-4"><strong>Data de Ajuizamento:</strong> {new Date(processInfo.dataAjuizamento || "").toLocaleDateString()}</p>
            
            <h2 className="text-xl font-bold mb-4 text-gray-800 cursor-pointer" onClick={() => setShowMovimentos(!showMovimentos)}>
              Movimentos {showMovimentos ? '▼' : '▲'}
            </h2>
            {showMovimentos && (
              <ul className="list-disc pl-5 text-gray-700">
                {processInfo.movimentos?.map((movimento, index) => (
                  <li key={index}>
                    <strong>{movimento.nome}:</strong> {new Date(movimento.dataHora).toLocaleString()}
                  </li>
                ))}
              </ul>
            )}
          </>
        ) : (
          <p className="text-gray-700">Carregando informações do processo...</p>
        )}
      </main>
      
      <footer className="mt-12 text-white">
        <a href="/"
           className="text-lg underline hover:text-gray-200 transition-all">
          Voltar para a busca
        </a>
      </footer>
    </div>
  );
}
