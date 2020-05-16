import {BounceLoader} from "react-spinners";
import React, { Component } from 'react';
import { css } from "@emotion/core";

const override = css`
  display: block;
  margin: auto;
  border-color: red;`;

class Loader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        }
    }

    render() {
        return (
            <div style={{ marginTop: "15%" }}>
              <BounceLoader
                css={override}
                size={45}
                color="#123abc"

                loading={this.state.loading}
              />
              <h4 className="center">Loading</h4>
            </div>);
    }
}

export default Loader;