import React from 'react'
import { Link } from 'react-router-dom'
import Divider from '@material-ui/core/Divider'
import Icon from '@material-ui/core/Icon'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import ListSubheader from '@material-ui/core/ListSubheader'
import Switch from '@material-ui/core/Switch'
import CONSTANTS from '../constants'

const NavContentEx = props => {
  const { location } = props

  const list = [
    {
      primaryText: 'Projects',
      icon: 'folder',
      path: CONSTANTS.PROJECTS,
    },
    {
      primaryText: 'Favorite Projects',
      icon: 'star',
      path: CONSTANTS.PROJECTS,
    },
    {
      primaryText: 'Members',
      icon: 'people',
      path: CONSTANTS.USERS,
    },
    {
      primaryText: 'Users',
      icon: 'schedule',
      path: CONSTANTS.USERS,
    },
    {
      primaryText: 'Attachments',
      icon: 'publish',
      path: CONSTANTS.USERS,
    },
  ]

  return (
    <List component="nav">
      {list.map(({ primaryText, icon, path, onClick }, i) => (
        <Link to={path} key={primaryText}>
          <ListItem selected={path === location.pathname} button>
            <ListItemIcon>
              <Icon>{icon}</Icon>
            </ListItemIcon>
            <ListItemText
              primary={primaryText}
              primaryTypographyProps={{
                noWrap: true,
              }}
              onClick={() => console.log('clicked ', primaryText)}
            />
          </ListItem>
        </Link>
      ))}
      <Divider
        style={{
          margin: '12px 0',
        }}
      />
      <ListSubheader component="div">Settings</ListSubheader>

      {/* Only show Edit Mode options if we have an edit mode properties */}
      {props.hasOwnProperty('toggleEditMode') && (
        <ListItem>
          <ListItemIcon>
            <Icon>settings</Icon>
          </ListItemIcon>

          <ListItemText
            primary="Edit Mode"
            primaryTypographyProps={{
              noWrap: true,
            }}
          />

          <ListItemSecondaryAction>
            <Switch
              checked={props.editMode}
              onChange={props.toggleEditMode}
              value="editMode"
            />
          </ListItemSecondaryAction>
        </ListItem>
      )}
    </List>
  )
}
NavContentEx.propTypes = {}
NavContentEx.defaultProps = {}

export default NavContentEx
