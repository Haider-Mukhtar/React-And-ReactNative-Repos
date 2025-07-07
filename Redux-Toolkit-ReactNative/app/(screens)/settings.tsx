import { useTheme } from "@/components/theme-context";
import { RootState } from "@/store";
import { setTheme } from "@/store/slices/theme";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

export default function ThemeScreen() {
  const dispatch = useDispatch();
  const storedTheme = useSelector((state: RootState) => state.theme.theme);
  const { colors } = useTheme();

  const themes: AppTheme[] = ["light", "dark", "system"];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {themes.map((theme) => (
        <TouchableOpacity
          key={theme}
          style={[
            styles.item,
            { borderBottomColor: colors.border, backgroundColor: storedTheme === theme ? colors.secondary : "transparent" }
          ]}
          onPress={() => dispatch(setTheme(theme))}
          activeOpacity={0.7}
        >
          <Text style={{ color: colors.text }}>
            {theme.charAt(0).toUpperCase() + theme.slice(1)}
          </Text>
          {storedTheme === theme && (
            <Text style={{ color: colors.primary }}>✓</Text>
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
});