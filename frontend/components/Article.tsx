import React, { FC } from "react";

type ArticleProps = {
  text: string;
};

const Article: FC<ArticleProps> = ({ text }) => {
  return (
    <div>
      <p>{text}</p>
    </div>
  );
};

export default Article;
