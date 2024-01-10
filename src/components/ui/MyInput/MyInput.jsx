import './MyInput.css';

export default function MyInput({ value, onChange, className: classList = '', ...props }) {
  const changeHandler = (e) => {
    onChange(e.target.value);
  };

  return <input value={value} onChange={changeHandler} className={`${classList} input`} {...props} />;
}
