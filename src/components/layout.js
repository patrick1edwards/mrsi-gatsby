import React from 'react'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import { CssBaseline } from '@material-ui/core'
import Icon from '@material-ui/core/Icon'
import { Root, Header, Nav, Content, ClassificationBanner } from '../layout'
import NavContentEx from 'components/NavContentEx'
import NavHeaderEx from 'components/NavHeaderEx'
import HeaderEx from 'components/HeaderEx'

const config = {
  navAnchor: 'left',
  navVariant: {
    xs: 'temporary',
    sm: 'persistent',
    md: 'persistent',
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
    xs: 'relative',
    sm: 'sticky',
    md: 'sticky',
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

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#13294B',
    },
    secondary: {
      main: '#E84A27',
    },
  },
})

const Layout = props => {
  return (
    <MuiThemeProvider theme={theme}>
      {
        <Root config={config} style={{ minHeight: '100vh' }}>
          <CssBaseline />
          <ClassificationBanner>
            <div>UNCLASSIFIED</div>
          </ClassificationBanner>
          <Header
            menuIcon={{
              inactive: <Icon>menu_rounded</Icon>,
              active: <Icon>chevron_left</Icon>,
            }}
          >
            {({ screen, collapsed }) => (
              <HeaderEx
                screen={screen}
                collapsed={collapsed}
                editMode={props.editMode}
                toggleEditMode={props.toggleEditMode}
              />
            )}
          </Header>
          <Nav
            collapsedIcon={{
              inactive: <Icon>chevron_left</Icon>,
              active: <Icon>chevron_right</Icon>,
            }}
            header={() => <NavHeaderEx collapsed={false} />}
          >
            {<NavContentEx {...props} />}
          </Nav>
          <Content>{props.children}</Content>
          <ClassificationBanner>UNCLASSIFIED</ClassificationBanner>
        </Root>
      }
    </MuiThemeProvider>
  )
}

export default Layout
