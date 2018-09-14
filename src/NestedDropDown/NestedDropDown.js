import React, { Component } from 'react';
import PropsTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';

import './NestedDropDown.scss';

class NestedDropDown extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showDropdown: false,
      selectedIds: []
    };

    this.handleDropdownToggle = this.handleDropdownToggle.bind(this);
    this.handleSelectedId = this.handleSelectedId.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    const { shouldBeOpen } = props;
    const { showDropdown } = state;

    return shouldBeOpen === false && showDropdown
      ? {
          showDropdown: false,
          selectedIds: []
        }
      : null;
  }

  handleDropdownToggle() {
    this.props.openDropDown();

    this.setState(prevState => ({
      showDropdown: !prevState.showDropdown,
      selectedIds: []
    }));
  }

  handleSelectedId(event, selected, depthLevel) {
    event.stopPropagation();
    event.preventDefault();

    const updatedArray = this.state.selectedIds.slice(0);

    //if the link at the depth level is open close, else set and open
    if (updatedArray[depthLevel] === selected) {
      updatedArray[depthLevel] = null;
      this.setState({
        selectedIds: updatedArray,
        lastClicked: null
      });
    } else {
      updatedArray[depthLevel] = selected;
      this.setState({
        selectedIds: updatedArray,
        lastClicked: selected
      });
    }
  }

  renderHeader(name) {
    const { showDropdown } = this.state;

    return (
      <div className="dropdown__header">
        <span className="dropdown__title">{name}</span>
        {showDropdown ? (
          <FontAwesome className="dropdown__fa" name="angle-up" />
        ) : (
          <FontAwesome className="dropdown__fa" name="angle-down" />
        )}
      </div>
    );
  }

  renderSubMenu(items, depthLevel = 0) {
    if (this.state.showDropdown !== true) {
      return null;
    }

    const classes = ['dropdown__menu'];

    depthLevel === 0
      ? classes.push(`dropdown__menu--left-init`)
      : classes.push(`dropdown__menu--left-align`);

    const menuItems = items.map(item => {
      const hasItems = item.sub_menu && item.sub_menu.length > 0;

      let subMenu;

      // only render selected submenu and only if nested items exist
      if (this.state.selectedIds[depthLevel] === item.link && hasItems) {
        subMenu = this.renderSubMenu(item.sub_menu, depthLevel + 1);
      }

      const menuName = (
        <span>
          {item.name}
          {hasItems ? (
            <FontAwesome className="dropdown__item__fa" name="chevron-left" />
          ) : null}
        </span>
      );

      return (
        <li
          className="dropdown__item"
          key={item.link}
          onClick={event => this.handleSelectedId(event, item.link, depthLevel)}
        >
          {menuName}
          {subMenu}
        </li>
      );
    });

    return (
      <div className={classes.join(' ')}>
        <ul className="dropdown__items">{menuItems}</ul>
      </div>
    );
  }

  render() {
    const { name, sub_menu, shouldBeOpen } = this.props;

    return (
      <div className="dropdown" onClick={this.handleDropdownToggle}>
        {this.renderHeader(name)}
        {shouldBeOpen ? this.renderSubMenu(sub_menu) : null}
      </div>
    );
  }
}

const shape = {
  name: PropsTypes.string.isRequired,
  link: PropsTypes.string.isRequired
};

shape.sub_menu = PropsTypes.arrayOf(PropsTypes.shape(shape));

NestedDropDown.propTypes = {
  name: PropsTypes.string.isRequired,
  shouldBeOpen: PropsTypes.bool.isRequired,
  openDropDown: PropsTypes.func.isRequired,
  sub_menu: PropsTypes.arrayOf(PropsTypes.shape(shape).isRequired).isRequired
};

export default NestedDropDown;
