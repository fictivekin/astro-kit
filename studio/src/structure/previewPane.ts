import {StructureBuilder, type DefaultDocumentNodeResolver} from 'sanity/structure'
import {Iframe} from 'sanity-plugin-iframe-pane'

// URL for preview functionality, defaults to localhost:3000 if not set
const previewUrl = process.env.SANITY_STUDIO_PREVIEW_URL || 'http://localhost:3000'
const previewSecret = process.env.SANITY_STUDIO_PREVIEW_SECRET || ''
const previewableTypes = ['page', 'post', 'simplePage']

// This function will receive the Sanity "document" (read: page, post, etc.)
// the editor is currently working on. We need to generate
// a preview URL from that to display in the iframe pane.
const getPreviewUrl = (doc: any) => {
  if (!doc) {
    return
  }

  // Get the slug - handle special cases for homepage and 404
  let slug = ''
  if (doc._id == 'homepage' || doc._id == 'drafts.homepage') {
    slug = 'homepage'
  } else if (doc._id == 'notFoundPage' || doc._id == 'drafts.notFoundPage') {
    slug = '404'
  } else if (doc.slug?.current) {
    slug = doc.slug.current
  } else {
    return // No slug available
  }

  // Only generate preview URL for previewable types
  if (!previewableTypes.includes(doc._type)) {
    return
  }

  // Build preview URL with secret, slug, and type
  const params = new URLSearchParams({
    secret: previewSecret,
    slug: slug,
    type: doc._type,
  })

  return `${previewUrl}/preview/preview?${params.toString()}`
}

export const viewConfiguration = (S: StructureBuilder, type: string, documentId: string) => {
  return S.document()
    .schemaType(type)
    .documentId(documentId)
    .views([S.view.form(), previewConfiguration(S)])
}

export const previewConfiguration = (S: StructureBuilder) => {
  return S.view
    .component(Iframe)
    .options({
      url: getPreviewUrl,
      reload: {button: true},
    })
    .title('Preview')
}

// This part is the configuration for the Sanity Document Admin View.
// We enable the iFrame plugin here for certain document types
export const showPreviewPane: DefaultDocumentNodeResolver = (S, {schemaType}) => {
  if (previewableTypes.includes(schemaType)) {
    return S.document().views([S.view.form(), previewConfiguration(S)])
  } else {
    console.log(`Preview not configured for schemaType: ${schemaType}`)
  }
  return S.document().views([S.view.form()])
}
