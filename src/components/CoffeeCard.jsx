// rrd
import { Link } from "react-router-dom"

// chakra ui
import {
	Box,
	Button,
	Card,
	CardBody,
	CardFooter,
	CardHeader,
} from "@chakra-ui/react"

// chakra ui icons
import { DeleteIcon, EditIcon } from "@chakra-ui/icons"
import supabase from "../config/supabaseConfig"

export default function CoffeeCard({ coffee }) {
	const customStyles = {
		card: {
			borderRadius: "md",
			shadow: "lg",
			pos: "relative",
			gap: "5",
		},
		cardHeader: {
			pb: "0",
			fontFamily: "'Righteous', cursive",
			fontSize: "lg",
			color: "blackAlpha.900",
		},
		cardBody: {
			py: "0",
			fontSize: "sm",
			color: "blackAlpha.800",
		},
		cardFooter: {
			pt: "0",
		},
		box: {
			display: "grid",
			placeItems: "center",
			pos: "absolute",
			bottom: "0",
			right: "0",
			w: "40px",
			borderBottomRightRadius: "md",
			borderTopLeftRadius: "md",
			aspectRatio: "1/1",
			bg: "purple.200",
			fontFamily: "'Righteous', cursive",
		},
	}

	async function deleteCoffee(e) {
		const { error } = await supabase
			.from("coffees")
			.delete()
			.eq("id", coffee.id)
		if (error) throw new Error(error.message)
		let nearestParent = e.target.parentNode
		while (nearestParent && !nearestParent.classList.contains("chakra-card")) {
			nearestParent = nearestParent.parentNode
		}
		nearestParent.remove()
		return
	}

	return (
		<Card sx={customStyles.card}>
			<CardHeader sx={customStyles.cardHeader}>{coffee.title}</CardHeader>
			<CardBody sx={customStyles.cardBody}>{coffee.method}</CardBody>
			<CardFooter sx={customStyles.cardFooter}>
				<Button
					p="0"
					colorScheme="purple"
					variant="ghost"
					mr="4"
					onClick={deleteCoffee}
				>
					<DeleteIcon fontSize="sm" />
				</Button>
				<Button
					as={Link}
					to={`edit/${coffee.id}`}
					p="0"
					colorScheme="purple"
					variant="ghost"
				>
					<EditIcon fontSize="sm" />
				</Button>
			</CardFooter>
			<Box sx={customStyles.box}>{coffee.rating}</Box>
		</Card>
	)
}
