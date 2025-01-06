import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { PortableText } from "@portabletext/react";
import { components } from "@/components/CustomComponent";

export const revalidate = 60; // Revalidation time in seconds


// Generate static params for dynamic routes
export async function generateStaticParams() {
  const query = `*[_type=='post']{
    "slug":slug.current
  }`;
  const slugs = await client.fetch(query);
  return slugs.map((item: { slug: string }) => ({
     slug: item.slug 
  }));
}

// Dynamic page for each blog post
export default async function Page( { params } : { params : { slug : string } }) {
const { slug } = params
  const query = `*[_type=='post' && slug.current=="${slug}"]{
    title, summary, image, content,
    author->{bio, image, name}
  }[0]`;

  const post = await client.fetch(query);

  if (!post) {
    return <p>Post not found</p>; // Handle missing post
  }

  return (
    <article className="container mx-auto mt-12 mb-24 px-2 2xl:px-12 flex flex-col gap-y-8">
      <h1 className="text-xl xs:text-3xl lg:text-5xl font-bold text-center text-dark dark:text-light">
        {post.title}
      </h1>

      <Image
        src={`${urlFor(post.image)}`}
        width={600}
        height={100}
        alt={post.title}
        className="w-[90%] rounded mx-auto"
      />

      <section>
        <h2 className="text-xl xs:text-2xl md:text-3xl font-bold uppercase text-accentDarkPrimary">
          Summary
        </h2>
        <p className="text-base md:text-xl leading-relaxed text-justify text-dark/80 dark:text-light/80">
          {post.summary}
        </p>
      </section>

      <section
        className="text-lg leading-normal text-dark/80 dark:text-light/80
      prose-h4:text-accentDarkPrimary prose-h4:text-3xl prose-h4:font-bold
      prose-li:list-disc prose-li:list-inside prose-li:marker:text-accentDarkSecondary
      prose-strong:text-dark dark:prose-strong:text-white"
      >
        <PortableText value={post.content} components={components} />
      </section>

      <section className="px-2 sm:px-8 md:px-12 flex gap-2 xs:gap-4 sm:gap-6 items-start xs:items-center justify-start">
        <Image
          src={`${urlFor(post.author.image)}`}
          width={200}
          height={200}
          alt="author"
          className="object-cover rounded-full h-12 w-12 sm:h-24 sm:w-24"
        />
        <div className="flex flex-col gap-1">
          <h3 className="text-xl font-bold text-dark dark:text-light">
            {post.author.name}
          </h3>
          <p className="italic text-xs xs:text-sm sm:text-base text-dark/80 dark:text-light/80">
            {post.author.bio}
          </p>
        </div>
      </section>
    </article>
  );
}
