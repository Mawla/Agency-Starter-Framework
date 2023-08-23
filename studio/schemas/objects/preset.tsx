import Preset, { PresetWrapper } from "../../components/Presets/Preset";
import { defineField } from "sanity";

export const schema = defineField({
  name: "preset",
  title: "Preset",
  type: "reference",
  weak: true,
  to: [{ type: "preset.blocks" }],
  components: {
    field: PresetWrapper,
    input: Preset,
  },
  group: "tools",
  options: {
    updateField: "blocks",
  } as any,
});

export default schema;
