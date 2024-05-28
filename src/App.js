import styles from './app.module.css';
import { useState, useEffect, useRef } from 'react';

const sendFormData = (formData) => {
	console.log(formData);
};

export const App = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [password2, setPassword2] = useState('');
	const [loginError, setLoginError] = useState(null);

	const onEmailChange = ({ target }) => {
		const emailValue = target.value;
		setEmail(emailValue);

		if (!emailValue) {
			setLoginError('Введите e-mail!');
		} else {
			setLoginError(null);
		}
	};

	const onPasswordChange = ({ target }) => {
		const passwordValue = target.value;
		setPassword(passwordValue);

		let newError = null;
		if (!/^[\w_]*$/.test(passwordValue)) {
			newError =
				'Неверный логин. Допустимые символы: буквы, цифры и нижнее подчёркивание';
		} else if (passwordValue.length > 10) {
			newError = 'Неверный логин. Должно быть не больше 10 символов';
		}

		setLoginError(newError);
	};

	const onEmailBlur = () => {
		const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailPattern.test(email)) {
			setLoginError('Неверный формат e-mail!');
		}
	};

	const onPasswordBlur = () => {
		if (password.length < 3) {
			setLoginError('Неверный логин. Должно быть не меньше 3 символов');
		}
	};

	const onPassword2Blur = () => {
		if (password !== password2) {
			setLoginError(
				'Повторный пароль не совпадает с первоначальным, повторите пароль',
			);
			setPassword('');
			setPassword2('');
		} else {
			setLoginError(null);
		}
	};

	const submitButtonRef = useRef(null);

	useEffect(() => {
		if (!loginError && email && password && password2 && password === password2) {
			submitButtonRef.current.focus();
		}
	}, [loginError, email, password, password2]);

	const onSubmit = (event) => {
		event.preventDefault();

		if (!email) {
			setLoginError('Введите e-mail!');
			return;
		}

		const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailPattern.test(email)) {
			setLoginError('Неверный формат e-mail!');
			return;
		}

		if (loginError) {
			return;
		}

		sendFormData({ email, password });
		console.log(email, password);
	};

	return (
		<div className={styles.app}>
			{loginError && <div className={styles.error}>{loginError}</div>}
			<form onSubmit={onSubmit}>
				<input
					name="email"
					type="email"
					placeholder="e-mail"
					value={email}
					onChange={onEmailChange}
					onBlur={onEmailBlur}
					required
				/>
				<input
					name="password"
					type="password"
					placeholder="Пароль"
					value={password}
					onChange={onPasswordChange}
					onBlur={onPasswordBlur}
					required
				/>
				<input
					name="password2"
					type="password"
					placeholder="Повторите Пароль"
					value={password2}
					onChange={({ target }) => setPassword2(target.value)}
					onBlur={onPassword2Blur}
					disabled={loginError}
				/>
				<button
					type="submit"
					disabled={
						loginError ||
						!email ||
						!password ||
						!password2 ||
						password !== password2
					}
					ref={submitButtonRef}
				>
					Зарегистрироваться
				</button>
			</form>
		</div>
	);
};
