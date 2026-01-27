import React from "react";

const PostingScheduler = () => {
  const handleClick = () => {
    alert("Posting Scheduler clicked!");
    // connect to backend API for scheduling here
  };

  return <button onClick={handleClick}>Schedule Post</button>;
};

export default PostingScheduler;
