import { useState } from "react";
import { Upload } from "react-feather"; // Se estiver usando o ícone de upload
import { Accept, useDropzone } from "react-dropzone"; // Se você decidir usar o react-dropzone

export default function FotoUpload() {
  const [files, setFiles] = useState<File[]>([]);
  const fileAccept: Accept = {
    "image/*": [], // Aceitar todos os tipos de imagem
  };
  // Função de callback do react-dropzone
  const onDrop = (acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: fileAccept, // Aceitar apenas imagens
    multiple: true, // Permitir múltiplos uploads
  });

  return (
    <div className="bg-gray-300 p-3 rounded-md flex items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        {/* <label className="block text-gray-700 font-semibold">
          Upload de fotos do seu quarto
        </label> */}
      </div>
      <div
        {...getRootProps()}
        className="cursor-pointer flex items-center gap-2"
      >
        <input {...getInputProps()} />
        <Upload size={24} />
        <span className="text-gray-700">Clique para selecionar as fotos</span>
      </div>

      {/* Exibir as imagens carregadas */}
      <div className="mt-2">
        {files.length > 0 && (
          <div className="grid grid-cols-3 gap-2">
            {files.map((file, index) => (
              <div key={index} className="relative">
                <img
                  src={URL.createObjectURL(file)}
                  alt={`imagem-${index}`}
                  className="w-20 h-20 object-cover rounded-md"
                />
                <button
                  onClick={() => setFiles(files.filter((_, i) => i !== index))}
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                >
                  X
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
