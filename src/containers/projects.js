import React, { useState, useEffect } from 'react'
import MaterialTable from 'material-table'
import Button from '@material-ui/core/Button'
import Layout from 'components/layout'
import CONSTANTS from '../constants'
import { Map } from 'immutable'
import { randomBytes } from 'crypto'

const saveLocal = list => {
  localStorage.setItem('projects', JSON.stringify({ projects: list }))
}

const Projects = props => {
  const { history } = props
  const { match } = props
  const [projects, setProjects] = useState([])
  //const [projects, setProjects] = usePersistentMap('projects')

  const [loader, setLoader] = useState(false)
  useEffect(() => {
    console.log('projects saved')
    //saveLocal(projects)
  }, [projects])

  useEffect(() => {
    fetchProjects()
  }, [])

  function refreshProjects() {
    console.log('Projects => refreshProjects')
    fetchProjects()
  }

  const fetchProjects = () => {
    setLoader(true)
    const projectsObject = localStorage.getItem('projects')
    console.log(projectsObject)
    const projectsList = projectsObject
      ? JSON.parse(projectsObject)['projects']
      : []
    console.log(projectsList)
    setProjects(projectsList)
    setLoader(false)
  }

  const handleEditProject = async updatedProject => {
    setLoader(true)

    const newP = projects
    newP[updatedProject.idx].name = updatedProject.name
    saveLocal(newP)
    setProjects(newP)
    setLoader(false)
  }

  const handleAdd = async updatedProject => {
    setLoader(true)
    const newP = [].concat(projects)
    newP.push({
      idx: projects.length,
      name: updatedProject.name,
      uuid: randomBytes(16).toString('hex'),
    })
    saveLocal(newP)
    setProjects(newP)
    setLoader(false)
  }

  let columns = [
    {
      field: 'name',
      title: 'name',
      removable: false,
    },
  ]

  const actions = [
    rowData => ({
      icon: 'open_in_browser',
      iconProps: { fontSize: 'large', color: 'secondary' },
      tooltip: 'Open',
      isFreeAction: false,
      onClick: (event, rowData) => {
        history.push(`../projects/${rowData.uuid}`)
      },
    }),
  ]

  const localizations = {
    body: {
      editRow: {
        deleteText: 'Are you sure you want to delete this project?',
        cancelTooltip: 'No',
        saveTooltip: 'Yes',
      },
      editTooltip: 'Edit Project',
      deleteTooltip: 'Delete Project',
      addTooltip: 'Create Project',
    },
  }

  let options = {
    // actionsColumnIndex: 0,
    columnsButton: true,
    exportButton: true,
    filtering: true,
    // grouping: true,
    pageSize: 10,
    pageSizeOptions: [10, 15, 20],
    // paginationType: 'normal',
    showSelectAllCheckbox: false,
    // selection: false,
    // sorting: true,
  }

  const editable = {
    onRowUpdate: (newData, oldData) => handleEditProject(newData),
    onRowAdd: (newData, oldData) => handleAdd(newData),
  }

  return (
    <Layout {...props}>
      <Button color="secondary" onClick={refreshProjects}>
        Refresh Projects
      </Button>

      <MaterialTable
        title="MRSI Wizard Projects"
        toolbar={false}
        data={projects}
        columns={columns}
        actions={actions}
        options={options}
        editable={editable}
        localization={localizations}
        onRowClick={(event, rowData, togglePanel) => togglePanel()}
        isLoading={loader}
      />
    </Layout>
  )
}

export default Projects
