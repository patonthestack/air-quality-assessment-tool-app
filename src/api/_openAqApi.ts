import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  name: string;
};

export default function handler(
  req?: NextApiRequest,
  res?: NextApiResponse<Data>,
) {
  res ? res.status(200).json({ name: 'John Doe' }) : '';
}

const getMeasurementsByCity = async () => {
  const res = await fetch(
    'https://api.openaq.org/v2/latest?limit=1&page=1&offset=0&sort=desc&radius=1000&city=Springfield&order_by=lastUpdated&dumpRaw=false',
  );
  const jsonData = await res.json();
  return jsonData;
};
