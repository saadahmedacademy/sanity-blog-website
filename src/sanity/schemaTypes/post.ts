import { defineType,defineField, defineArrayMember } from 'sanity';

export const postSchema = defineType({
  title: 'Post Document',
  name: 'post',
  type: 'document',
  fields: [
   defineField({
      title: 'Post Title',
      name: 'title',
      type: 'string',
      description: 'Title of the post',
      validation: (Rule) => Rule.required().min(10).max(80).error('Title should be between 10 to 80 characters'),
    }),
    defineField({
      title: 'Post Slug',
      name: 'slug',
      type: 'slug',
      description: 'Slug of the post',
      validation: (Rule) => Rule.required().error('Slug is required'),
      options: {
        source: 'title',
      },
    }),
    defineField({
      title: 'Post Summary',
      name: 'summary',
      type: 'text',
      validation: (Rule) => Rule.required().error('Summary is required'),
    }),
    defineField({
      title: 'Post image',
      name: 'image',
      type: 'image',
      validation: (Rule) => Rule.required().error('Image is required'),
    }),
    defineField({
      title: 'Post Content',
      name: 'content',
      type: 'array',
      of: [defineArrayMember({ type: 'block' })],
      validation: (Rule) => Rule.required().error('Content is required'),
    }),
    defineField({
      title: 'Post Author',
      name: 'author',
      type: 'reference',
      to: [{ type: 'author' }],
      validation: (Rule) => Rule.required().error('Author is required'),
    })
  ],
});
