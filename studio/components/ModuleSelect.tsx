import { LanguageType, baseLanguage } from "../../languages";
import { ModuleSchemaName } from "../../types.sanity";
import { getCurrentLanguages } from "../utils/language/get-current-languages";
import { SearchIcon } from "@sanity/icons";
import {
  Badge,
  Autocomplete,
  Card,
  Text,
  Flex,
  Stack,
  Box,
  useToast,
} from "@sanity/ui";
import { nanoid } from "nanoid";
import React, { ComponentType, useCallback, useEffect, useState } from "react";
import { useClient, useFormValue, useSchema } from "sanity";

/**
 * Usage:
 * const [searchTerm, setSearchTerm] = useState("");
 * const debouncedSearchTerm = useDebounce(searchTerm, 500);
 */

export function useDebounce(value: any, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
}

type OptionType = {
  _type: ModuleSchemaName | "page.preset";
  schemaTitle: string;
  value: ModuleSchemaName | string;
  icon: React.ReactElement;
  label: string;
  description: string;
  hidden?: (pageType: string) => boolean;
  borderTop?: boolean;
  image?: string;
  initialValue?: {};
  modules?: any[];
};

export type ModuleSelectProps = {
  onChange?: () => void;
  document?: { _type: string; _id: string };
  schemaType: {
    options?: {
      filterType?: RegExp;
      updateField?: string;
      placeholder?: string;
    };
  };
};

const ModuleSelect: ComponentType<any> = (props: ModuleSelectProps) => {
  const { schemaType, onChange } = props;
  const document = useFormValue([]) as {
    _id?: string;
    _type: string;
    [key: string]: any;
  };

  const allSchemas = useSchema()._registry;

  const client = useClient({ apiVersion: "vX" });
  const toast = useToast();

  const draftId = document._id?.startsWith("drafts.")
    ? document._id
    : `drafts.${document._id}`;

  const [options, setOptions] = useState<OptionType[]>([]);
  const [state, setState] = useState<"default" | "loading">("default");
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const debouncedselectedValue = useDebounce(selectedValue, 100);

  const typeFilter: RegExp = schemaType?.options?.filterType || /.*/;
  const updateField: string = schemaType?.options?.updateField || "modules";

  /**
   * Get list of options:
   * - modules
   * - studio modules
   * - presets
   */

  useEffect(() => {
    async function getOptions() {
      /**
       * All module schemas filtered by type
       */

      const moduleTypes = Object.keys(allSchemas)
        .filter((type) =>
          typeFilter ? new RegExp(typeFilter).test(type) : true,
        )
        .filter((type) => !type.startsWith("studio."))
        .map((type) => allSchemas[type].get(type))
        .sort((a, b) => a.title?.localeCompare(b.title));

      /**
       * Studio modules
       */

      const studioTypes = Object.keys(allSchemas)
        .filter((type) => type.startsWith("studio."))
        .map((type) => allSchemas[type].get(type));

      /**
       * All presets filtered by type
       */

      let presets: {
        title?: string;
        _id?: string;
        _type?: "page.preset";
        name?: string;
        description?: string;
        modules?: any[];
        usedBy?: number;
        image?: string;
      }[] = await client.fetch(`
        *[_type == 'page.preset' && defined(modules) && !(_id in path("drafts.*"))] {
          title,
          _id,
          _type,
          "name": _id,
          description,
          "usedBy": count(*[references(^._id)]),
          "image": image.asset->url,
          modules[]
        } | order(usedBy desc)`);

      presets = presets
        .map((preset) => ({
          ...preset,
          modules: preset?.modules
            ?.map((module) => ({
              ...module,
              icon: allSchemas[module?._type]?.get()?.icon,
              hidden: allSchemas[module?._type]?.get()?.hidden,
            }))
            .filter(({ _type }) =>
              typeFilter ? new RegExp(typeFilter).test(_type) : true,
            ),
        }))
        .filter(({ modules }) => Boolean(modules?.length));

      /**
       * Make list of options
       */

      const options: (OptionType | null)[] = [
        ...moduleTypes,
        ...studioTypes,
        ...presets,
      ].map(
        ({
          _type,
          title,
          name,
          icon,
          description,
          initialValue,
          image,
          hidden,
          modules,
        }) => {
          // for the current page type (unless we're looking at presets) call the hide function on the option schema
          if (document._type !== "page.preset" && hidden?.(document._type)) {
            return null;
          }

          const obj: OptionType = {
            _type: _type || name,
            value: name,
            schemaTitle: allSchemas[_type || name]?.get()?.title,
            icon: icon?.(),
            label: title,
            description,
            initialValue,
            image,
            modules,
          };

          return obj;
        },
      );

      const filteredOptions: OptionType[] = options.filter(
        Boolean,
      ) as OptionType[];

      /**
       * Add divider to first studio module and preset
       */

      const firstStudioModuleIndex = filteredOptions.findIndex(({ _type }) =>
        _type.startsWith("studio."),
      );
      const firstPresetIndex = filteredOptions.findIndex(({ _type }) =>
        Boolean(_type == "page.preset"),
      );

      if (firstStudioModuleIndex > -1) {
        filteredOptions[firstStudioModuleIndex].borderTop = true;
      }
      if (firstPresetIndex > -1) {
        filteredOptions[firstPresetIndex].borderTop = true;
      }

      // remove hidden options
      setOptions(filteredOptions);
    }
    getOptions();
  }, [typeFilter, allSchemas]);

  /**
   * this onSelect seems to run multiple times, so we need to debounce it
   */

  function onSelect(value: string) {
    setState("loading");
    setSelectedValue(value);
  }

  /**
   * Save
   */

  useEffect(() => {
    async function patchModules() {
      if (!selectedValue) return setState("default");

      const selectedOption = options.find(
        ({ value }) => value === selectedValue,
      );
      if (!selectedOption) return;

      const selectedType: ModuleSchemaName | "page.preset" | undefined =
        selectedOption?._type;
      const presetId =
        selectedOption._type == "page.preset" ? selectedValue : null;

      if (!selectedType) return;

      let newModules: {
        _key?: string;
        _type: ModuleSchemaName;
        preset?: { _ref: string; _weak: boolean };
        language?: LanguageType;
      }[] = [];

      if (presetId) {
        newModules = (selectedOption?.modules || []).map((module) => ({
          _type: selectedType as ModuleSchemaName,
          ...module,
        }));
      } else {
        newModules = [
          {
            _type: selectedType as ModuleSchemaName,
            ...selectedOption?.initialValue,
          },
        ];
      }

      // want to have sanity generate fresh keys so removing them here
      function freshKeys(obj: { [key: string]: any }) {
        for (let prop in obj) {
          if (prop === "_key") obj[prop] = nanoid();
          else if (typeof obj[prop] === "object") freshKeys(obj[prop]);
        }
      }

      newModules = newModules.map((module) => {
        const moduleSchema = allSchemas[module._type]?.get();

        if (
          moduleSchema.fields.find(
            (field: { name: string }) => field.name === "language",
          )
        ) {
          module.language =
            getCurrentLanguages().length === 1
              ? (getCurrentLanguages()[0] as LanguageType)
              : baseLanguage;
        }

        freshKeys(module);
        module._key = nanoid();

        // add back link to preset
        if (presetId) {
          module.preset = { _ref: presetId, _weak: true };
        }

        return module;
      });

      try {
        /**
         * need to create a draft if it doesn't exist, otherwise changes would instantly be published
         * (if the state of the document is published)
         */

        const draftDoc = await client.createIfNotExists({
          ...document,
          _type: document._type,
          _id: draftId,
        });

        await client
          .patch(draftDoc._id)
          .setIfMissing({ [updateField]: [] })
          .insert("after", `${updateField}[-1]`, newModules)
          .commit({
            /**
             * setting this to true leads to a bug when other modules are duplicated
             * apparently they then have duplicated keys for things in lists or portable text and those are duplicated as well.
             * When auto generating new ones these are seen as bad values and this generates a message
             * like `Document \"drafts.page_homepage\" has duplicate array _key \"d6148fef5908\" at hero[0].text[0]._key and hero[1].text[0]._key`
             *
             * We can set the following to true if this test case passes:
             * - create a module with array items (e.g buttons)
             * - duplicate that module using the Sanity interface
             * - add a new module
             * - no error appears and the module is added successfully
             */
            autoGenerateArrayKeys: false,
          });

        // click the last item in the list to open the editor dialog
        if (newModules?.length === 1) {
          setTimeout(() => {
            const items = window.document.querySelectorAll(
              `[id="${updateField}"] [data-testid="default-preview"]`,
            ) as NodeList;
            const lastItem = items[items.length - 1] as HTMLElement;
            lastItem?.click();
          }, 0);
        }

        try {
          onChange?.();
        } catch (err) {
          console.error(err);
        }
      } catch (err) {
        console.error(err);
        toast.push({
          status: "error",
          title: `Something went wrong.`,
        });
      }

      setState("default");
      setSelectedValue(null);
    }

    patchModules();
  }, [debouncedselectedValue, updateField, onChange, allSchemas]);

  /**
   * Do fuzzy search based on title, description and more
   */

  const search = useCallback((query: string, option: OptionType) => {
    const fuzzyMatch = (pattern: string, str: string) => {
      if (!pattern || !str) return false;
      pattern = ".*" + pattern.split("").join(".*") + ".*";
      const re = new RegExp(pattern, "i");
      return re.test(str.trim());
    };
    return (
      fuzzyMatch(query, option.label) ||
      fuzzyMatch(query, option.description) ||
      fuzzyMatch(query, option.value) ||
      fuzzyMatch(query, option.schemaTitle) ||
      fuzzyMatch(query, option._type)
    );
  }, []);

  return (
    <Autocomplete
      id="moduleSelect"
      filterOption={search}
      fontSize={2}
      radius={0}
      icon={SearchIcon}
      openButton
      options={options}
      padding={3}
      placeholder="Type to search…"
      renderOption={(option: OptionType) => {
        return (
          <Card
            as="button"
            style={{
              borderTop: option.borderTop ? "1px solid lightgray" : "none",
            }}
          >
            <Flex align="center" padding={1} gap={2}>
              {option.image && (
                <Box>
                  <img
                    src={`${option.image}?w=100&h=75&q=75`}
                    alt=""
                    style={{
                      border: "1px solid rgba(0,0,0,.1)",
                      padding: 1,
                      background: "white",
                    }}
                  />
                </Box>
              )}

              {!option.image && option.icon && (
                <Box paddingY={1}>
                  <div
                    style={{
                      fontSize: 0,
                      border: "1px solid lightgray",
                      padding: 6,
                    }}
                  >
                    {option.icon}
                  </div>
                </Box>
              )}

              <Box flex={1} paddingX={2}>
                <Stack space={2}>
                  <Text size={2}>{option.label}</Text>
                  <Text size={1} muted>
                    {option.description}
                  </Text>
                </Stack>
              </Box>

              {option._type == "page.preset" && (
                <Badge mode="outline">preset</Badge>
              )}
            </Flex>
          </Card>
        );
      }}
      renderValue={(value) => ""}
      loading={state === "loading"}
      onSelect={onSelect}
    />
  );
};

export default ModuleSelect;
