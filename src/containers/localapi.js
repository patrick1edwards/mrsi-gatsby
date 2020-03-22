const getProjectList = () => {
  const projectsObject = localStorage.getItem('projects')

  const projectsList = projectsObject
    ? JSON.parse(projectsObject)['projects']
    : [{ idx: 0, name: 'default name' }]

    return projectsList
}



const saveProjects(list) = () => {
    localStorage.setItem('projects', JSON.stringify({ projects: list }))
} 
