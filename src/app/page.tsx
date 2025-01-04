import BlogCard from "@/components/BlogCard";
import { client } from "@/sanity/lib/client";

export const revalidate = 60; // seconds to revalidate the page data

// Define Post type
export interface Post {
  title: string;
  slug: string;
  summary: string;
  image: {
    _type: "image";
    asset: {
      _ref: string;
      _type: "reference";
    };
  }; 
  content: string;
  author: {
    _ref: string;
    _type: "reference";
  }; 
}

export default async function Home() {
  const query = `*[_type=="post"] | order(_createdAt asc) {
    title,
    "slug": slug.current,
    summary,
    image,
    author
  }`;

  const posts: Post[] = await client.fetch(query); // Use Post[] type here

  return (
    <>
    <main className="container px-3 mx-auto flex min-h-screen flex-col">
      <h1 className="text-2xl font-bold uppercase my-12 text-center text-dark dark:text-light sm:text-3xl lg:text-5xl">
        Most Recent Blogs
      </h1>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {posts.map((post) => (
          <BlogCard post={post} key={post.slug} />
        ))}
      </section>
    </main>
    </>
  );
}
