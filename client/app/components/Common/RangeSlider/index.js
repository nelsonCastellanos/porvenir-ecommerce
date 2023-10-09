/**
 *
 *  Range Slider
 *
 */

import React from 'react';
import Slider from 'rc-slider';
import {handleRender} from './TooltipSlider'


class RangeSlider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sliderValue: 50,
      rangeValue: this.props.defaultValue
    };
  }

  onSliderChange = v => {
    this.setState({
      sliderValue: v
    });
  };

  onRangeChange = v => {
    this.setState({
      rangeValue: v
    });
  };

  onAfterSliderChange = value => {
    this.props.onChange(value);
  };

  onAfterRangeChange = value => {
    this.props.onChange(value);
  };

  render() {
    const { type, marks, step, defaultValue, max, allowCross } = this.props;
    const { sliderValue, rangeValue } = this.state;

    return (
      <>
        {type === 'slider' ? (
          <Slider
            className='slider'
            dots
            reverse
            allowCross={allowCross}
            step={step}
            defaultValue={defaultValue}
            marks={marks}
            value={sliderValue}
            onChange={this.onSliderChange}
            onAfterChange={this.onAfterSliderChange}
          />
        ) : (
          <Slider range
            className='slider'
            pushable={10}
            allowCross={allowCross}
            min={1}
            max={max}
            step={step}
            defaultValue={defaultValue}
            marks={marks}
            handleRender={handleRender}
            tipFormatter={value => `$${value}`}
            value={rangeValue}
            onChange={this.onRangeChange}
            onAfterChange={this.onAfterRangeChange}
          />
        )}
      </>
    );
  }
}

RangeSlider.defaultProps = {
  type: 'range',
  allowCross: true
};

export default RangeSlider;
