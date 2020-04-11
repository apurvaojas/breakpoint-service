import React from 'react';
import breakpointService, {MediaBreakpoint} from '@breakpoint-service/core';


export function withBreakpointService(WrappedComponent: typeof React.Component) {
  return class extends React.Component<any, {breakpoint: MediaBreakpoint | null}> {
    constructor(props: any) {
      super(props);
      this.handleChange = this.handleChange.bind(this);
      this.state = {
        breakpoint: null
      };

      breakpointService.on(breakpointService.EVENTS.onChange, this.handleChange);  
    }

    componentWillUnmount() {
      breakpointService.off(breakpointService.EVENTS.onChange, this.handleChange);
    }

    handleChange(data: MediaBreakpoint) {
      this.setState({
        breakpoint: {...data}
      });
    }

    render() {
      return <WrappedComponent breakpoint={this.state.breakpoint} {...this.props} />;
    }
  };
}