import { useState } from 'react';
import { uploadFootage } from '../api.js';

export default function UploadForm({ client }) {
  const [file, setFile] = useState(null);
  const [industry, setIndustry] = useState('');
  const [topic, setTopic] = useState('');
  const [result, setResult] = useState(null);

  const handleUpload = async () => {
    if (!file) return alert('Please select a file');
    const res = await uploadFootage(file, industry, topic, client);
    setResult(res);
  };

  return (
    <div className="p-4 border rounded shadow-md mb-4">
      <h2 className="font-bold mb-2">Upload Raw Footage</h2>
      <input
        placeholder="Industry"
        className="border p-1 mr-2 mb-2"
        value={industry}
        onChange={(e) => setIndustry(e.target.value)}
      />
      <input
        placeholder="Topic"
        className="border p-1 mr-2 mb-2"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
      />
      <input type="file" onChange={(e) => setFile(e.target.files[0])} className="mb-2" />
      <button className="bg-green-500 text-white px-3 py-1 rounded" onClick={handleUpload}>
        Upload & Process
      </button>

      {result && <pre className="mt-4 bg-gray-100 p-2 rounded">{JSON.stringify(result, null, 2)}</pre>}
    </div>
  );
}
