import './AuthForm.css';
import MyButton from '../ui/MyButton/MyButton';

export default function AuthForm({ submitBtnText, onSubmitHandler, children }) {
  console.log(children);
  const submitHandler = (e) => {
    e.preventDefault();
    onSubmitHandler();
  };

  return (
    <form className="auth-form" onSubmit={submitHandler}>
      <ul className="auth-form__input-list">
        {children.map((item) => {
          return (
            <li className="auth-form__input-list-item" key={item.props.name}>
              {item}
            </li>
          );
        })}
      </ul>
      <MyButton className="auth-form__btn">{submitBtnText}</MyButton>
    </form>
  );
}
