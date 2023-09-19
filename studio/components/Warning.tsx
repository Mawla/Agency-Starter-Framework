import { Card, Text } from "@sanity/ui";
import React, { ComponentType } from "react";

const Warning: ComponentType<any> = (props) => {
  const { schemaType } = props;

  return (
    <Card
      padding={[3, 3, 4]}
      radius={2}
      shadow={1}
      tone={schemaType.options?.tone || "caution"}
    >
      <Text align="left" size={1}>
        {schemaType.description}
      </Text>
    </Card>
  );
};

export default Warning;
