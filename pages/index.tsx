// pages/index.js
import Link from "next/link";
import { client } from "../libs/client";
import { GetStaticProps } from "next";
import type { Article } from "../types/article";

type Props = {
  articles: Array<Article>;
};

export default function Home({ blog }: Props) {
  return (
    <>
      <h1 className="container mx-auto px-10 pt-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3">
        記事一覧
      </h1>
      <div className="container mx-auto p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5 cursor-pointer">
        {blog.map((article) => (
          <div className="rounded overflow-hidden shadow-lg" key={article.id}>
            <Link href={`/blog/${article.id}`}>
              <div>
                <img
                  className="w-full"
                  src={article.thumbnail.url}
                  alt="Sunset in the mountains"
                />
                <div className="px-6 py-4">{article.title}</div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps: GetStaticProps = async () => {
  const data = await client.get({ endpoint: "blog" });

  return {
    props: {
      blog: data.contents,
    },
  };
};
