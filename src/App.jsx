// rrd
import { RouterProvider, createBrowserRouter } from "react-router-dom"

// layouts
import RootLayout from "./layouts/RootLayout"

// pages
import Home, { HomeLoader } from "./pages/Home"
import Create from "./pages/Create"
import Edit, { EditLoader } from "./pages/Edit"
import ErrorPage from "./pages/ErrorPage"

const router = createBrowserRouter([
	{
		path: "/",
		element: <RootLayout />,
		errorElement: <ErrorPage />,
		children: [
			{
				index: true,
				element: <Home />,
				loader: HomeLoader,
			},
			{
				path: "create",
				element: <Create />,
			},
			{
				path: "/edit/:id",
				element: <Edit />,
        loader: EditLoader,
			},
		],
	},
])

function App() {
	return <RouterProvider router={router} />
}

export default App
