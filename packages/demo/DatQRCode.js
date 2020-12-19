import React, { Component, createRef } from 'react';
import QRCode from 'qrcode';

export default class DatQRCode extends Component {

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
      <div>
        <canvas ref={this.canvasRef} />
      </div>
    );
  }
}
