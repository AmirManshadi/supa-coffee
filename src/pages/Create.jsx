// react
import { useState } from "react"

// rrd
import { useFetcher, useNavigate } from "react-router-dom"

// chakra ui
import {
	Button,
	FormControl,
	FormLabel,
	Grid,
	Input,
	Textarea,
} from "@chakra-ui/react"

// chakra ui icons
import { EditIcon } from "@chakra-ui/icons"

// supabase
import supabase from "../config/supabaseConfig"

export default function Create() {
	const [title, setTitle] = useState("")
	const [method, setMethod] = useState("")
	const [rating, setRating] = useState("")
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
		if ((title === "") | (method === "") | (rating === "")) {
			return
		}
		const { error } = await supabase
			.from("coffees")
			.insert({ title, method, rating })
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
			mt="8"
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
					placeholder="Title of your coffee"
					required
					value={title}
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
					placeholder="How would you make it"
					required
					rows="10"
					resize="vertical"
					value={method}
					onChange={e => setMethod(e.target.value)}
				/>
			</FormControl>
			<FormControl>
				<FormLabel>rating</FormLabel>
				<Input
					type="number"
					name="rating"
					min={1}
					max={10}
					step={1}
					variant="filled"
					focusBorderColor="purple.400"
					errorBorderColor="orange.300"
					placeholder="Number from 1 to 10"
					required
					value={rating}
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
