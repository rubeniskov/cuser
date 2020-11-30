import React from 'react';
import DatGui, { DatBoolean, DatColor, DatNumber, DatString } from 'react-dat-gui';
import 'react-dat-gui/dist/index.css'

const Gui = ({ onUpdate, data }) => {
  return (
    <DatGui style={{zIndex: 99, top: '50%'}} data={data} onUpdate={onUpdate}>
      <DatBoolean path='auto' label='Auto load message with scroll ' />
    </DatGui>
  )
}

export default Gui;
