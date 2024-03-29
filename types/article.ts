export type Article = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  title: string;
  body: string;
  thumbnail: {
    url: string;
    height: number;
    width: number;
  };
};
