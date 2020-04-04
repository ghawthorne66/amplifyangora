import React from "react";
// prettier-ignore
import { Form, Button, Dialog, Input, Select, Notification } from 'element-react'

class NewMarket extends React.Component {
  state = {};

  render() {
    return (
      <>
        <div className="market-header">
          <h1 className="market-title">
            Create Your Marketplace
            <Button type="text" icon="edit" className="market-title-button" />
          </h1>
        </div>
      </>
    );
  }
}

export default NewMarket;
