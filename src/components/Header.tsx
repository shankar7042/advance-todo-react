interface HeaderProps {
  header: string;
}

const Header = ({ header }: HeaderProps) => {
  return <h1 className="text-center text-8xl text-red-700">{header}</h1>;
};

export default Header;
