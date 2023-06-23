import { RouterProvider, createBrowserRouter } from "react-router-dom"

const router = createBrowserRouter([
	{
		path: "/",
		element: null,
	},
])

function App() {
	return <RouterProvider router={router} />
}

export default App
