import React, { useRef, useEffect } from 'react';
import 'rc-tooltip/assets/bootstrap.css';
import raf from 'rc-util/lib/raf';
import Tooltip from 'rc-tooltip';

const HandleTooltip = (props) => {
  const { value, children, visible, tipFormatter = (val) => `${val}`, ...restProps } = props;

  const tooltipRef = useRef();
  const rafRef = useRef(null);

  function cancelKeepAlign() {
    raf.cancel(rafRef.current);
  }

  function keepAlign() {
    rafRef.current = raf(() => {
      tooltipRef.current?.forceAlign();
    });
  }

  useEffect(() => {
    if (visible) {
      keepAlign();
    } else {
      cancelKeepAlign();
    }

    return cancelKeepAlign;
  }, [value, visible]);

  return (
    <Tooltip
      placement="top"
      overlay={tipFormatter(value)}
      overlayInnerStyle={{ minHeight: 'auto' }}
      ref={tooltipRef}
      visible={visible}
      {...restProps}
    >
      {children}
    </Tooltip>
  );
};

export const handleRender = (node, props) => {
  return (
    <HandleTooltip value={props.value} visible={props.dragging}>
      {node}
    </HandleTooltip>
  );
};
