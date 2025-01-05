 import { defineType,defineField } from 'sanity';


export const authorSchema = defineType({
    title: 'Author Document',
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
            }
        }),
        defineField({
            title: 'Password',
            name: 'password',
            type: 'string',
            description: 'Set the author’s password (hashing should be applied externally).',
            validation: (Rule) => Rule.required().min(8).error('Password must be at least 8 characters long.'),
          }),
        defineField({
            title: 'Author Email',
            name: 'email',
            type: 'string',
            description: 'Email of the author',
            validation: (Rule) => Rule.required().error('Author email is required'),
        }),
    ]
});