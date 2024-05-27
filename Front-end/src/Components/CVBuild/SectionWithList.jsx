import React, { useEffect, useState } from 'react'
import './indexBuild.css'

export const SectionWithList = ({
  iconName,
  title,
  type,
  sectionData,
  oneRow = false,
  handleUpdateData,
  isShowButton,
}) => {
  const [isShow, setIsShow] = useState()
  useEffect(() => {
    setIsShow(false)
  }, [])
  const BtnAddItem = (props) => (
    <button
      style={{ marginRight: '5px' }}
      data-bs-toggle='tooltip'
      title='Add new item'
      className='btn-add btn btn-outline-primary'
      onClick={() => handleUpdateData(type, { idx: props.idx })}>
      +
    </button>
  )
  const BtnRemoveItem = (props) => (
    <button
      data-bs-toggle='tooltip'
      title='Remove this item'
      className='btn-remv btn btn-outline-danger'
      onClick={() => handleUpdateData(type, { idx: props.idx }, false)}>
      -
    </button>
  )
  const handleUpdateSectionDat = (isFieldName, idx, newValue) => {
    sectionData[idx][isFieldName ? 0 : 1] = newValue
    handleUpdateData(type)
  }

  const onMouseEnter = () => {
    setIsShow(true)
  }

  const onMouseLeave = () => {
    setIsShow(false)
  }

  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{ fontFamily: 'Montserrat' }}
      className='section'>
      <i className={iconName} style={{ fontSize: '25px', color: 'green' }}>
        {' '}
        {title}
      </i>
      <hr />
      {sectionData.map((item, idx) => (
        <table className='tbl' key={idx}>
          <tr>
            <td className='cv-ipt' contentEditable rowSpan={oneRow ? 1 : 2}>
              {item[0]}
            </td>
            <td
              className='cv-ipt'
              contentEditable
              style={{ fontWeight: oneRow ? 'normal' : 'bold' }}>
              {item[1]}
            </td>
          </tr>
          {!oneRow && (
            <tr>
              <td className='cv-ipt' contentEditable>
                {item[2]}
              </td>
            </tr>
          )}
          {isShow && <BtnAddItem idx={idx} />}
          {isShow && <BtnRemoveItem idx={idx} />}
        </table>
      ))}
    </div>
  )
}
