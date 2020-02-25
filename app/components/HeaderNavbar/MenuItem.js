import React from 'react';
import PropTypes from 'prop-types';
import { NavLink as RouteNavLink } from 'react-router-dom';
import {
  NavItem,
  NavLink,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'shards-react';

class MenuItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };

    this.toggleDropdown = this.toggleDropdown.bind(this);
  }

  toggleDropdown() {
    this.setState({
      open: !this.state.open,
    });
  }

  render() {
    const { item } = this.props;
    if (item.items) {
      // For dropdown
      return (
        <Dropdown
          className="nav-item"
          open={this.state.open}
          toggle={this.toggleDropdown}
        >
          <DropdownToggle nav caret>
            {item.title}
          </DropdownToggle>
          <DropdownMenu small>
            {item.items.map((item, idx) => (
              <DropdownItem key={idx} tag={RouteNavLink} to={item.to}>
                {item.title}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
      );
    }

    return (
      <NavItem>
        <NavLink tag={RouteNavLink} to={item.to} className="text-nowrap">
          <item.icon />
          {item.title}
        </NavLink>
      </NavItem>
    );
  }
}

MenuItem.propTypes = {
  /**
   * The menu item object.
   */
  item: PropTypes.object,
};

export default MenuItem;
