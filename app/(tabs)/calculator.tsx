import { Delete, Divide, Equal, Minus, Plus, X } from "lucide-react-native";
import { evaluate } from "mathjs";
import { useMemo, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Calculator() {
  const firstRow = useMemo(() => [7, 8, 9], []);
  const secondRow = useMemo(() => [4, 5, 6], []);
  const thirdRow = useMemo(() => [1, 2, 3], []);
  const [text, setText] = useState("");
  const handleAdd = (content: string) => {
    setText((prev) => prev + content);
  };
  const handleDelete = () => {
    setText((prev) => prev.slice(0, -1));
  };

  const handleCalculate = () => {
    try {
      const result = evaluate(text);
      setText(result);
    } catch (_) {
      setText("undefined");
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.highlight}>
        <Text style={styles.highlightContent}>{text}</Text>
      </View>
      <View style={styles.parent}>
        <View style={styles.row}>
          <TouchableOpacity style={[styles.button]} onPress={() => setText("")}>
            <Text style={styles.content}>C</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleDelete}
            onLongPress={() => setText("")}
            delayLongPress={200}
            style={styles.button}
          >
            <Delete />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button]}
            onPress={() => handleAdd("%")}
          >
            <Text style={styles.content}>%</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button]}
            onPress={() => handleAdd("/")}
          >
            <Divide color={"#0A80FF"} />
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          {firstRow.map((s, idx) => {
            const content = idx + 7;
            return (
              <TouchableOpacity
                key={content}
                style={styles.button}
                onPress={() => handleAdd(content.toString())}
              >
                <Text style={styles.content}>{content}</Text>
              </TouchableOpacity>
            );
          })}
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleAdd("*")}
          >
            <X color={"#0A80FF"} />
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          {secondRow.map((s, idx) => {
            const content = idx + 4;
            return (
              <TouchableOpacity
                key={content}
                style={styles.button}
                onPress={() => handleAdd(content.toString())}
              >
                <Text style={styles.content}>{content}</Text>
              </TouchableOpacity>
            );
          })}
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleAdd("-")}
          >
            <Minus color={"#0A80FF"} />
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          {thirdRow.map((s, idx) => {
            const content = idx + 1;
            return (
              <TouchableOpacity
                key={content}
                style={styles.button}
                onPress={() => handleAdd(content.toString())}
              >
                <Text style={styles.content}>{content}</Text>
              </TouchableOpacity>
            );
          })}
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleAdd("+")}
          >
            <Plus color={"#0A80FF"} />
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity
            style={[styles.button, { width: 158 }]}
            onPress={() => handleAdd("0")}
          >
            <Text style={styles.content}>{0}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleAdd(".")}
          >
            <Text style={styles.content}>{"."}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#0A80FF" }]}
            onPress={() => handleCalculate()}
          >
            <Equal color={"white"} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  //   hightlight: { paddingBottom: 20, paddingTop: 250 },
  row: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  highlight: {
    marginTop: "auto",
    paddingHorizontal: "10%",
    paddingBottom: 32,
    width: "100%",
  },
  highlightContent: { textAlign: "right", fontSize: 42 },
  parent: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    paddingBottom: 40,
  },
  button: {
    width: 75,
    height: 75,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 9999,
    borderColor: "rgba(0, 0, 0, 0.1)",
  },
  content: {
    fontSize: 24,
  },
});
