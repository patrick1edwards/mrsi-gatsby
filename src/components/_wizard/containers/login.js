import React from "react"
import { withStyles } from "@material-ui/core/styles"
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles"
import { CssBaseline } from "@material-ui/core"
import { Root, Content, Footer, ClassificationBanner } from "../layout"
import FooterEx from "../components/FooterEx"
import Consent from "../components/Consent"

const styles = () => ({
  root: {
    padding: 16,
    maxWidth: 900,
    margin: "auto",
  },
})

const config = {
  navAnchor: "left",
  navVariant: {
    xs: "temporary",
    sm: "persistent",
    md: "persistent",
  },
  navWidth: {
    xs: 240,
    sm: 256,
    md: 256,
  },
  collapsible: {
    xs: false,
    sm: false,
    md: true,
  },
  collapsedWidth: {
    xs: 64,
    sm: 64,
    md: 96,
  },
  clipped: {
    xs: false,
    sm: false,
    md: false,
  },
  headerPosition: {
    xs: "relative",
    sm: "relative",
    md: "sticky",
  },
  squeezed: {
    xs: false,
    sm: false,
    md: true,
  },
  bannerShrink: {
    xs: false,
    sm: true,
    md: true,
  },
}

const Login = ({ classes }) => {
  return (
    <MuiThemeProvider theme={createMuiTheme()}>
      <Root config={config} style={{ minHeight: "100vh" }}>
        <CssBaseline />
        <ClassificationBanner>UNCLASSIFIED</ClassificationBanner>
        <Content>
          <Consent className={classes.root} />
        </Content>
        <Footer>{<FooterEx />}</Footer>
        <ClassificationBanner>UNCLASSIFIED</ClassificationBanner>
      </Root>
    </MuiThemeProvider>
  )
}

export default withStyles(styles)(Login)
