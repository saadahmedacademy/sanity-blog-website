import { defineType,defineField, defineArrayMember } from 'sanity';

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
    ]
});