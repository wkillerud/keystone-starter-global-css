import { Logo } from "@fremtind/jkl-logo-react";
import React, { useEffect } from "react";

function CustomLogo() {
  useEffect(() => {
    if (document) {
      const body = document.getElementsByTagName("body")[0];
      body.classList.add("jkl");
    }
  }, []);

  return (
    <>
      {/* Workaround to render link tags one time per page */}
      <link rel="stylesheet" href="/static/jokul/core.min.css" />
      <link rel="stylesheet" href="/static/jokul/message-box.min.css" />
      <link rel="stylesheet" href="/static/jokul/icon-button.min.css" />
      <link rel="stylesheet" href="/static/jokul/logo.min.css" />
      <link rel="stylesheet" href="/static/jokul/webfonts.min.css" />
      <div style={{ width: "8rem" }}>
        <a href="/">
          <Logo />
        </a>
      </div>
    </>
  );
}

export const components = {
  Logo: CustomLogo,
};
