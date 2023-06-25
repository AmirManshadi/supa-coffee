import { useLoaderData } from "react-router-dom"
import supabase from "../config/supabaseConfig"

export async function HomeLoader() {
	const { data, error } = await supabase.from("coffees").select()
	if (error) {
		throw new Error(error.message)
	}
	return { data }
}

export default function Home() {
	const { data: coffeeRecipes } = useLoaderData()
	console.log(`🚀 ~ Home ~ coffeeRecipes:`, coffeeRecipes)
	return (
		<>
			{coffeeRecipes.map(coffee => (
				<div key={coffee.id}>{coffee.title}</div>
			))}
		</>
	)
}
