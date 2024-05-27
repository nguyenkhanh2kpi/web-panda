import React from 'react'
import './indexBuild.css'

export const SectionWithParagraph = ({ iconName, title, sectionData }) => {
  return (
    <div style={{ fontFamily: 'Montserrat' }} className='section'>
      <i className={iconName} style={{ fontSize: '25px', color: 'green' }}>
        {' '}
        {title}
      </i>

      <hr />
      <div className='cv-ipt para' contentEditable>
        {sectionData}
      </div>
    </div>
  )
}
