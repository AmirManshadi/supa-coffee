// react
import { useState } from "react"

// rrd
import { useFetcher, useLoaderData, useNavigate } from "react-router-dom"

// supabase
import supabase from "../config/supabaseConfig"

// chakra ui
import {
	Button,
	FormControl,
	FormHelperText,
	FormLabel,
	Grid,
	Input,
	Textarea,
} from "@chakra-ui/react"

// chakra ui icons
import { EditIcon } from "@chakra-ui/icons"

// loader function
export async function EditLoader({ params }) {
	const {
		data: [coffee],
		error,
	} = await supabase.from("coffees").select().eq("id", params.id)
	if (error) throw new Error(error.message)
	return { coffee }
}

export default function Edit() {
	const { coffee } = useLoaderData()
	const [prevTitle, setTitle] = useState(coffee.title)
	const [prevMethod, setMethod] = useState(coffee.method)
	const [prevRating, setRating] = useState(coffee.rating)
	const fetcher = useFetcher()
	const [isSubmitting, setIsSubmitting] = useState(
		fetcher.state === "submitting"
	)
	const navigate = useNavigate()

	async function handleSubmit(e) {
		e.preventDefault()
		setIsSubmitting(true)
		const formData = new FormData(e.target)
		const { title, method, rating } = Object.fromEntries(formData)
		const { error } = await supabase
			.from("coffees")
			.update({ title, method, rating })
			.eq("id", coffee.id)
		if (error) throw new Error(error.message)
		navigate("/")
	}

	return (
		<Grid
			as={fetcher.Form}
			id="editForm"
			templateColumns="1fr"
			templateRows="repeat(4, auto)"
			gap="6"
			maxWidth={["300px", "400px"]}
			mx="auto"
			onSubmit={handleSubmit}
		>
			<FormControl>
				<FormLabel>title</FormLabel>
				<Input
					type="text"
					name="title"
					variant="filled"
					focusBorderColor="purple.400"
					errorBorderColor="orange.300"
					required
					value={prevTitle}
					onChange={e => setTitle(e.target.value)}
				/>
			</FormControl>
			<FormControl>
				<FormLabel>method</FormLabel>
				<Textarea
					name="method"
					variant="filled"
					focusBorderColor="purple.400"
					errorBorderColor="orange.300"
					required
					rows="10"
					resize="vertical"
					value={prevMethod}
					onChange={e => setMethod(e.target.value)}
				/>
			</FormControl>
			<FormControl>
				<FormLabel>
					rating
					<FormHelperText fontSize="xs">From 1 to 10</FormHelperText>
				</FormLabel>
				<Input
					type="number"
					name="rating"
					min={1}
					max={10}
					step={1}
					variant="filled"
					focusBorderColor="purple.400"
					errorBorderColor="orange.300"
					required
					value={prevRating}
					onChange={e => setRating(e.target.value)}
				/>
			</FormControl>
			<FormControl>
				<Button
					type="submit"
					isLoading={isSubmitting}
					loadingText="Submitting"
					leftIcon={<EditIcon />}
					colorScheme="purple"
					variant="solid"
					w="100%"
				>
					Submit
				</Button>
			</FormControl>
		</Grid>
	)
}
