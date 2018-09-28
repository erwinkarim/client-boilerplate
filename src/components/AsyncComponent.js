import React, { Component } from 'react';

/**
 * The Constructor
 * @param {json} importComponent the props
 * @returns {null} The sum of the two numbers.
 */
export default function asyncComponent(importComponent) {
  /**
   * The Constructor
   * @param {json} importComponent the props
   * @returns {null} The sum of the two numbers.
   */
  class AsyncComponent extends Component {
    /**
     * The Constructor
     * @param {json} props the props
     * @returns {null} The sum of the two numbers.
     */
    constructor(props) {
      super(props);

      this.state = {
        component: null,
      };
    }
    componentDidMount = async () => {
      const { default: component } = await importComponent();

      this.setState({ component });
    }
    render = () => {
      const C = this.state.component;

      return C ? <C {...this.props} ref={(input) => { this.theRef = input; }} /> : null;
    }
  }

  return AsyncComponent;
}
