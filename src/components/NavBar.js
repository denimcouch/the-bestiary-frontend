import React from "react";
import { Header, Menu } from "semantic-ui-react";

function NavBar(props) {
  let { changeView } = props;
  return (
    <div>
      <div className="navbar-header">
        <Header as="h1">Adventurer's Arena</Header>
      </div>
      <div className="navbar-menu">
        <Menu>
          <Menu.Item id="home" onClick={(e) => changeView(e.target.id)}>
            Home
          </Menu.Item>
          <Menu.Item
            id="manage encounters"
            onClick={(e) => changeView(e.target.id)}
          >
            Manage Encounters
          </Menu.Item>
          <Menu.Item id="log out" onClick={(e) => changeView(e.target.id)}>
            Log out
          </Menu.Item>
        </Menu>
      </div>
    </div>
  );
}

export default NavBar;