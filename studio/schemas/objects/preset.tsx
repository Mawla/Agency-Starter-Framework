import Preset, {PresetWrapper} from '../../components/Presets/Preset'

export const schema = {
  name: 'preset',
  title: 'Preset',
  type: 'reference',
  weak: true,
  to: [{type: 'page.preset'}],
  components: {
    field: PresetWrapper,
    input: Preset,
  },
  group: 'tools',
  options: {
    updateField: 'modules',
  },
}

export default schema
