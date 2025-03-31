export default async function api(
  endpoint: string,
  options?: {
    params?: Record<string, any>; // Parâmetros de query (query string)
    body?: BodyInit; // Corpo da requisição
    token?: string; // Token de autenticação
    method?: "GET" | "POST" | "PUT" | "DELETE" | string; // Método HTTP (GET, POST, PUT, DELETE, etc.)
  }
) {
  // Remover o "/" inicial do endpoint, se existir
  const sanitizeEndpoint = endpoint.startsWith("/")
    ? endpoint.slice(1)
    : endpoint;

  // Construir URL com parâmetros de query, se fornecidos
  const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/${sanitizeEndpoint}`);
  if (options?.params) {
    Object.entries(options.params).forEach(([key, value]) =>
      url.searchParams.append(key, String(value))
    );
  }

  // Montar headers
  const headers: HeadersInit = {
    "Content-Type": "application/json", // Default para JSON
  };
  if (options?.token) {
    headers["Authorization"] = `Bearer ${options.token}`; // Adicionar token, se fornecido
  }

  // Configuração da requisição
  const fetchOptions: RequestInit = {
    method: options?.method || "GET", // Método padrão é GET
    headers,
    body: options?.body, // Corpo da requisição (usado em POST, PUT, etc.)
  };

  // Fazer a requisição e tratar erros
  try {
    const response = await fetch(url.toString(), fetchOptions);

    // Verificar se a resposta foi bem-sucedida
    if (!response.ok) {
      throw new Error(`Erro: ${response.status} - ${response.statusText}`);
    }

    // Retornar a resposta JSON
    return await response.json();
  } catch (error) {
    console.error("Erro na API:", error);
    throw error; // Repassa o erro para o chamador
  }
}
