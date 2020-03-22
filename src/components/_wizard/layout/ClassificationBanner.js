import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { LayoutContext } from './Root'
import green from '@material-ui/core/colors/green'

const styles = ({ breakpoints, palette, spacing, transitions }) => ({
  root: {
    background: green[600],
    color: '#fff',
    fontWeight: 'bold',
    letterSpacing: '5px',
    textAlign: 'center',
    borderColor: palette.grey[200],
    padding: spacing(0.5),
    [breakpoints.up('sm')]: {
      padding: spacing(1),
    },
    transition: transitions.create(['margin'], {
      easing: transitions.easing.sharp,
      duration: transitions.duration.leavingScreen,
    }),
  },
})

const ClassificationBanner = ({
  className,
  component: Component,
  classes,
  style,
  zeroPadding,
  ...props
}) => {
  const ctx = useContext(LayoutContext)
  const {
    navVariant,
    navWidth,
    collapsible,
    collapsed,
    collapsedWidth,
    bannerShrink,
    open,
    navAnchor,
  } = ctx
  const getMargin = () => {
    if (navAnchor !== 'left' || !bannerShrink) return 0
    if (navVariant === 'persistent' && open) {
      // open is effect only when
      // navVariant === 'persistent' ||
      // navVariant === 'temporary'
      return navWidth
    }
    if (navVariant === 'permanent') {
      if (collapsible) {
        if (collapsed) return collapsedWidth
        return navWidth
      }
      return navWidth
    }
    return 0
  }
  return (
    <Component
      {...props}
      className={`${className} ${classes.root}`}
      style={{
        ...(zeroPadding && { padding: 0 }),
        ...style,
        marginLeft: getMargin(),
      }}
    />
  )
}

ClassificationBanner.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.shape({}).isRequired,
  component: PropTypes.elementType,
  style: PropTypes.shape({}),
  zeroPadding: PropTypes.bool,
}
ClassificationBanner.defaultProps = {
  className: '',
  component: 'header',
  style: {},
  zeroPadding: false,
}

export default withStyles(styles)(ClassificationBanner)
