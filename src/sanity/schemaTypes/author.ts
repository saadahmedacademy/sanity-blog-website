import { defineType, defineField } from 'sanity'
import { Rule } from '@sanity/types'
import { PasswordInput } from '@/components/PasswordInput'

export const authorSchema = defineType({
  title: 'Author',
  name: 'author',
  type: 'document',
  fields: [
    defineField({
      title: 'Author Name',
      name: 'name',
      type: 'string',
      description: 'Name of the author',
      validation: (Rule) => Rule.required().error('Author name is required'),
    }),
    defineField({
      title: 'Author Bio',
      name: 'bio',
      type: 'text',
      description: 'Bio of the author',
    }),
    defineField({
      title: 'Author Image',
      name: 'image',
      type: 'image',
      description: 'Image of the author',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      title: 'Password',
      name: 'hashedPassword',
      type: 'string',
      description: 'Set the author\'s password (will be hashed automatically).',
      components: {
        input: PasswordInput,
      },
      validation: (Rule) => Rule.required().error('Password is required'),
    }),
    defineField({
      title: 'Author Email',
      name: 'email',
      type: 'string',
      description: 'Email of the author',
      validation: (Rule) => Rule.required().error('Author email is required'),
    }),
  ],
})

