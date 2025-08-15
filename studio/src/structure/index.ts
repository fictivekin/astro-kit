import {
  BookIcon,
  CaseIcon,
  CogIcon,
  TagIcon,
  DocumentTextIcon,
  EarthGlobeIcon,
  HomeIcon,
  LinkIcon,
  MenuIcon,
  RedoIcon,
  UsersIcon,
  WarningOutlineIcon,
} from '@sanity/icons'
import type {StructureBuilder, StructureResolver} from 'sanity/structure'

/**
 * Structure builder is useful whenever you want to control how documents are grouped and
 * listed in the studio or for adding additional in-studio previews or content to documents.
 * Learn more: https://www.sanity.io/docs/structure-builder-introduction
 */

export const structure: StructureResolver = (S: StructureBuilder) =>
  S.list()
    .title('Website Content')
    .items([
      // Settings Singleton in order to view/edit the one particular document for Settings.  Learn more about Singletons: https://www.sanity.io/docs/create-a-link-to-a-single-edit-page-in-your-main-document-type-list
      S.listItem()
        .title('Site Settings')
        .icon(CogIcon)
        .child(
          S.list()
            .title('Settings Documents')
            .items([
              S.listItem()
                .title('Site Settings')
                .icon(EarthGlobeIcon)
                .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
              S.listItem()
                .title('Main Navigation')
                .icon(MenuIcon)
                .child(S.document().schemaType('mainNavigation').documentId('mainNavigation')),
              S.listItem()
                .title('Footer Navigation')
                .icon(MenuIcon)
                .child(S.document().schemaType('footerNavigation').documentId('footerNavigation')),
              S.listItem()
                .title('Resource Settings')
                .icon(TagIcon)
                .child(
                  S.list()
                    .title('Resource Settings')
                    .items([
                      S.listItem()
                        .title('Settings')
                        .icon(CogIcon)
                        .child(
                          S.document()
                            .schemaType('resourceSettings')
                            .documentId('resourceSettings'),
                        ),
                      S.listItem()
                        .title('Formats')
                        .icon(DocumentTextIcon)
                        .child(
                          S.documentTypeList('format')
                            .title('Formats')
                            .defaultOrdering([{field: 'title', direction: 'asc'}]),
                        ),
                      S.listItem()
                        .title('Topics')
                        .icon(DocumentTextIcon)
                        .child(
                          S.documentTypeList('topic')
                            .title('Topics')
                            .defaultOrdering([{field: 'title', direction: 'asc'}]),
                        ),
                    ]),
                ),
              // 404 Singleton
              S.listItem()
                .title('404 Page')
                .icon(WarningOutlineIcon)
                .child(S.document().schemaType('page').documentId('notFoundPage')),
              S.listItem()
                .title('Redirects')
                .icon(RedoIcon)
                .child(
                  S.documentTypeList('redirect')
                    .title('Redirects')
                    .defaultOrdering([{field: 'source', direction: 'asc'}]),
                ),
            ]),
        ),
      S.divider(),
      // Homepage Singleton
      S.listItem()
        .title('Home')
        .icon(HomeIcon)
        .child(S.document().schemaType('page').documentId('homepage')),
      S.listItem()
        .title('Pages')
        .icon(BookIcon)
        .child(
          S.documentTypeList('page')
            .title('Pages')
            .filter('_type == "page" && _id != "homepage" && _id != "notFoundPage"')
            .defaultOrdering([{field: 'title', direction: 'asc'}]),
        ),
      S.listItem()
        .title('Simple Pages')
        .icon(CaseIcon)
        .child(
          S.documentTypeList('simplePage')
            .title('Simple Pages')
            .filter('_type == "simplePage"')
            .defaultOrdering([{field: 'title', direction: 'asc'}]),
        ),
      S.divider(),
      S.listItem()
        .title('Posts')
        .icon(DocumentTextIcon)
        .child(S.documentTypeList('post').title('Posts')),
      S.divider(),
      S.listItem()
        .title('People')
        .icon(UsersIcon)
        .child(S.documentTypeList('people').title('People')),
      S.divider(),
      S.listItem()
        .title('Linked Sections')
        .icon(LinkIcon)
        .child(
          S.documentList()
            .title('Linked Sections')
            .filter('_type in ["accordion", "banner", "carousel", "ctaBanner", "divider", "feature", "featureStack", "headline", "hubspotForm", "hero", "secondaryHero", "list", "logoCloud", "multicard", "postList", "quote", "team", "testimonials", "textBlock", "video"] && count(*[references(^._id)]) > 0')
            .defaultOrdering([{field: '_type', direction: 'asc'}]),
        ),

      // ...S.documentTypeListItems()
      //   // Remove the "assist.instruction.context" and "settings" content  from the list of content types
      //   .filter((listItem: any) => !DISABLED_TYPES.includes(listItem.getId()))
      //   // Pluralize the title of each document type.  This is not required but just an option to consider.
      //   .map((listItem) => {
      //     return listItem.title(pluralize(listItem.getTitle() as string))
      //   }),
    ])
