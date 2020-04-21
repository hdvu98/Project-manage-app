import React from "react";
import { Route } from "react-router-dom";
import PropTypes from "prop-types";

const RouteLayout = (props) => {
  const { activeTab, layout: Layout, component: Component, ...rest } = props;
  return (
    <Route
      {...rest}
      render={(matchProps) => {
        return (
          <Layout activeTab={activeTab}>
            <Component {...matchProps} />
          </Layout>
        );
      }}
    />
  );
};

RouteLayout.propTypes = {
  component: PropTypes.any.isRequired,
  layout: PropTypes.any.isRequired,
  path: PropTypes.string,
};

export default RouteLayout;
