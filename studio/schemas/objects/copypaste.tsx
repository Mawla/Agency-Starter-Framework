import { defineField } from 'sanity'
import CopyPaste from '../../components/CopyPaste/CopyPaste'

export const schema = defineField({
  name: 'copyPaste',
  title: 'Copy Paste',
  type: 'string',
  components: {
    field: CopyPaste,
  },
  group: 'tools',
})

export default schema
