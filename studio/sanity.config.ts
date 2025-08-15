import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {structure} from './src/structure'

import {visionTool} from '@sanity/vision'
import {schema} from './src/schema'

export default defineConfig({
  name: 'default',
  title: 'Sanity MVP Test',

  projectId: '09ojk07u',
  dataset: 'production',

  plugins: [structureTool({
    structure
  }), visionTool()],

  schema: {
    types: schema.types,
  },
})
