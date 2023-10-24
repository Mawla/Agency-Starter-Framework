import { baseLanguage } from "../../languages";
import { SANITY_API_VERSION } from "../../types.sanity";
import React, { useEffect, useState } from "react";
import { useClient } from "sanity";

export const Logo = () => {
  const [name, setName] = useState<string>("");
  const client = useClient({ apiVersion: SANITY_API_VERSION });

  useEffect(() => {
    async function getConfig() {
      const configName = await client.fetch(`
        *[_id == 'config_general'][0] {
          name
        }.name`);

      if (configName) {
        setName(configName[baseLanguage]);
      }
    }

    getConfig();
  }, []);

  return (
    <div
      style={{ display: "flex", gap: 6, alignItems: "center" }}
      title={import.meta.env.SANITY_STUDIO_API_PROJECT_ID}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          width="39.7134"
          height="39.7134"
          rx="5"
          fill="rgba(255,255,255,.15)"
        />
        <path
          d="M24.2013 22.7248C24.4533 23.7911 24.4607 24.9006 24.223 25.9701C23.9853 27.0397 23.5087 28.0415 22.8288 28.9007C22.1489 29.7599 21.2834 30.4541 20.2971 30.9312C19.3109 31.4084 18.2294 31.6562 17.1337 31.656V25.8471C19.6876 25.3285 22.0978 24.2633 24.2013 22.7248ZM24.2013 22.7248C26.5126 21.0412 28.3928 18.8347 29.6885 16.2855C30.9841 13.7363 31.6583 10.9168 31.656 8.05732C28.7967 8.05525 25.9775 8.72956 23.4285 10.0252C20.8796 11.3208 18.6733 13.2009 16.9897 15.5121M16.9897 15.5121C15.9234 15.2599 14.8138 15.2523 13.7441 15.4899C12.6744 15.7275 11.6723 16.2041 10.813 16.884C9.95369 17.5639 9.25939 18.4295 8.78215 19.4159C8.30492 20.4022 8.05711 21.4838 8.05731 22.5796H13.8662C14.3851 20.0262 15.4514 17.6152 16.9897 15.5121ZM11.1566 25.472C10.3605 26.0639 9.74157 26.8624 9.36677 27.781C8.99197 28.6995 8.87562 29.7031 9.03031 30.683C10.0104 30.8376 11.014 30.7211 11.9326 30.346C12.8511 29.971 13.6495 29.3518 14.2414 28.5555"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1em",
          fontSize: 14,
        }}
      >
        <span style={{ fontWeight: "bold" }}>{name || "Growth Websites"}</span>
        {import.meta.env.SANITY_STUDIO_API_DATASET !== "production" && (
          <span style={{ fontSize: 11 }}>
            {import.meta.env.SANITY_STUDIO_API_DATASET}
          </span>
        )}
      </div>
    </div>
  );
};
