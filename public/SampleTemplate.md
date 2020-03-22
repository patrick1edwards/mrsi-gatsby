# SECTION 00 01 10
->**TABLE OF CONTENTS**<-
->**TASK ORDER**<-
->**{{ VER ; REV 1.16 - 10 NOV 2014 ; false }}**<-
->**REQUEST FOR PROPOSAL**<-
->**{ PROJECT:PROJECT_LOCATION }**<-

** DIVISION 00 - PROPOSAL REQUIREMENTS,
CONTRACT FORMS AND CONDITIONS **

** Sections (Task Order Specific Requirements - See also Base Contract for Division 00 Sections) **

${toc}

The Table of Contents plugin auto-generates a table of contents based upon the markup found in the entire document. It looks for anything marked-up as a heading (h1 - h6). It can be configured to limit focus to a subset of headers, if desired. Consider developing a custom plugin to limit TOC to a specific section of a document, depending on template requirements. Currently each section has its own TOC. Maybe a single TOC would be more useful.

->**AIRCRAFT MAINTENANCE AREA**<-
| AIRCRAFT MAINTENANCE BAY | | |
| :--- | :--- | :--- |
| PRODUCTION CONTROL | 2 | Private office with U-Shaped workstations. Provide: Overhead storage w/ task lighting; center drawer; Box/Box File, & File/File Storage.|
| | 5 | L-shaped Admin Workstations. Provide: center drawer; Box/Box File & File/File Storage; Overhead Storage & task lighting |
| | {{ AAC_HGR:AAC_PRODUCTION_MARKER ; 2 }} | {{ AAC_HGR:AAC_PRODUCTION_MARKER ; 5' h x 8' w Dry Erase Markerboards }} |
| | {{ AAC_HGR:AAC_PRODUCTION_FLATSCREEN ; 4 }}  | {{ AAC_HGR:AAC_PRODUCTION_FLATSCREEN ; 5' h x 8' w Flat Screen Monitors }} |
| | 20 | Conference Chairs |
| | 10| Ergonomic Task Chairs |
| | 1 | 10' Conference Table |
| | 2 | Lockable metal storage cabinet 72" h x 30" w x 30" d with shelves |
| | 2 | 2 High Lateral File Cabinets |
| | 1 | 4-Drawer Safe for COMSEC |
| QUALITY CONTROL/QUALITY ASSURANCE | 1 | Private office with U-Shaped workstation. Provide: Overhead storage w/ task lighting; center drawer; Box/Box File, & File/File Storage. |
| | 11 | L-shaped Admin Workstations. Provide: center drawer; Box/Box File & File/File Storage; Overhead Storage & task lighting |
| | 12 | Ergonomic Task Chairs |
| | 1 | Lockable metal storage cabinet 72" w x 30" d x 30" h with shelves |
| | {{ AAC_HGR:AAC_QAQC_MARKER ; 2 }} | {{ AAC_HGR:AAC_QAQC_MARKER ; 5' h x 8' w Dry Erase Markerboards }} |
| | {{ AAC_HGR:AAC_QAQC_FLATSCREEN; 4 }} | {{ AAC_HGR:AAC_QAQC_FLATSCREEN; 5' h x 8' w Flat Screen Monitors }} |

The project is a(n), { PROJECT:PROJECT_TITLE }, located at { PROJECT:PROJECT_LOCATION }.

# SECTION 00 21 00
->{{ VER ; REV 2.5 - 31 JUL 2009 ; false }}<-

## 1.0. GENERAL INFORMATION

### 1.1. GENERAL DESCRIPTION OF WORK

The scope of project includes all work required to design and construct a { PROJECT:PROJECT_TITLE } located at { PROJECT:PROJECT_LOCATION }.  The work shall be in accordance with Request for Proposal documents. General Description of Work:  { PROJECT:PROJECT_DESCRIPTION }

#### ARF Emplacement Material
Test option with additional value if non-default is selected.

{{{ ARF_EMPLACEMENT_MATERIAL:EMPLACEMENTMATERIALS ; Standard
Standard materials were selected
}}}
{{{ ARF_EMPLACEMENT_MATERIAL:EMPLACEMENTMATERIALS ; Other
Other material selected:

   { ARF_EMPLACEMENT_MATERIAL:OTHERMATERIAL }
}}}

#### ARF Markers
Section about automatic firing ranges...

{{{{ ARF_MARKERS:LIMIT_MARKERS ; true
Limit Markers

{{ ARF_MARKERS:NIGHTFIRE_MARKERS ; Night Fire Markers }}
}}}}

{{ ARF_MARKERS:LANE_MARKERS ; Lane Markers }}

{{ ARF_MARKERS:FIRINGPOINT_MARKERS ; Firing Point Markers }}

{{ ARF_MARKERS:INTERMEDIATELANE_MARKERS ; Intermediate Lane Markers }}

{{{{{BACON:BACON ; yes
Bacon ipsum dolor amet shoulder bresaola cupim pork pork belly alcatra tongue picanha. Boudin pork pig strip steak biltong rump. Ribeye ham flank, biltong pork pork chop sirloin.

#### Next section

Shank swine ham hock sausage picanha shoulder. Spare ribs boudin ham frankfurter ribeye, strip steak meatloaf biltong. Meatloaf tri-tip alcatra landjaeger jerky swine. Cow turducken { RIBS } jowl t-bone ball tip pork shoulder pancetta filet mignon drumstick tail flank tenderloin.

  {{{{BACON:TURKEY1 ; true
  1 - Kevin turkey porchetta brisket bresaola, sirloin flank shoulder hamburger ground round strip steak tail prosciutto shankle. Jowl shank kevin porchetta, picanha turducken rump spare ribs cupim. Pork loin flank ham hock ribeye turducken, hamburger kielbasa andouille bresaola porchetta tongue meatball tenderloin. Kevin cow chicken ham hock swine. Pancetta tenderloin meatloaf prosciutto short loin chuck ham tongue.

    {{{BACON:TURKEY2 ; true
    2 - Kevin turkey porchetta brisket bresaola, sirloin flank shoulder hamburger ground round strip steak tail prosciutto shankle. Jowl shank kevin porchetta, picanha turducken rump spare ribs cupim. Pork loin flank ham hock ribeye turducken, hamburger kielbasa andouille bresaola porchetta tongue meatball tenderloin. Kevin cow chicken ham hock swine. Pancetta tenderloin meatloaf prosciutto short loin chuck ham tongue.

      {{{BACON:TURKEY3 ; true
      3 - Kevin turkey porchetta brisket bresaola, sirloin flank shoulder hamburger ground round strip steak tail prosciutto shankle. Jowl shank kevin porchetta, picanha turducken rump spare ribs cupim. Pork loin flank ham hock ribeye turducken, hamburger kielbasa andouille bresaola porchetta tongue meatball tenderloin. Kevin cow chicken ham hock swine. Pancetta tenderloin meatloaf prosciutto short loin chuck ham tongue.

        {{{TURKEY4 ; true ; false
        4 - Kevin turkey porchetta brisket bresaola, sirloin flank shoulder hamburger ground round strip steak tail prosciutto shankle. Jowl shank kevin porchetta, picanha turducken rump spare ribs cupim. Pork loin flank ham hock ribeye turducken, hamburger kielbasa andouille bresaola porchetta tongue meatball tenderloin. Kevin cow chicken ham hock swine. Pancetta tenderloin meatloaf prosciutto short loin chuck ham tongue.
        }}}
      }}}
    }}}
  }}}}
}}}}}

  Link within a remover [I'm an inline-style link](http://localhost:3001/api/projects "MRSI")

{{{ 4-HAM:4-HAM ; ham
4-Ham tongue tri-tip pork belly ball tip short loin. Meatball jowl sausage ribeye. Shank meatloaf short ribs jowl bacon pancetta buffalo flank pig. Bacon pork chop t-bone, fatback salami porchetta spare ribs boudin pork belly corned beef short ribs tail. Buffalo cupim biltong turducken, chuck meatball boudin ham hock filet mignon meatloaf ground round tongue. Pig kielbasa pork shank.
}}}
{{{ 4-HAM:4-HAM ; bacon
4-bacon tongue tri-tip pork belly ball tip short loin. Meatball jowl sausage ribeye. Shank meatloaf short ribs jowl bacon pancetta buffalo flank pig. Bacon pork chop t-bone, fatback salami porchetta spare ribs boudin pork belly corned beef short ribs tail. Buffalo cupim biltong turducken, chuck meatball boudin ham hock filet mignon meatloaf ground round tongue. Pig kielbasa pork shank.
}}}
{{{ 4-HAM:4-HAM ; turkey
4-turkey tongue tri-tip pork belly ball tip short loin. Meatball jowl sausage ribeye. Shank meatloaf short ribs jowl bacon pancetta buffalo flank pig. Bacon pork chop t-bone, fatback salami porchetta spare ribs boudin pork belly corned beef short ribs tail. Buffalo cupim biltong turducken, chuck meatball boudin ham hock filet mignon meatloaf ground round tongue. Pig kielbasa pork shank.
}}}
{{{ 4-HAM:4-HAM ; pork
4-pork tongue tri-tip pork belly ball tip short loin. Meatball jowl sausage ribeye. Shank meatloaf short ribs jowl bacon pancetta buffalo flank pig. Bacon pork chop t-bone, fatback salami porchetta spare ribs boudin pork belly corned beef short ribs tail. Buffalo cupim biltong turducken, chuck meatball boudin ham hock filet mignon meatloaf ground round tongue. Pig kielbasa pork shank.
}}}

Filet mignon cow drumstick flank ball tip, bresaola tongue pork belly doner. Meatball capicola jerky alcatra flank kevin. Pork loin pork belly burgdoggen jerky, cupim strip steak hamburger turducken ground round. Kevin salami filet mignon, kielbasa ribeye biltong chuck alcatra pork belly buffalo turkey.

Go here to see an inline style link: [I'm an inline-style link](https://mrsi/api "https://mrsi/api")

### 1.2. CONTRACT COST CEILING LIMITATION FOR DESIGN AND CONSTRUCTION COSTS

The design and construction costs will be subject to the funds available for this project.  The total contract award shall not exceed { COST:COST_HIGH ; currency } for this contract.  Offerors are notified that they are under no obligation to approach this ceiling.  However the Government will not be able make an award, if the dollar amount set for this project is exceeded.

{{{LONE_REMOVER ; true
  Lone Kevin turkey porchetta brisket bresaola, sirloin flank shoulder hamburger ground round strip steak tail prosciutto shankle. Jowl shank kevin porchetta, picanha turducken rump spare ribs cupim. Pork loin flank ham hock ribeye turducken, hamburger kielbasa andouille bresaola porchetta tongue meatball tenderloin. Kevin cow chicken ham hock swine. Pancetta tenderloin meatloaf prosciutto short loin chuck ham tongue.
}}}

#### Table Test

| CAR      | Cost | Location |
| :--- | :--- | :--- |
| Porsche 911 Targa   | $75,000 | Champaign, IL |
| Tesla   | { COST:COST_HIGH ; currency } | Outer Space |

#### Table Test AAC QAQC
| Type | Quantity |
| :--- | :--- | ---: |
| {{ AAC_QAQC:AAC_QAQC_FLATSCREEN ; 5' h x 8' w Flat Screen Monitors }} | {{ AAC_QAQC:AAC_QAQC_FLATSCREEN ; 4 }} |
| {{ AAC_QAQC:AAC_QAQC_MARKER ; 5' h x 8' w Dry Erase Markerboards }} | {{ AAC_QAQC:AAC_QAQC_MARKER ; 2 }}  |

### 1.3. GOVERNMENT SECURITY REQUIREMENTS

The Offeror(s) must ensure that ALL mail sent to the { ISSUING_DISTRICT:ISSUING_DISTRICT }, U.S. Army Corps of Engineers, either pre-contract or post-contract award, has a return mailing address on the outside of the envelope, package, box, etc.  ANY MAIL addressed to the U.S. Army Corps of Engineers, including but not limited to bids, modifications to bids, proposals, revised proposals, bonds, correspondence, etc., will be REJECTED by the US Army Corps of Engineers mail room facility located at { ISSUING_DISTRICT:ISSUING_DIST_MAIL } if it does not contain a return mailing address.  There will be no exceptions.

  TODO: Figure out how we should handle indented text. Is there a need?

### 1.4. COPIES OF SOLICITATION DOCUMENTS AND AMENDMENTS
Copies of the solicitation and amendments are available by INTERNET ACCESS ONLY.  All solicitation documents will be posted to the Federal Business Opportunities website at: { FEDBIZOPS_WEB } { ISSUING_DISTRICT:ISSUING_DIST_WEB }

It shall be the contractor's responsibility to check the websites for any amendments.  The offeror shall submit in the proposal all requested information specified in this solicitation.  There will be no public opening of the proposals received as a result of this solicitation.

A list of interested vendors (potential offerors and subcontractors) is available on the federal business opportunities web site (registration required) is available at:  http://www.fbo.gov/  via Quick Search (Solicitation No. { CONTRACT_NUMBER }).

Additional information regarding this solicitation and potential offerors and/or subcontractors is available at { ISSUING_DIST:ISSUING_DIST_CONTRACT_WEB }.

