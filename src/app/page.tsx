"use client";
import { useState, useEffect } from "react";
import { getAddress } from "../../get-address";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { MdOutlineDelete } from "react-icons/md";

type Address = {
  id: string;
  bairro: string;
  cep: string;
  complemento: string;
  ddd: string;
  localidade: string;
  logradouro: string;
  uf: string;
  consultedAt: Date;
};

// Função para salvar os endereços no localStorage
function saveAddressesToLocalStorage(addresses: Address[]) {
  localStorage.setItem("addresses", JSON.stringify(addresses));
}

// Função para recuperar os endereços do localStorage
function getAddressesFromLocalStorage(): Address[] {
  const storedAddresses = localStorage.getItem("addresses");
  return storedAddresses
    ? JSON.parse(storedAddresses).map((address: Address) => ({
        ...address,
        consultedAt: new Date(address.consultedAt),
      }))
    : [];
}

function formatDate(date: Date) {
  const result = formatDistanceToNow(new Date(date), {
    includeSeconds: true,
    locale: ptBR,
  });
  return result;
}

function isValidCep(cep: string) {
  const cepRegex = /^[0-9]{5}-?[0-9]{3}$/;
  return cepRegex.test(cep);
}

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [addresses, setAddresses] = useState<Address[]>(getAddressesFromLocalStorage());
  const [textValue, setTextValue] = useState("");
  const [countryCode, setCountryCode] = useState("br");

  useEffect(() => {
    // Sempre que a lista de endereços mudar, salve novamente no localStorage
    saveAddressesToLocalStorage(addresses);
  }, [addresses]);

  async function handleGetAddress() {
    if (!isValidCep(textValue)) {
      alert("Por favor, insira um CEP válido no formato XXXXX-XXX.");
      return;
    }

    setLoading(true);
    try {
      const result = await getAddress(textValue, countryCode);
      if (!result) {
        alert("CEP inválido ou endereço não encontrado.");
        return;
      }

      // Verifica se o endereço realmente foi encontrado
      if (!result.logradouro || !result.bairro || !result.localidade) {
        alert("CEP não encontrado ou endereço incompleto.");
        return;
      }

      const newAddress: Address = {
        id: self.crypto.randomUUID(),
        consultedAt: new Date(),
        ...result,
      };
      
      // Adiciona o endereço encontrado ao estado
      setAddresses([newAddress, ...addresses]);
    } catch (error) {
      alert("Ocorreu um erro ao obter o endereço.");
    } finally {
      setLoading(false);
    }
  }

  function handleDeleteAddress(id: string) {
    setAddresses(addresses.filter((address) => address.id !== id));
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      <div className="flex flex-col items-center py-10">
        <h1 className="text-4xl font-semibold text-blue-800 mb-8">
          Consulta de Endereço por CEP
        </h1>

        <div className="flex flex-col gap-4 bg-white p-6 rounded-lg shadow-md w-full max-w-md">
          <label className="text-sm text-gray-600">Selecione o país</label>
          <select
            value={countryCode}
            onChange={(e) => setCountryCode(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            <option value="br">Brasil</option>
            <option value="us">Estados Unidos</option>
          </select>

          <label className="text-sm text-gray-600">Digite o CEP</label>
          <input
            value={textValue}
            onChange={(e) => setTextValue(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="Ex: 01001-000"
          />

          <button
            onClick={handleGetAddress}
            disabled={!textValue}
            className={`w-full py-3 mt-3 rounded-lg text-white font-medium ${
              loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            } flex items-center justify-center gap-2`}
          >
            {loading ? <div className="spinner" /> : "Obter endereço"}
          </button>
        </div>

        <div className="mt-10 w-full max-w-3xl">
          <table className="table-auto w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-blue-600 text-white text-left">
              <tr>
                <th className="px-4 py-3">Logradouro</th>
                <th className="px-4 py-3">Bairro</th>
                <th className="px-4 py-3">Cidade</th>
                <th className="px-4 py-3">UF</th>
                <th className="px-4 py-3">CEP</th>
                <th className="px-4 py-3">Consultado em</th>
                <th className="px-4 py-3">Ações</th>
              </tr>
            </thead>
            <tbody>
              {addresses.map((address) => (
                <tr key={address.id} className="border-b hover:bg-gray-100">
                  <td className="px-4 py-3">{address.logradouro}</td>
                  <td className="px-4 py-3">{address.bairro}</td>
                  <td className="px-4 py-3">{address.localidade}</td>
                  <td className="px-4 py-3">{address.uf}</td>
                  <td className="px-4 py-3">{address.cep}</td>
                  <td className="px-4 py-3 text-sm text-gray-500">
                    {formatDate(address.consultedAt)}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => handleDeleteAddress(address.id)}
                      className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      <MdOutlineDelete size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <style jsx>{`
        .spinner {
          border: 4px solid rgba(255, 255, 255, 0.3);
          border-left-color: #ffffff;
          border-radius: 50%;
          width: 20px;
          height: 20px;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
