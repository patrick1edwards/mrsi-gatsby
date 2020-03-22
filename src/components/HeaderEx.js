import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { isWidthUp } from '@material-ui/core/withWidth'
import Icon from '@material-ui/core/Icon'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import Tooltip from '@material-ui/core/Tooltip'

const styles = ({ spacing, transitions, breakpoints, palette, shape }) => ({
  header: {
    fontWeight: 600,
    minWidth: 0,
    fontSize: 18,
  },
  grow: {
    flexGrow: 1,
  },
  iconButton: {
    color: 'inherit',
  },
})

const HeaderEx = ({ classes, screen, editMode, toggleEditMode }) => (
  <>
    <Typography noWrap className={classes.header}>
      MRSI Wizards
    </Typography>
    <div className={classes.grow} />
    {screen === 'xs' && (
      <IconButton className={classes.iconButton}>
        <Icon>more_vert</Icon>
      </IconButton>
    )}
    {screen === 'sm' && (
      <>
        {toggleEditMode !== null && toggleEditMode !== undefined && (
          <IconButton
            className={classes.iconButton}
            onClick={() => {
              toggleEditMode()
            }}
          >
            {editMode === true ? (
              <Tooltip title="Edit Mode" placement="left">
                <Icon>lock_open</Icon>
              </Tooltip>
            ) : (
              <Tooltip title="Preview Mode" placement="left">
                <Icon>lock</Icon>
              </Tooltip>
            )}
          </IconButton>
        )}
        <IconButton className={classes.iconButton}>
          <Icon>more_vert</Icon>
        </IconButton>
      </>
    )}
    {isWidthUp('md', screen) && (
      <>
        {toggleEditMode !== null && toggleEditMode !== undefined && (
          <IconButton
            className={classes.iconButton}
            onClick={() => {
              toggleEditMode()
            }}
          >
            {editMode === true ? (
              <Tooltip title="Edit Mode" placement="left">
                <Icon>lock_open</Icon>
              </Tooltip>
            ) : (
              <Tooltip title="Preview Mode" placement="left">
                <Icon>lock</Icon>
              </Tooltip>
            )}
          </IconButton>
        )}
        <IconButton className={classes.iconButton}>
          <Icon>phone</Icon>
        </IconButton>
        <IconButton className={classes.iconButton}>
          <Icon>camera</Icon>
        </IconButton>
      </>
    )}
  </>
)

HeaderEx.propTypes = {
  screen: PropTypes.string.isRequired,
  classes: PropTypes.shape({}).isRequired,
  editMode: PropTypes.bool,
  toggleEditMode: PropTypes.func,
}
HeaderEx.defaultProps = {}

export default withStyles(styles)(HeaderEx)
