import React from 'react'
import { Link } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'

const links = [
  {
    title: 'Contact Us',
    to: '/contact',
    internal: true,
  },
  {
    title: 'Privacy Policy',
    to: '/privacy',
    internal: true,
  },
  {
    title: 'FOIA',
    to: 'https://www.rmda.army.mil/foia/RMDA-FOIA-Division.html',
    internal: false,
  },
  {
    title: 'No FEAR Act',
    to: 'https://prhome.defense.gov/nofear',
    internal: false,
  },
  {
    title: 'USACE',
    to: 'https://www.usace.army.mil',
    internal: false,
  },
  {
    title: 'iSalute',
    to: '/isalute',
    internal: true,
  },
]

const FooterEx = () => (
  <div style={{ maxWidth: 875, margin: 'auto', textAlign: 'center' }}>
    <Typography variant="button" align={'center'}>
      <a href="https://mrsi.erdc.dren.mil">MRSI</a> © Copyright 2019
    </Typography>
    <Divider style={{ margin: '8px auto', width: 240 }} />
    <Grid container justify={'center'} spacing={8}>
      {links.map(link => (
        <Grid item xs={4} sm={2} md={2} key={link.title}>
          <Typography align={'center'}>
            {link.internal ? (
              <Link className="footerNav" to={link.to}>
                {link.title}
              </Link>
            ) : (
              <a
                className="footerNav"
                target="_blank"
                rel="noopener noreferrer"
                href={link.to}
              >
                {link.title}
                &nbsp;
                <i className="fas fa-external-link-alt" />
              </a>
            )}
          </Typography>
        </Grid>
      ))}
    </Grid>
  </div>
)

FooterEx.propTypes = {}
FooterEx.defaultProps = {}

export default FooterEx
