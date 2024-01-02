type InputProps = {
  type: 'text' | 'password' | 'number';
  placeholder?: string;
};

const Input = ({ type, placeholder }: InputProps) => {
  return <input type={type} placeholder={placeholder} />;
};

export default Input;
