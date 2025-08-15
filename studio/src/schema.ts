import * as schemaTypes from './schemaTypes';
import {type SchemaTypeDefinition} from 'sanity'

export const schema: {types: SchemaTypeDefinition[]} = {
  types: Object.values(schemaTypes),
}
