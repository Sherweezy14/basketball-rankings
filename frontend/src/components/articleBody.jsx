import { Link } from "react-router-dom";

function ArticleBody({ article }) {
  const players = article.Players || [];
  const articleWords = article.body.split(/(\s+)/);

  return (
    <div className="whitespace-pre-wrap text-lg leading-8 text-slate-700">
      {articleWords.map((word, index) => {
        if (word[0] === "@") {
          const slug = word.slice(1).replace(/[.,!?;:]/g, "");
          const player = players.find((p) => p.Slug === slug);

          if (!player) {
            return <span key={index}>{word}</span>;
          }

          const link = `/player/${player._id}/${player.Slug}`;

          return (
            <Link
              key={index}
              className="text-purple-700 font-bold hover:underline"
              to={link}
            >
              @{player.Name}
            </Link>
          );
        }

        return <span key={index}>{word}</span>;
      })}
    </div>
  );
}

export default ArticleBody;