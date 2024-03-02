// api/movies.ts
import type { NextApiRequest, NextApiResponse } from 'next';
export {};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { query, page, type } = req.query;

  const apiKey = 'b3e9b3df';
  let url = `http://www.omdbapi.com/?apikey=${apiKey}&s=${query}&page=${page}&per_page=10`;

  if (type) {
    url += `&type=${type}`;
  }

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
