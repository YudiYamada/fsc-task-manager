type HeaderProps = {
  children: React.ReactNode;
};

const Header = (props: HeaderProps) => {
  return <header>{props.children}</header>;
};

export default Header;
