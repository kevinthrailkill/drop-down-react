import React, { Component } from 'react';
import './App.scss';

import NestedDropDown from './NestedDropDown/NestedDropDown';

const menu = [
  {
    name: 'Engineering',
    link: 'engineering',
    sub_menu: [
      {
        name: 'Data',
        link: 'data',
        sub_menu: [
          {
            name: 'Science',
            link: 'science'
          },
          {
            name: 'Operations',
            link: 'operations'
          }
        ]
      }
    ]
  },
  {
    name: 'Marketing',
    link: 'marketing',
    sub_menu: [
      {
        name: 'Communication',
        link: 'communication',
        sub_menu: [
          {
            name: 'Phone',
            link: 'phone',
            sub_menu: [
              {
                name: 'Phone 1',
                link: 'phone1'
              },
              {
                name: 'Email 1',
                link: 'email1'
              }
            ]
          },
          {
            name: 'Email',
            link: 'email',
            sub_menu: [
              {
                name: 'Phone 2',
                link: 'phone2'
              },
              {
                name: 'Email 2',
                link: 'email2'
              }
            ]
          }
        ]
      }
    ]
  }
];

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentLinkOpen: null
    };

    this.openDropDown = this.openDropDown.bind(this);
  }

  openDropDown(link) {
    const { currentLinkOpen } = this.state;

    const newLink = currentLinkOpen === link ? null : link;

    this.setState({
      currentLinkOpen: newLink
    });
  }

  render() {
    const { currentLinkOpen } = this.state;

    console.log('Curr link open = ' + this.state.currentLinkOpen);
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">VideoAmp</h1>
          <div className="App-menu">
            {menu.map(menuItem => {
              return (
                <NestedDropDown
                  name={menuItem.name}
                  key={menuItem.link}
                  sub_menu={menuItem.sub_menu}
                  openDropDown={() => this.openDropDown(menuItem.link)}
                  shouldBeOpen={
                    currentLinkOpen === menuItem.link ||
                    currentLinkOpen === null
                      ? true
                      : false
                  }
                />
              );
            })}
          </div>
        </header>
      </div>
    );
  }
}

export default App;
