import React, { Component, createRef } from 'react';
import styled from 'styled-components';
import QRCode from 'qrcode';

class DatQRCode extends Component {

  constructor() {
    super();
    this.canvasRef = createRef();
  }

  componentDidMount() {
    QRCode.toCanvas(this.canvasRef.current, this.props.value, (err) => {
      if (err) throw err;
    });
  }

  componentWillUnmount() {
    console.log(this.canvasRef.current);
  }

  render() {
    return (
      <div className={this.props.className}>
        <canvas ref={this.canvasRef} />
      </div>
    );
  }
}

export default styled(DatQRCode)`
  background-color: #1a1a1a;
  text-align: center;
  canvas {
    width: 300px !important;
    height: 300px !important;
  }
`
