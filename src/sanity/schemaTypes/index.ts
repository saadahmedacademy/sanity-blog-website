import { type SchemaTypeDefinition } from 'sanity'
import { studentSchema } from '@/sanity/schemaTypes/studentSchma'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [studentSchema],
}
