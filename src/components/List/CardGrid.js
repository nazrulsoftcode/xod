import React from "react";
import RGL, { WidthProvider, Responsive } from "react-grid-layout";
import * as MyComponent from '.';
import _ from "lodash";
import '../../CardGrid.css';

const ReactGridLayout = WidthProvider(RGL);
const ResponsiveReactGridLayout = WidthProvider(Responsive);

export default class CardGrid extends React.PureComponent {
  static defaultProps = {
    className: "layout",
    // cols: { lg: 3, md: 3, sm: 3, xs: 3, xxs: 3 },
    // cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
    cols: 3,
    rowHeight: 200,
    onLayoutChange: function() {},
  };

  constructor(props) {
    super(props);

    this.state = {
    };
  }

  createElement = (el, index) => {
    const {isEditingCard} = this.props;
    const removeStyle = {
      position: "absolute",
      right: "2px",
      top: 0,
      cursor: "pointer"
    };
    if (el.type == 'component') {
      console.log(el.id, el.component);
    }
    return (
      <div key={index} data-grid={el}>
        {el.type == 'component' ? (<div className="component">{React.createElement(MyComponent[el.value], {})}</div>) : (
          <span className="text">{el.value}</span>
        )}
        {!!isEditingCard && <span
          className="remove"
          style={removeStyle}
          onClick={() => this.props.onRemoveItem(el.id)}
        >
          x
        </span>}
      </div>
    );
  };

  // We're using the cols coming back from this to calculate where to add new items.
  onBreakpointChange = (breakpoint, cols) => {
    // this.setState({
    //   breakpoint: breakpoint,
    //   cols: cols
    // });
  };

  onLayoutChange = (layout) => {
    this.props.onLayoutChange(layout);
    this.setState({ layout: layout });
  };

  render() {
    return (
      <ReactGridLayout
        onLayoutChange={this.onLayoutChange}
        onBreakpointChange={this.onBreakpointChange}
        {...this.props}
      >
        {_.map(this.props.items, (el, index) => this.createElement(el, index))}
      </ReactGridLayout>
    );
  }
}
