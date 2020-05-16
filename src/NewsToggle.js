import React, { Component } from 'react';
import Switch from "react-switch";

class NewsToggle extends Component {
  constructor(props) {
    super(props);
    this.state = { checked: this.props.newsChannel == "NY"? false: true };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(check) {
    // console.log(check);
    if(check) {
      this.setState({checked: check});
      this.props.onToggleValue("Guardian");
    } else {
      this.setState({checked: check});
      this.props.onToggleValue("NY");
    }
  }

  render() {
    return (
      <label>      
        <Switch
          checked={this.state.checked}
          onChange={this.handleChange}
          onColor="#4696EC"
          offColor="#DDDDDD"
          onHandleColor="#FCFFFD"
          offHandleColor="#FCFFFD"
          handleDiameter={25}
          uncheckedIcon={false}
          checkedIcon={false}
          boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
          height={28}
          width={48}
          className="react-switch toggle-alignment"
          id="material-switch"
        />
      </label>
    );
  }
}

export default NewsToggle;