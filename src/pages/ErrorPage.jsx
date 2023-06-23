import { Box, Container, Grid, Heading, Text, VStack } from "@chakra-ui/react"
import { Link, useRouteError } from "react-router-dom"
import citySilhouette from "../assets/city silhouette.png"

export default function ErrorPage() {
	const error = useRouteError()
	console.error(error)

	return (
		<>
			<Container as="header" centerContent my="4">
				<Heading fontFamily="Righteous" color="purple.600">
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
				fontFamily="'Poppins', sans-serif"
			>
				<Grid h={["60dvh", "70dvh", "75dvh"]} placeItems="center">
					<Box
						border="2px"
						borderColor="purple.500"
						borderRadius="md"
						p="5"
						textAlign="center"
						letterSpacing="wide"
						color="blackAlpha.800"
						fontFamily="'Poppins', sans-serif"
					>
						<VStack spacing="4">
							<Heading>Oops!</Heading>
							<Text fontSize={["sm", "md", "lg", "xl"]}>
								Sorry, an unexpected error has occurred.
							</Text>
							<Text fontSize={["sm", "md", "lg", "xl"]}>
								<i>{error.statusText || error.message}</i>
							</Text>
						</VStack>
					</Box>
				</Grid>
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
