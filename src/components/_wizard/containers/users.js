import React, { useState, useEffect } from "react"
import Button from "@material-ui/core/Button"
import Layout from "../components/layout"
import MaterialTable from "material-table"
import CONSTANTS from "../constants"

const Users = props => {
  const { history } = props
  const [users, setUsers] = useState([])
  const [loader, setLoader] = useState(false)
  /* TODO: do something with the warning message */
  // eslint-disable-next-line no-unused-vars
  const [warningMessageOpen, setWarningMessageOpen] = useState(false)
  // eslint-disable-next-line no-unused-vars
  const [warningMessageText, setWarningMessageText] = useState("")

  useEffect(() => {
    fetchUsers()
  }, [])

  function refreshUsers() {
    console.log("users => refreshUsers")
    fetchUsers()
  }

  function fetchUsers() {
    setLoader(true)
    fetch(CONSTANTS.ENDPOINT.USERS)
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText)
        }
        return response.json()
      })
      .then(result => setUsers(result))
      .catch(error => {
        setWarningMessageOpen(true)
        setWarningMessageText(`users => Failed to get the users: ${error}`)
      })
    setLoader(false)
  }

  const handleEditUser = async updatedUser => {
    setLoader(true)
    await fetch(`${CONSTANTS.ENDPOINT.USERS}/${updatedUser.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user: updatedUser }),
    })
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText)
        }
        return response.json()
      })
      .then(result => {
        // find this User
        const index = users.findIndex(p => p.id === result._id)
        if (index > -1) {
          setUsers(prevUsers => [
            ...prevUsers.slice(0, index),
            updatedUser,
            ...prevUsers.slice(index + 1),
          ])
        }
      })
      .catch(error => {
        setWarningMessageOpen(true)
        setWarningMessageText(`users => Failed to update the User: ${error}`)
      })
    setLoader(false)
  }

  const handleDeleteUser = async user => {
    setLoader(true)
    await fetch(`${CONSTANTS.ENDPOINT.USERS}/${user.id}`, { method: "DELETE" })
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText)
        }
        return response.json()
      })
      .then(result => {
        console.log("Delete user result: ", result)
        setUsers(prevUsers => prevUsers.filter(p => p.id !== result._id))
      })
      .catch(error => {
        setWarningMessageOpen(true)
        setWarningMessageText(`users => Failed to delete user ${error}`)
      })
    setLoader(false)
  }

  const columns = [
    {
      field: "name",
      title: "Name",
    },
    {
      field: "height",
      title: "height",
    },
    {
      field: "mass",
      title: "Mass",
    },
    {
      field: "hair_color",
      title: "Hair Color",
    },
    {
      field: "gender",
      title: "Gender",
    },
  ]

  const actions = [
    rowData => ({
      icon: "open_in_browser",
      tooltip: "Open",
      iconProps: { fontSize: "large", color: "secondary" },
      isFreeAction: true,
      onClick: (event, rowData) => {
        history.push(`/users/${rowData.id}`)
      },
    }),
  ]

  const detailPanel = [
    {
      tooltip: "Show Name",
      render: rowData => {
        return (
          <div
            style={{
              fontSize: 100,
              textAlign: "center",
              color: "white",
              backgroundColor: "#43A047",
            }}
          >
            {rowData.name}
          </div>
        )
      },
    },
  ]

  const localizations = {
    body: {
      editRow: {
        deleteText: "Are you sure you want to delete this user account?",
        cancelTooltip: "No",
        saveToolTip: "Yes",
      },
    },
  }

  const options = {
    exportButton: true,
    filtering: true,
    pageSize: 10,
    pageSizeOptions: [10, 15, 20],
    showSelectAllCheckbox: false,
    sorting: true,
    actionsColumnIndex: 0,
    columnsButton: true,
  }

  const editable = {
    onRowUpdate: (newData, oldData) => handleEditUser(newData),
    onRowDelete: oldData => handleDeleteUser(oldData),
  }

  return (
    <Layout {...props}>
      <Button color="secondary" onClick={refreshUsers}>
        Refresh Users
      </Button>

      <MaterialTable
        title="MRSI Wizard Users"
        toolbar={false}
        data={users}
        columns={columns}
        actions={actions}
        detailPanel={detailPanel}
        options={options}
        editable={editable}
        localization={localizations}
        isLoading={loader}
      />
    </Layout>
  )
}

export default Users
