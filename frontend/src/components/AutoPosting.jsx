import axios from "axios";

export default function AutoPosting() {

  const autoPost = async () => {

    const res = await axios.post(
      "http://localhost:5000/api/scheduling/auto",
      {
        content: {
          caption: "AI Generated Viral Post",
          videoId: "latest"
        }
      }
    );

    console.log(res.data);
    alert("Auto Posted");
  };

  return (
    <div>
      <h2>Auto Posting Engine</h2>
      <button onClick={autoPost}>Launch Campaign</button>
    </div>
  );
}
