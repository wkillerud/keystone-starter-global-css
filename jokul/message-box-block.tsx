import React from "react";
import {
  component,
  fields,
} from "@keystone-6/fields-document/component-blocks";
import { InfoMessageBox } from "@fremtind/jkl-message-box-react";

export const messageBoxBlock = component({
  preview: (props) => {
    return <InfoMessageBox>{props.fields.content.element}</InfoMessageBox>;
  },
  label: "MessageBox",
  schema: {
    content: fields.child({
      kind: "block",
      placeholder: "Melding",
      formatting: { inlineMarks: "inherit", softBreaks: "inherit" },
      links: "inherit",
    }),
  },
  chromeless: true,
});
