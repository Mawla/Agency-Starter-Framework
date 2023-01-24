import Preset, { PresetWrapper } from "../../components/Presets/Preset";
import { defineField } from "sanity";

export const schema = defineField({
  name: "preset",
  title: "Preset",
  type: "reference",
  weak: true,
  to: [{ type: "page.preset" }],
  components: {
    field: PresetWrapper,
    input: Preset,
  },
  group: "tools",
  options: {
    updateField: "modules",
  } as any,
});

export default schema;
