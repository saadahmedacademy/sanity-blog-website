import { type SchemaTypeDefinition } from 'sanity'
import { postSchema } from './post'
import { authorSchema } from './author'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [postSchema,authorSchema],
}
