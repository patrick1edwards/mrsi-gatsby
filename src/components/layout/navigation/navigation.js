import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import MobileNav from "./mobile-nav/mobile-nav"
import TopNav from "./top-nav/top-nav"
import SideNav from "./side-nav/side-nav"

const Navigation = ({ path, hideSideNav, sideNavStyle }) => {
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              cos_long_name
              cos_manager_email
              cos_manager_name
              cos_short_name
              facility_long_name
              facility_short_name
              related_links {
                url
                caption
              }
              title
              facility_technical_poc_email
              doc_type
              facility_category_codes
              facility_cos_short_name
              facility_functional_proponent
              facility_technical_poc_name
              file_library_root_path
              page_last_reviewed
              slug
            }
            html
          }
        }
      }
    }
  `)

  console.log(data)

  return (
    <>
      <MobileNav />
      <TopNav path={path} />
      {hideSideNav ? null : <SideNav path={path} style={sideNavStyle} />}
    </>
  )
}

export default Navigation
