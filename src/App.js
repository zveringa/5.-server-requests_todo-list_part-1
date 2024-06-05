import styles from './app.module.css';
import { useState, useEffect } from 'react';

export const App = () => {
	const [todos, setTodos] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setIsLoading(true);
		fetch('https://jsonplaceholder.typicode.com/todos')
			.then((loadedData) => loadedData.json())
			.then((loadedTodos) => {
				setTodos(loadedTodos);
			})
			.finally(() => setIsLoading(false));
	}, []);

	return (

		<div className={styles.app}>
			<div className={styles.header}>Здесь твой список дел:</div>


			{isLoading ? (
				<>
					<div className={styles.headingLoader}>Please wait, the page is loading!</div>
					<div className={styles.loader}></div>
				</>
			) : (
				todos.map(({ id, title, completed }) => (
					<div key={id} className={styles.list}>
						<input className={styles.checkbox} type='checkbox' checked={completed} readOnly />
						# {id}: - {title}
					</div>
				))
			)}
		</div>

	);
};
