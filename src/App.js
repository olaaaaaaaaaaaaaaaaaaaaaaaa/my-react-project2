import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import styles from './App.module.css'
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";

const sendFormData = (formData) => {
    console.log(formData);
};

const fieldsSchema = yup.object().shape({
  email: yup.string().email('Неправильная почта').required('Электронная почта обязательна'),
  password: yup.string()
    .min(8, 'Пароль должен содержать как минимум 8 символов')
    .required('Пароль обязателен'),
  repeatpassword: yup.string()
    .oneOf([yup.ref('password'), null], 'Пароли должны совпадать')
    .required('Повторите пароль'),
});

const App = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: '',
      password: '',
      repeatpassword: ''
    },
    resolver: yupResolver(fieldsSchema),
  });

  const emailError = errors.email?.message;
  const passwordError = errors.password?.message;
  const repeatPasswordError = errors.repeatpassword?.message;

  return (
    <div className={styles.wrapper}>
      <h1>Login</h1>
      <form onSubmit={handleSubmit(sendFormData)}>
        {emailError && <div className={styles.error}>{emailError}</div>}
        {passwordError && <div className={styles.error}>{passwordError}</div>}
        {repeatPasswordError && <div className={styles.error}>{repeatPasswordError}</div>}

        <div className={styles.inputBox}>
          <input name='email' type='email' {...register('email')} placeholder='Email' />
          <FaUser className={styles.icon} />
        </div>
        <div className={styles.inputBox}>
          <input name='password' type='password' {...register('password')} placeholder='Password' />
          <FaLock className={styles.icon} />
        </div>
        <div className={styles.inputBox}>
          <input name='repeatpassword' type='password' {...register('repeatpassword')} placeholder='Repeat Password' />
          <FaLock className={styles.icon} />
        </div>
        <button className={styles.btn} type="submit" disabled={!!emailError || !!passwordError || !!repeatPasswordError}>Отправить</button>
      </form>
    </div>
  );
};

export default App;
