import React, { useState } from "react"
import Projects from "../../components/_wizard/containers/projects"
import Document from "../../components/_wizard/containers/document"
import App from "../../components/_wizard/app/index"

export default () => {
  const [projectID, setProjectID] = useState(6)

  if (projectID) {
    return <Document projectID={projectID} goBack={() => setProjectID(null)} />
  } else {
    return <Projects setProjectID={setProjectID} />
  }
}
