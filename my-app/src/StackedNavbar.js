import Nav from 'react-bootstrap/Nav';

const createNavLink = (item) => {
  return(<Nav.Link key={item} style={{textDecoration: 'underline 1px'}}>{item}</Nav.Link>);
}

function StackedNavbar(props) {
  let items = props.items.split(',');

  return (
    <Nav defaultActiveKey="/home" className="flex-column">
      {/* <Nav.Link href="/home">Active</Nav.Link>
      <Nav.Link eventKey="link-1">Link</Nav.Link>
      <Nav.Link eventKey="link-2">Link</Nav.Link>
      <Nav.Link eventKey="disabled" disabled>
        Disabled
      </Nav.Link> */}
      {items.map((item) => createNavLink(item))}
    </Nav>
  );
}

export default StackedNavbar;