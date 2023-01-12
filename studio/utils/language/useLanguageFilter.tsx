import { languages } from "../../../languages";
import { getCurrentLanguages } from "./get-current-languages";
import { useEffect, useState } from "react";

export function useLanguageFilter() {
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);

  /**
   * Get the languages that are selected from localstorage
   */

  useEffect(() => {
    setSelectedLanguages(getCurrentLanguages());
  }, []);

  useEffect(() => {
    function _onLanguagePluginChange(this: HTMLElement, e: MouseEvent) {
      onLanguagePluginChange(e, setSelectedLanguages);
    }

    document.documentElement?.addEventListener(
      "click",
      _onLanguagePluginChange
    );
    () =>
      document.documentElement?.removeEventListener(
        "click",
        _onLanguagePluginChange
      );
  }, []);

  return selectedLanguages;
}

/**
 * Get the languages that are selected in the language filter plugin
 */

export function onLanguagePluginChange(
  e: MouseEvent,
  onChange: (value: string[]) => void
) {
  const target = e.target as HTMLInputElement;

  // change individual language
  if (target.type === "checkbox" && target.name.startsWith("language-")) {
    const newSelectedLanguages: string[] = [];
    languages.map((language) => {
      const input = document.querySelector(
        `[name=language-${language.id}]`
      ) as HTMLInputElement;
      if (input?.checked) newSelectedLanguages.push(language.id);
    });
    onChange(newSelectedLanguages);
  }

  // change all
  if (target.type === "checkbox" && target.name == "_allSelected") {
    onChange(target.checked ? languages.map((language) => language.id) : []);
  }
}
