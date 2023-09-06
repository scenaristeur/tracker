import { useFocusEffect } from "@react-navigation/native";
import React, { useState, useCallback } from "react";
import {
	ActivityIndicator,
	FlatList,
	Text,
	View,
	TouchableOpacity,
	StyleSheet,
	Image,
} from "react-native";

// Nav
export default function HomeScreen({ navigation }) {
	// useState
	const [isLoading, setLoading] = useState(true);
	const [data, setData] = useState([]);
	// useState

	// Request
	const getRequest = async () => {
		try {
			const response = await fetch("http://localhost:5000/habit/list", {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			});
			const json = await response.json();
			setData(json);
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	};
	// Request

	useFocusEffect(
		useCallback(() => {
			getRequest();
		}, [])
	);

	// List item
	const Item = ({ item }) => (
		<TouchableOpacity
			onPress={() => {
				navigation.navigate("Post", {
					screen: "Details",
					params: {
						id: item.id,
						habit_id: item.habit_id,
						title: item.title,
						category: item.category,
						begin: item.begin,
						end: item.end,
						goal: item.goal,
						notes: item.notes
					},
				});
			}}
			style={styles.item}
		>
			<Text style={styles.title}>{item.title}</Text>
			<Text style={styles.info}>id {item.habit_id}</Text>
		</TouchableOpacity>
	);
	// List item

	const renderItem = ({ item }) => {
		return <Item item={item} onPress={() => item.id} />;
	};

	return (
		<View style={styles.container}>
			{isLoading ? (
				<ActivityIndicator
					size="large"
					color="#19C279"
					style={{
						position: "absolute",
						top: "42%",
						right: "45%",
					}}
				/>
			) : (
				<FlatList
					data={data}
					keyExtractor={({ id }) => id}
					renderItem={renderItem}
				/>
			)}
			<TouchableOpacity
				style={styles.createButton}
				onPress={() => {
					navigation.navigate("Create");
				}}
			>
				<Image
					source={require("../img/add.png")}
					style={{ width: 24, height: 24 }}
				/>
			</TouchableOpacity>
		</View>
	);
	
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	item: {
		// Post
		backgroundColor: "#19C279",
		padding: 10,
		borderRadius: 10,
		borderColor: "black",
		marginVertical: 10,
		marginHorizontal: 24,
		borderBottomWidth: 3,
		borderRightWidth: 3,
		borderTopWidth: 0.5,
		borderLeftWidth: 0.5,
		opacity: 40,
	},
	title: {
		fontSize: 20,
		fontWeight: "bold",
	},
	info: {
		fontStyle: "italic",
		fontWeight: "200",
		padding: 10,
		fontSize: 10,
	},
	createButton: {
		position: "absolute",
		backgroundColor: "#F2F2F2",
		width: 56,
		height: 56,
		bottom: "2%",
		right: "4%",
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 50,
		borderWidth: 1,
	},
});
