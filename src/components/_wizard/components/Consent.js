import React from 'react'
import Typography from '@material-ui/core/Typography'
import { Link } from 'react-router-dom'
import CONSTANTS from '../constants'

const Consent = props => {
  return (
    <div className={props.className}>
      <Typography variant={'overline'}>
        This is a U.S. Government site
      </Typography>
      <Typography weight={'bold'} variant={'h4'} gutterBottom>
        STANDARD MANDATORY NOTICE AND CONSENT
      </Typography>
      <Typography gutterBottom>
        YOU ARE ACCESSING A U.S. GOVERNMENT (USG) INFORMATION SYSTEM (IS) THAT
        IS PROVIDED FOR USG-AUTHORIZED USE ONLY.
      </Typography>
      <br />
      <Typography gutterBottom>
        By using this IS (which includes any device attached to this IS), you
        consent to the following conditions:
      </Typography>
      <Typography component={'div'}>
        <ul>
          <li>
            The USG routinely intercepts and monitors communications on this IS
            for purposes including, but not limited to, penetration testing,
            COMSEC monitoring network operations and defense, personnel
            misconduct (PM), law enforcement (LE), and counterintelligence (CI)
            investigations.{' '}
          </li>
          <li>
            At any time, the USG may inspect and seize data stored on this IS.
          </li>
          <li>
            Communications using, or data stored on, this IS are not private,
            are subject to routine monitoring, interception, and search, and may
            be disclosed or used for any USG-authorized purpose.{' '}
          </li>
          <li>
            This IS includes security measures (e.g., authentication and access
            controls) to protect USG interests--not for your personal benefit or
            privacy.
          </li>
          <li>
            Notwithstanding the above, using this IS does not constitute consent
            to PM, LE or CI investigative searching or monitoring of the content
            of privileged communications, or work product, related to personal
            representation or services by attorneys, psychotherapists, or
            clergy, and their assistants. Such communications and work product
            are private and confidential. See User Agreement for details.
          </li>
        </ul>
      </Typography>
      <Typography component={'p'}>
        <Link to={CONSTANTS.PROJECTS}>I agree to the above. Log me in.</Link>
      </Typography>
    </div>
  )
}

export default Consent
