import {ComponentType} from 'react'

import {languages} from '../../languages'
import {useLanguageFilter} from '../utils/language/useLanguageFilter'

export const ArrayWithLanguageFilter: ComponentType<any> = (props) => {
  const {renderItem, renderDefault} = props

  const selectedLanguages = useLanguageFilter()

  return renderDefault({
    ...props,
    renderItem: (item: any) => {
      // If no language is selected, show all items with no language set
      if (selectedLanguages.length === 0) {
        if (!item.value.language || !item.value.language?.trim().length) {
          return renderItem(item)
        }
      }

      // If all languages are selected, show all items
      if (selectedLanguages.length === languages.length) {
        return renderItem(item)
      }

      // If the item has a language and it is selected, show the item
      if (selectedLanguages.includes(item.value.language)) {
        return renderItem(item)
      }

      return null
    },
  })
}
