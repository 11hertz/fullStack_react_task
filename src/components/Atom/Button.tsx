type ButtonProps = {
  title: string;
  fn?: () => void;
};

const Button = ({ title }: ButtonProps) => {
  return <button>{title}</button>;
};

export default Button;
