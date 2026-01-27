// contentRouter.js

import { generatePost } from "./Backend/AiEngine.js";
import { editPost } from "./Backend/editor.js";

export async function processContent({
  contentSource,
  industry,
  topic,
  rawContent,
  platform
}) {
  let baseContent;

  if (contentSource === "creator") {
    baseContent = rawContent;
  } else {
    const aiResult = await generatePost(industry, topic);
    baseContent = aiResult.content || aiResult;
  }

  const refined = await editPost(
    baseContent,
    industry,
    platform,
    contentSource
  );

  return {
    finalContent: refined,
    source: contentSource
  };
}
