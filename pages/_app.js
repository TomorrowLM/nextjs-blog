import React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "../theme/theme";
import { siteData } from "../config/config";
export default function MyApp(props) {
  const { Component, pageProps } = props;
  const { title, description } = siteData;
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <React.Fragment>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <meta name="Description" content={description}></meta>
        <title>{title}</title>
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </React.Fragment>
  );
}
MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
MyApp.getInitialProps = async (appContext) => {
    // const siteData = await import(`../config.json`);
    const fs = require("fs");
    const files = fs.readdirSync(`${process.cwd()}/content`, "utf-8");
  
    const blogs = files.filter((fn) => fn.endsWith(".md"));
    const data = blogs.map((blog) => {
      const path = `${process.cwd()}/content/${blog}`;
      const rawContent = fs.readFileSync(path, {
        encoding: "utf-8",
      });
      return rawContent;
    });
    return {
      props: {
        data: data,
        // title: siteData.default.title,
        // description: siteData.default.description,
      },
    };
}