import { RouterProvider, createBrowserRouter } from "react-router-dom"
import RootLayout from "./layouts/RootLayout"
import Home from "./pages/Home"
import Create from "./pages/Create"
import Edit from "./pages/Edit"

const router = createBrowserRouter([
	{
		path: "/",
		element: <RootLayout />,
		children: [
			{
				index: true,
				element: <Home />,
			},
			{
				path: "create",
				element: <Create />,
			},
			{
				path: "/edit/:id",
				element: <Edit />,
			},
		],
	},
])

function App() {
	return <RouterProvider router={router} />
}

export default App
