import './MyInput.css';

export default function MyInput({ className: classList = '', ...props }) {
  return <input className={`${classList} input`} {...props} />;
}
