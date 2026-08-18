const getApiBaseUrl = () => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;

  if (typeof codespaceName === 'string' && codespaceName.trim() !== '') {
    return `https://${codespaceName.trim()}-8000.app.github.dev`;
  }

  return 'http://localhost:8000';
};

const normalizeApiResponse = (payload) => {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (payload && Array.isArray(payload.data)) {
    return payload.data;
  }

  if (payload && Array.isArray(payload.results)) {
    return payload.results;
  }

  if (payload && Array.isArray(payload.items)) {
    return payload.items;
  }

  if (payload && Array.isArray(payload.docs)) {
    return payload.docs;
  }

  return [];
};

export { getApiBaseUrl, normalizeApiResponse };
