import { useState } from 'react'
import reactLogo from '../../assets/react.svg'
import viteLogo from '../../assets/vite.svg'
import './Home.css'
// import { prisma } from '../../lib/prisma'

function Home() {
	const [count, setCount] = useState(0)
	
	// useEffect(() => {
	// 	getUser() 
	// }, [])

	// async function getUser() {
	// 	const users = await prisma.user.findMany();
	// 	console.log(JSON.stringify(users, null, 2))
	// }

	return (
		<>
			<div>
				<a href="https://vitejs.dev" target="_blank">
					<img src={viteLogo} className="logo" alt="Vite logo" />
				</a>
				<a href="https://react.dev" target="_blank">
					<img src={reactLogo} className="logo react" alt="React logo" />
				</a>
			</div>
			<h1>Vite + React</h1>
			<div className="card">
				<button onClick={() => setCount((count) => count + 1)}>
					count is {count}
				</button>
				<p>
					Edit <code>src/Home.tsx</code> and save to test HMR
				</p>
			</div>
			<p className="read-the-docs">
				Click on the Vite and React logos to learn more
			</p>
		</>
	)
}

export default Home
