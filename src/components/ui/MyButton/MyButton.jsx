import './MyButton.css';

export default function MyButton({ className: classList = '', children, ...props }) {
  return (
    <button className={`${classList} button`} {...props}>
      {children}
    </button>
  );
}
