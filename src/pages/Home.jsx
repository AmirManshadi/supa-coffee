import { useLoaderData } from "react-router-dom"
import supabase from "../config/supabaseConfig"
import CoffeeCard from "../components/CoffeeCard"
import { SimpleGrid } from "@chakra-ui/react"

export async function HomeLoader() {
	const { data, error } = await supabase.from("coffees").select()
	if (error) {
		throw new Error(error.message)
	}
	return { data }
}

export default function Home() {
	const { data: coffeeRecipes } = useLoaderData()
	return (
		<SimpleGrid minChildWidth="300px" spacing="6">
			{coffeeRecipes.map(coffee => (
				<CoffeeCard key={coffee.id} coffee={coffee}></CoffeeCard>
			))}
		</SimpleGrid>
	)
}
