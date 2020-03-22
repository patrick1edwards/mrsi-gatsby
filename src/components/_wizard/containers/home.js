import React from "react"
import { Link } from "react-router-dom"
import { withStyles } from "@material-ui/core/styles"
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles"
import { CssBaseline } from "@material-ui/core"
import Typography from "@material-ui/core/Typography"
import { Root, Content, Footer, ClassificationBanner } from "../layout"
import FooterEx from "../components/FooterEx"

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

const Home = ({ classes }) => {
  return (
    <MuiThemeProvider theme={createMuiTheme()}>
      <Root config={config} style={{ minHeight: "100vh" }}>
        <CssBaseline />
        <ClassificationBanner>UNCLASSIFIED</ClassificationBanner>
        <Content>
          <div className={classes.root}>
            <Typography variant={"overline"}>INTRODUCING the NEW</Typography>
            <Typography weight={"bold"} variant={"h4"} gutterBottom>
              MRSI Wizards
            </Typography>
            <Typography gutterBottom>
              <b>Version 3.0</b>
            </Typography>
            <Typography indent={"small"}>
              We've unified our wizards, (Model RFP Wizard, Small Projects
              Wizard, and PDRS Wizard) into a single application. Our new MRSI
              Wizard will help ensure you get the right product based simple
              questions.
            </Typography>
            <br />
            <Typography indent={"small"}>
              Ground round ham prosciutto tail beef ribs buffalo kevin. Salami
              pancetta tri-tip, ham biltong shank venison bresaola spare ribs
              tail shankle. Meatloaf shank corned beef tri-tip doner. Buffalo
              ball tip prosciutto meatloaf kevin.
            </Typography>
            <br />
            <Typography gutterBottom>
              Benefits of this new version:
              <br />
            </Typography>
            <Typography component={"div"}>
              <ol>
                <li>
                  Sausage ham hock tail landjaeger flank, filet mignon turkey
                  frankfurter. Jowl jerky sausage ham strip steak bresaola.
                  Bresaola cow ball tip, meatball kevin corned beef turkey
                  andouille turducken. Venison ribeye tri-tip, pork rump brisket
                  flank cupim salami alcatra.
                </li>
                <li>
                  Sausage boudin cupim jerky capicola. Bacon sirloin strip steak
                  short loin beef ribs. Strip steak kevin tail sausage, jerky
                  tenderloin prosciutto alcatra. Beef ribs bacon pork loin, ball
                  tip pastrami turkey filet mignon porchetta frankfurter
                  prosciutto bresaola leberkas meatloaf ham ribeye.
                </li>
              </ol>
            </Typography>
            <Typography gutterBottom>
              Please <Link to="/login">Login</Link> to get started.
            </Typography>
          </div>
        </Content>
        <Footer>{<FooterEx />}</Footer>
        <ClassificationBanner>UNCLASSIFIED</ClassificationBanner>
      </Root>
    </MuiThemeProvider>
  )
}

export default withStyles(styles)(Home)
