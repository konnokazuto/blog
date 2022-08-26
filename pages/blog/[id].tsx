// pages/blog/[id].js
import { client } from "../../libs/client";
import { GetStaticPropsContext, InferGetStaticPropsType, NextPage } from "next";
export type Blog = {
  id: string;
  title: string;
  body: string;
  thumbnail: Thumbnail;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
};
export type Thumbnail = {
  url: string;
  height: number;
  width: number;
};
export type Props = InferGetStaticPropsType<typeof getStaticProps>;
export default function BlogId({ blog }: Props) {
  return (
    <main>
      <h1>{blog.title}</h1>
      <p>{blog.publishedAt}</p>
      <div
        dangerouslySetInnerHTML={{
          __html: `${blog.body}`,
        }}
      />
    </main>
  );
}

// 静的生成のためのパスを指定します
export const getStaticPaths = async () => {
  const data = await client.get({ endpoint: "blog" });

  const paths = data.contents.map((content: Blog) => `/blog/${content.id}`);
  return { paths, fallback: false };
};

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async (context) => {
  const id = context.params.id;
  const data = await client.get({ endpoint: "blog", contentId: id });
  return {
    props: {
      blog: data,
    },
  };
};
