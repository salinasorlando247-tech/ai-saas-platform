const allPlatforms = [
  'tiktok','instagram','youtube','twitter','linkedin','pinterest',
  'snapchat','reddit','discord','twitch','vimeo','dailymotion',
  'onlyfans','telegram','whatsapp','wechat','qq','kakao','tiktok-business','meta-suite'
];

export default function PlatformPostForm({ jobId }) {
  const [caption,setCaption] = useState('');
  const [platforms,setPlatforms] = useState([]);

  const handleSubmit = async () => {
    const videoRes = await api.get(`/video/status/${jobId}`);
    await api.post('/platform/post', { 
      videoPath: videoRes.data.finalVideo,
      caption,
      platforms,
      token: JSON.parse(localStorage.getItem('platformTokens'))
    });
    alert('Posted to selected platforms!');
  };

  return (
    <div className="p-4 border rounded">
      <textarea placeholder="Caption" value={caption} onChange={e=>setCaption(e.target.value)} />
      <div className="grid grid-cols-3 gap-2 mt-2">
        {allPlatforms.map(p => (
          <label key={p} className="flex items-center">
            <input type="checkbox" value={p} onChange={e => {
              if(e.target.checked) setPlatforms([...platforms,p]);
              else setPlatforms(platforms.filter(x=>x!==p));
            }} className="mr-1"/>
            {p}
          </label>
        ))}
      </div>
      <button onClick={handleSubmit} className="bg-purple-500 text-white px-4 py-2 mt-2 rounded">Post</button>
    </div>
  );
}
