import React from 'react';
import styled from 'styled-components';
import DatGui, { DatBoolean, DatFolder, DatString } from 'react-dat-gui';
import DatQRCode from './DatQRCode';
import 'react-dat-gui/dist/index.css'



const Gui = ({ className, onUpdate, data }) => (
  <DatGui className={className} data={data} onUpdate={onUpdate}>
    <DatFolder closed={"true"} title='Settings' >
      <DatBoolean path='auto' label='Auto load message with scroll' />
      <DatString path='address' label='Server address' />
      <DatFolder closed={"true"} title='QR Code' >
        <DatQRCode value={global.location.toString()} />
      </DatFolder>
    </DatFolder>
  </DatGui>
);

export default styled(Gui)`
  z-index: 99;
  bottom: 0;
  right: 0;
  top: inherit;
  width: 100%;
  opacity: 0.8;
`;
