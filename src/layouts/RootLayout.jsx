// rrd
import { Link, Outlet } from "react-router-dom"

// chakra ui
import { Box, Container, Heading } from "@chakra-ui/react"

// assets
import citySilhouette from "../assets/city silhouette.png"

export default function RootLayout() {
	return (
		<>
			<Container as="header" centerContent my="4">
				<Heading fontFamily="Righteous">
					<Link to="/">SupaCoffee</Link>
				</Heading>
			</Container>
			<Container
				as="main"
				maxW={{
					base: "container.sm",
					md: "container.md",
					lg: "container.lg",
					xl: "container.xl",
				}}
			>
				<Outlet />
			</Container>
			<Box as="footer" pos="fixed" bottom="0">
				<img
					src={citySilhouette}
					alt="Kaiser Wilhelm Bridge Silhouette"
					style={{
						width: "100%",
						display: "block",
						opacity: 0.75,
					}}
				/>
			</Box>
		</>
	)
}
