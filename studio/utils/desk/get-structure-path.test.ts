import { baseLanguage } from "../../../languages";
import { getStructurePath } from "./get-structure-path";

test("test es", () => {
  const { language } = getStructurePath(
    "http://localhost:3333/desk/es;page_homepage__i18n_es",
  );
  expect(language).toEqual("es");
});

test("test non language path to be undefined", () => {
  const { language } = getStructurePath(
    "http://localhost:3333/desk/fooo;page_homepage__i18n_es",
  );
  expect(language).toEqual(undefined);
});

test("test no comma", () => {
  const { language } = getStructurePath("http://localhost:3333/desk/es");
  expect(language).toEqual("es");
});

test("test trailing comma", () => {
  const { language } = getStructurePath("http://localhost:3333/desk/es;");
  expect(language).toEqual("es");
});

test("test domain", () => {
  const { language } = getStructurePath(
    "whatever.com/en;page_homepage__i18n_es",
  );
  expect(language).toEqual("en");
});

test("test studio domain", () => {
  const { language } = getStructurePath(
    "https://test.sanity.studio/en;page_homepage__i18n_es",
  );
  expect(language).toEqual("en");
});

test("test nested page list", () => {
  const { language } = getStructurePath(
    "http://localhost:3333/desk/es;allPages;084c3474-202d-4674-b503-c0aac0e7e76d;page_blogs__i18n_en;dc8f969b-f1db-407c-b385-8eb75596759c",
  );
  expect(language).toEqual("es");
});

test("test parts", () => {
  const { parts } = getStructurePath(
    "http://localhost:3333/desk/es;allPages;084c3474-202d-4674-b503-c0aac0e7e76d;page_blogs__i18n_en;dc8f969b-f1db-407c-b385-8eb75596759c",
  );
  expect(parts).toEqual([
    "es",
    "allPages",
    "084c3474-202d-4674-b503-c0aac0e7e76d",
    "page_blogs__i18n_en",
    "dc8f969b-f1db-407c-b385-8eb75596759c",
  ]);
});
