import { Link, useLoaderData } from "react-router-dom"
import supabase from "../config/supabaseConfig"
import CoffeeCard from "../components/CoffeeCard"
import { Button, Flex, HStack, SimpleGrid, Text } from "@chakra-ui/react"
import { useState } from "react"
import { AddIcon } from "@chakra-ui/icons"

export async function HomeLoader() {
	const { data, error } = await supabase.from("coffees").select()
	if (error) {
		throw new Error(error.message)
	}
	return { data }
}

export default function Home() {
	const { data: coffeeRecipes } = useLoaderData()
	const [orderBy, setOrderBy] = useState("title")

	return (
		<>
			<Flex justify="space-between" align="center" mt="10" mb="5">
				<HStack flexWrap="wrap" flexDir={["column", "row"]}>
					<Text color="purple.700">Order by :</Text>
					<Button
						variant="outline"
						colorScheme="purple"
						size="sm"
						_focus={{ bg: "purple.100" }}
						onClick={() => setOrderBy("title")}
					>
						Title
					</Button>
					<Button
						variant="outline"
						colorScheme="purple"
						size="sm"
						_focus={{ bg: "purple.100" }}
						onClick={() => setOrderBy("rating")}
					>
						Rating
					</Button>
					<Button
						variant="outline"
						colorScheme="purple"
						size="sm"
						_focus={{ bg: "purple.100" }}
						onClick={() => setOrderBy("created_at")}
					>
						Date modified
					</Button>
				</HStack>
				<Button
					as={Link}
					to="create"
					variant="outline"
					colorScheme="purple"
					size="sm"
					leftIcon={<AddIcon />}
				>
					Add Coffee
				</Button>
			</Flex>
			<SimpleGrid minChildWidth="300px" spacing="6">
				{coffeeRecipes
					.sort((a, b) => {
						if (a[orderBy] < b[orderBy]) {
							return -1
						}
						if (a[orderBy] > b[orderBy]) {
							return 1
						}
						return 0
					})
					.map(coffee => (
						<CoffeeCard key={coffee.id} coffee={coffee}></CoffeeCard>
					))}
			</SimpleGrid>
		</>
	)
}
