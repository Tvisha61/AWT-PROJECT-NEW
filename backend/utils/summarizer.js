// function summarizeText(text, sentenceLimit = 3) {
//     if (!text) return "No content to summarize.";

//     // ✅ Split text into sentences
//     let sentences = text.match(/[^.!?]+[.!?]/g) || [text];

//     // ✅ Count word frequency
//     let wordCounts = {};
//     let words = text.toLowerCase().split(/\W+/);
//     words.forEach(word => {
//         if (word.length > 3) wordCounts[word] = (wordCounts[word] || 0) + 1;
//     });

//     // ✅ Score sentences based on word importance
//     let sentenceScores = sentences.map(sentence => {
//         let score = 0;
//         sentence.toLowerCase().split(/\W+/).forEach(word => {
//             score += wordCounts[word] || 0;
//         });
//         return { sentence, score };
//     });

//     // ✅ Sort sentences by score (most important first)
//     sentenceScores.sort((a, b) => b.score - a.score);

//     // ✅ Select top sentences for summary
//     let summary = sentenceScores.slice(0, sentenceLimit).map(s => s.sentence).join(" ");

//     return summary || "Could not generate a summary.";
// }

// module.exports = summarizeText;





// function summarizeText(text, sentenceLimit = 3) {
//     if (!text) return "No content to summarize.";

//     let sentences = text.match(/[^.!?]+[.!?]/g) || [text];

//     let wordCounts = {};
//     let words = text.toLowerCase().split(/\W+/);
//     words.forEach(word => {
//         if (word.length > 3) wordCounts[word] = (wordCounts[word] || 0) + 1;
//     });

//     let sentenceScores = sentences.map(sentence => {
//         let score = 0;
//         sentence.toLowerCase().split(/\W+/).forEach(word => {
//             score += wordCounts[word] || 0;
//         });
//         return { sentence, score };
//     });

//     sentenceScores.sort((a, b) => b.score - a.score);

//     let summary = sentenceScores.slice(0, sentenceLimit).map(s => s.sentence).join(" ");
//     return summary || "Could not generate a summary.";
// }

// function extractKeywords(text, maxKeywords = 5) {
//     if (!text) return [];

//     let wordCounts = {};
//     let words = text.toLowerCase().split(/\W+/);
//     words.forEach(word => {
//         if (word.length > 3) wordCounts[word] = (wordCounts[word] || 0) + 1;
//     });

//     return Object.entries(wordCounts)
//         .sort((a, b) => b[1] - a[1])
//         .slice(0, maxKeywords)
//         .map(entry => entry[0]);
// }

// module.exports = { summarizeText, extractKeywords };




function summarizeText(text, sentenceLimit = 3) {
  if (!text) return "No content to summarize.";

  const sentences = text.match(/[^.!?]+[.!?]/g) || [text];
  const wordCounts = {};

  const words = text.toLowerCase().split(/\W+/);
  words.forEach(word => {
    if (word.length > 3) wordCounts[word] = (wordCounts[word] || 0) + 1;
  });

  const sentenceScores = sentences.map(sentence => {
    let score = 0;
    sentence.toLowerCase().split(/\W+/).forEach(word => {
      score += wordCounts[word] || 0;
    });
    return { sentence, score };
  });

  sentenceScores.sort((a, b) => b.score - a.score);
  const summary = sentenceScores.slice(0, sentenceLimit).map(s => s.sentence).join(" ");
  return summary || "Could not generate a summary.";
}

function extractKeywords(text, maxKeywords = 5) {
  if (!text) return [];

  const wordCounts = {};
  const words = text.toLowerCase().split(/\W+/);
  words.forEach(word => {
    if (word.length > 3) wordCounts[word] = (wordCounts[word] || 0) + 1;
  });

  return Object.entries(wordCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, maxKeywords)
    .map(entry => entry[0]);
}

module.exports = { summarizeText, extractKeywords };
