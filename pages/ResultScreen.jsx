// ResultScreen.js
import React, { useEffect, useState } from "react";
import { View, Image, Text, StyleSheet, ScrollView } from "react-native";
import TextRecognition from "@react-native-ml-kit/text-recognition";

const ResultScreen = ({ route }) => {
  const { uri } = route.params;
  const [recognizedText, setRecognizedText] = useState("");

  useEffect(() => {
    const recognizeText = async () => {
      const result = await TextRecognition.recognize(uri);
      setRecognizedText(result.text);

      // printing
      for (let block of result.blocks) {
        console.log("Block text:", block.text);
        console.log("Block frame:", block.frame);

        for (let line of block.lines) {
          console.log("Line text:", line.text);
          console.log("Line frame:", line.frame);
        }
      }
    };

    recognizeText();
  }, [uri]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri }} style={styles.image} />
      <Text>{recognizedText}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    padding: 16,
  },
  image: {
    width: "100%",
    height: 300,
  },
});

export default ResultScreen;
