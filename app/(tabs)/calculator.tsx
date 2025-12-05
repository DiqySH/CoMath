import { Equal, Minus, Plus, X } from "lucide-react-native";
import { useMemo } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Calculator() {
  const firstRow = useMemo(() => [7, 8, 9], []);
  const secondRow = useMemo(() => [4, 5, 6], []);
  const thirdRow = useMemo(() => [1, 2, 3], []);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.hightlight}>
        <Text>HALo</Text>
      </View>
      <View style={styles.parent}>
        <View style={styles.row}>
          {firstRow.map((s, idx) => {
            const content = idx + 7;
            return (
              <TouchableOpacity key={content} style={styles.button}>
                <Text style={styles.content}>{content}</Text>
              </TouchableOpacity>
            );
          })}
          <TouchableOpacity style={styles.button}>
            <X color={"#0A80FF"} />
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          {secondRow.map((s, idx) => {
            const content = idx + 4;
            return (
              <TouchableOpacity key={content} style={styles.button}>
                <Text style={styles.content}>{content}</Text>
              </TouchableOpacity>
            );
          })}
          <TouchableOpacity style={styles.button}>
            <Minus color={"#0A80FF"} />
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          {thirdRow.map((s, idx) => {
            const content = idx + 1;
            return (
              <TouchableOpacity key={content} style={styles.button}>
                <Text style={styles.content}>{content}</Text>
              </TouchableOpacity>
            );
          })}
          <TouchableOpacity style={styles.button}>
            <Plus color={"#0A80FF"} />
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity
            style={[
              styles.button,
              { width: 158, alignItems: "flex-start", paddingLeft: 32 },
            ]}
          >
            <Text style={styles.content}>{0}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.content}>{"."}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#0A80FF" }]}
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
  parent: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    marginTop: "auto",
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
