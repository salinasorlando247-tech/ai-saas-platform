import axios from 'axios';

export async function runVideoModel({ inputUrl }) {
  const response = await axios.post(
    process.env.RUNPOD_ENDPOINT,
    {
      input: {
        video: inputUrl,
        task: 'enhance-edit',
      },
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.RUNPOD_API_KEY}`,
      },
    }
  );

  return response.data;
}
