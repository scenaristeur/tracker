import { React, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Modal,
  Pressable,
  ActivityIndicator,
} from "react-native";

// Nav
export default function CreateScreen({ navigation }) {
  // useState
  const [isLoading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [begin, setBegin] = useState("");
  const [end, setEnd] = useState("");
  const [goal, setGoal] = useState("");
  const [notes, setNotes] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  // useState

  // Request
  const postRequest = async () => {
    setLoading(true);
    const randomHabitId = Math.floor(Math.random() * (3999 - 11 + 1) + 11);
    try {
      const response = await fetch("http://localhost:5000/habit/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          habit_id: randomHabitId,
          title: title,
          category: category,
          begin: begin,
          end: end,
          goal: goal,
          notes: notes,
        }),
      });

      // Res status
      if (response.status == 201) {
        setModalMessage(`Habit created with random user_id: ${randomHabitId}`);
      } else {
        setModalMessage("Unknown error");
      }
      // Res status
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setModalVisible(true);
    }
  };
  // Request

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        multiline
        onChangeText={setTitle}
        value={title}
        maxLength={200}
        placeholder="Enter post title"
      />
      <TextInput
        style={styles.input}
        multiline
        onChangeText={setCategory}
        value={category}
        placeholder="Enter habit category"
      />
      <TextInput
        style={styles.input}
        onChangeText={setBegin}
        value={begin}
        type="datetime-local"
      />
      <TextInput
        style={styles.input}
        multiline
        onChangeText={setEnd}
        value={end}
        placeholder="Enter end"
      />
      <TextInput
        style={styles.input}
        multiline
        onChangeText={setGoal}
        value={goal}
        placeholder="Enter goals"
      />
      <TextInput
        style={styles.input}
        multiline
        onChangeText={setNotes}
        value={notes}
        placeholder="Enter habit notes"
      />

      <TouchableOpacity style={styles.postButton} onPress={postRequest}>
        <Image
          source={require("../img/paper-plane.png")}
          style={{ width: 24, height: 24 }}
        />
      </TouchableOpacity>

      {/* Loading */}
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
        <Modal animationType="fade" transparent={true} visible={modalVisible}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>{modalMessage}</Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => navigation.navigate("Home")}
              >
                <Text style={styles.textStyle}>Back to home</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      )}
      {/* Loading */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    marginHorizontal: 24,
    flex: 1,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
  },
  input: {
    // Text input
    borderRadius: 10,
    borderBottomWidth: 3,
    borderRightWidth: 3,
    borderTopWidth: 0.5,
    borderLeftWidth: 0.5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    fontSize: 14,
    lineHeight: 24,
  },
  postButton: {
    // Post
    position: "absolute",
    backgroundColor: "#F2F2F2",
    width: 56,
    height: 56,
    bottom: "0.5%",
    right: "-2.6%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    borderWidth: 1,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    //Modal
    margin: 20,
    backgroundColor: "#F2F2F2",
    borderRadius: 10,
    paddingHorizontal: 35,
    paddingVertical: 20,
    alignItems: "center",
    borderBottomWidth: 3,
    borderRightWidth: 3,
    borderTopWidth: 0.5,
    borderLeftWidth: 0.5,
  },
  button: {
    borderRadius: 10,
    padding: 10,
  },
  buttonClose: {
    backgroundColor: "#50C27A",
    borderBottomWidth: 3,
    borderRightWidth: 3,
    borderTopWidth: 0.5,
    borderLeftWidth: 0.5,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    fontWeight: "bold",
    marginBottom: 14,
    textAlign: "center",
  },
});
