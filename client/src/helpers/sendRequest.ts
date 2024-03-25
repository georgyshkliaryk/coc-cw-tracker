const defaultHeaders = {
  accept: 'application/json',
};

const sendRequest = async (
  url: string,
  method = 'GET',
  body?: BodyInit,
  headers?: HeadersInit
): Promise<unknown> => {
  const options = {
    method,
    headers: {
      ...defaultHeaders,
      ...headers,
    },
    body,
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      const err = new Error('HTTP status code: ' + response.status);
      throw err;
    }
    const json = await response.json();
    return json;
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : 'Unknown error.';
    throw Error(message);
  }
};

export default sendRequest;
