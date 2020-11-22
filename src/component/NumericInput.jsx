import React from 'react';
import { Input, Tooltip } from 'antd';


export default class NumericInput extends React.Component {
  onChange = e => {
    const { value } = e.target;
    this.props.onChange(value.replace(/\D/,''))
  };

  onBlur = () => {
    const { value, onBlur, onChange } = this.props;
    let valueTemp = value;
    // if (value.charAt(value.length - 1) === '.' || value === '-') {
    //   valueTemp = value.slice(0, -1);
    // }
    onChange(valueTemp.replace(/0*(\d+)/, '$1'));
    if (onBlur) {
      onBlur();
    }
  };

  render() {
    const { value } = this.props;

    return (
        <Input
          {...this.props}
          onChange={this.onChange}
          onBlur={this.onBlur}
          placeholder={this.props.placeholder}
          maxLength={this.props.length}
        />
    );
  }
}