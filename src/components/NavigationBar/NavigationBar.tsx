import React from 'react';
import { Link } from 'react-router-dom';
import NavigationItem from './NavigationItem/NavigationItem';
import styles from './NavigationBar.module.css';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/NavBar';

export interface NavigationItemData {
  text: string;
  link: string;
}

interface NavigationBarProps {
  items: NavigationItemData[];
}

const NavigationBar = (props: NavigationBarProps) => {
  let key = 0;
  const navigationItems = props.items.map((item, index) => (
    //<NavigationItem text={item.text} link={item.link} key={`#navBarItem${key++}`} />
    <Nav.Link as={Link} to={item.link} eventKey={index} key={`#navBarItem${key++}`}>
      {item.text}
    </Nav.Link>
  ));

  return (
    <Navbar bg="light" expand="sm">
      <Nav>{navigationItems}</Nav>
    </Navbar>
  );
};

export default NavigationBar;
