import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {structure} from './src/structure'
import {showPreviewPane} from './src/structure/previewPane'

import {visionTool} from '@sanity/vision'
import {schema} from './src/schema'

export default defineConfig({
  name: 'default',
  title: 'Sanity MVP Test',

  projectId: process.env.SANITY_STUDIO_PROJECT_ID!,
  dataset: 'production',

  plugins: [
    structureTool({
      structure,
      defaultDocumentNode: showPreviewPane, // This is for the preview tab that shows on various content types
    }),
    visionTool(),
  ],

  schema: {
    types: schema.types,
  },
})
