export default async function fetcher(url: string, data?: unknown) {
  const options = {
    method: data ? 'POST' : 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };

  // @ts-ignore
  const res = await fetch(`${window.location.origin}/api${url}`, options);

  if (res.status > 399 && res.status < 200) {
    throw new Error();
  }

  const jsonData = await res.json();
  return jsonData;
}
