import {bannerFields} from '../shared/bannerFields'
import {sectionIdentifierFieldset} from '../shared/sectionIdentifier'
import {defineType} from 'sanity'
import {TiersIcon} from '@sanity/icons'
import {modulePreview} from '../shared/preview'

const SCHEMA_TITLE = 'Banner'

export const banner = defineType({
    title: SCHEMA_TITLE,
    name: 'banner',
    type: 'document',
    icon: TiersIcon,
    description: 'This banner is scoped to the current page.',
    fields: bannerFields(),
    fieldsets: [...sectionIdentifierFieldset, {name: 'options'}],
    preview: modulePreview(SCHEMA_TITLE)
})
