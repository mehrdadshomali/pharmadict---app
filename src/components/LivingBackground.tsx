// LivingBackground.tsx - Deprecated, kept for compatibility
import React from "react";
import { View, StyleSheet } from "react-native";

const LivingBackground: React.FC = () => {
  // This component is no longer used in the new design
  // Kept for backward compatibility
  return <View style={styles.container} />;
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
  },
});

export default LivingBackground;
