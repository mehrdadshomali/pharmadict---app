// MiniQuizCard.tsx - Premium Quiz Widget
import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "../context/ThemeContext";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
}

const allQuestions: Question[] = [
  // Set 1
  {
    id: 1,
    question: "Aspirin'in etken maddesi nedir?",
    options: ["Parasetamol", "Asetilsalisilik Asit", "İbuprofen"],
    correctAnswer: "Asetilsalisilik Asit",
  },
  {
    id: 2,
    question: "Hangi vitamin güneş ışığından sentezlenir?",
    options: ["Vitamin A", "Vitamin D", "Vitamin C"],
    correctAnswer: "Vitamin D",
  },
  {
    id: 3,
    question: "Kalp atışını düzenleyen mineral hangisidir?",
    options: ["Demir", "Potasyum", "Kalsiyum"],
    correctAnswer: "Potasyum",
  },
  {
    id: 4,
    question: "Hangi bitki antioksidan özelliği ile bilinir?",
    options: ["Zencefil", "Yeşil Çay", "Kekik"],
    correctAnswer: "Yeşil Çay",
  },
  // Set 2
  {
    id: 5,
    question: "Penisilin hangi kaynaktan elde edilir?",
    options: ["Bakteri", "Mantar", "Bitki"],
    correctAnswer: "Mantar",
  },
  {
    id: 6,
    question: "Hangi organ insülini üretir?",
    options: ["Karaciğer", "Pankreas", "Böbrek"],
    correctAnswer: "Pankreas",
  },
  {
    id: 7,
    question: "Demir eksikliği hangi hastalığa yol açar?",
    options: ["Osteoporoz", "Anemi", "Diyabet"],
    correctAnswer: "Anemi",
  },
  {
    id: 8,
    question: "Hangi vitamin kan pıhtılaşması için gereklidir?",
    options: ["Vitamin K", "Vitamin E", "Vitamin B12"],
    correctAnswer: "Vitamin K",
  },
  // Set 3
  {
    id: 9,
    question: "Morfin hangi bitkiden elde edilir?",
    options: ["Haşhaş", "Lavanta", "Papatya"],
    correctAnswer: "Haşhaş",
  },
  {
    id: 10,
    question: "Hangi hormon stres durumunda salgılanır?",
    options: ["İnsülin", "Kortizol", "Melatonin"],
    correctAnswer: "Kortizol",
  },
  {
    id: 11,
    question: "Antibiyotikler hangi mikroorganizmalara karşı etkilidir?",
    options: ["Virüsler", "Bakteriler", "Mantarlar"],
    correctAnswer: "Bakteriler",
  },
  {
    id: 12,
    question: "Hangi vitamin bağışıklık sistemini güçlendirir?",
    options: ["Vitamin C", "Vitamin B1", "Vitamin A"],
    correctAnswer: "Vitamin C",
  },
  // Set 4
  {
    id: 13,
    question: "Parasetamol hangi amaçla kullanılır?",
    options: ["Ağrı kesici", "Antibiyotik", "Antidepresan"],
    correctAnswer: "Ağrı kesici",
  },
  {
    id: 14,
    question: "Hangi element kemik sağlığı için önemlidir?",
    options: ["Demir", "Kalsiyum", "Çinko"],
    correctAnswer: "Kalsiyum",
  },
  {
    id: 15,
    question: "Melatonin hormonu ne işe yarar?",
    options: ["Uyku düzenleme", "Sindirim", "Kas gelişimi"],
    correctAnswer: "Uyku düzenleme",
  },
  {
    id: 16,
    question: "Hangi bitki mide rahatsızlıklarında kullanılır?",
    options: ["Nane", "Gül", "Orkide"],
    correctAnswer: "Nane",
  },
  // Set 5
  {
    id: 17,
    question: "İbuprofen hangi ilaç grubuna aittir?",
    options: ["Antibiyotik", "NSAİİ", "Antiviral"],
    correctAnswer: "NSAİİ",
  },
  {
    id: 18,
    question: "Hangi vitamin göz sağlığı için önemlidir?",
    options: ["Vitamin A", "Vitamin D", "Vitamin B6"],
    correctAnswer: "Vitamin A",
  },
  {
    id: 19,
    question: "Kafein hangi etkiye sahiptir?",
    options: ["Sakinleştirici", "Uyarıcı", "Uyuşturucu"],
    correctAnswer: "Uyarıcı",
  },
  {
    id: 20,
    question: "Hangi organ vücuttaki toksinleri filtreler?",
    options: ["Kalp", "Karaciğer", "Akciğer"],
    correctAnswer: "Karaciğer",
  },
  // Set 6
  {
    id: 21,
    question: "Omega-3 yağ asitleri en çok nerede bulunur?",
    options: ["Kırmızı et", "Balık", "Tavuk"],
    correctAnswer: "Balık",
  },
  {
    id: 22,
    question: "Hangi madde alerjik reaksiyonlarda salınır?",
    options: ["Histamin", "Dopamin", "Serotonin"],
    correctAnswer: "Histamin",
  },
  {
    id: 23,
    question: "Probiyotikler nerede bulunur?",
    options: ["Yoğurt", "Ekmek", "Pirinç"],
    correctAnswer: "Yoğurt",
  },
  {
    id: 24,
    question: "Hangi vitamin sinir sistemi için gereklidir?",
    options: ["Vitamin B12", "Vitamin E", "Vitamin K"],
    correctAnswer: "Vitamin B12",
  },
];

const MiniQuizCard: React.FC = () => {
  const { colors, isDark } = useTheme();
  const [questionSet, setQuestionSet] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [totalAnswered, setTotalAnswered] = useState(0);
  const shakeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  // Get current 4 questions based on questionSet
  const QUESTIONS_PER_SET = 4;
  const totalSets = Math.ceil(allQuestions.length / QUESTIONS_PER_SET);
  const currentQuestions = allQuestions.slice(
    questionSet * QUESTIONS_PER_SET,
    (questionSet + 1) * QUESTIONS_PER_SET
  );
  const currentQuestion = currentQuestions[currentQuestionIndex];

  useEffect(() => {
    setSelectedOption(null);
    setShowResult(false);
    scaleAnim.setValue(1);
    shakeAnim.setValue(0);
  }, [currentQuestionIndex, questionSet]);

  const handleOptionSelect = (option: string) => {
    if (showResult) return;
    setSelectedOption(option);
    const correct = option === currentQuestion.correctAnswer;
    setIsCorrect(correct);
    setShowResult(true);
    setTotalAnswered(totalAnswered + 1);
    if (correct) {
      setScore(score + 1);
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.05,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.sequence([
        Animated.timing(shakeAnim, {
          toValue: 8,
          duration: 50,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnim, {
          toValue: -8,
          duration: 50,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnim, {
          toValue: 8,
          duration: 50,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnim, {
          toValue: 0,
          duration: 50,
          useNativeDriver: true,
        }),
      ]).start();
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < currentQuestions.length - 1) {
      // Next question in current set
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Move to next set of 4 questions
      const nextSet = (questionSet + 1) % totalSets;
      setQuestionSet(nextSet);
      setCurrentQuestionIndex(0);
      if (nextSet === 0) {
        // Reset score when all sets completed
        setScore(0);
        setTotalAnswered(0);
      }
    }
  };

  const getOptionState = (option: string) => {
    if (!showResult) return selectedOption === option ? "selected" : "default";
    if (option === currentQuestion.correctAnswer) return "correct";
    if (option === selectedOption && !isCorrect) return "wrong";
    return "default";
  };

  const progress = ((currentQuestionIndex + 1) / currentQuestions.length) * 100;

  return (
    <View style={{ marginHorizontal: 20, marginBottom: 24 }}>
      <LinearGradient
        colors={isDark ? ["#1A2332", "#151B23"] : ["#FFFFFF", "#F9FAFB"]}
        style={[styles.card, { borderColor: colors.border }]}
      >
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <LinearGradient
              colors={["#F59E0B", "#D97706"]}
              style={styles.trophyBadge}
            >
              <Ionicons name="trophy" size={16} color="#FFFFFF" />
            </LinearGradient>
            <View>
              <Text style={[styles.headerTitle, { color: colors.text }]}>
                Bilgi Yarışması
              </Text>
              <Text
                style={[styles.setIndicator, { color: colors.textTertiary }]}
              >
                Set {questionSet + 1}/{totalSets}
              </Text>
            </View>
          </View>
          <View
            style={[styles.scoreBadge, { backgroundColor: colors.primaryGlow }]}
          >
            <Ionicons name="star" size={14} color={colors.primary} />
            <Text style={[styles.scoreText, { color: colors.primary }]}>
              {score}/{totalAnswered}
            </Text>
          </View>
        </View>
        <View
          style={[
            styles.progressContainer,
            { backgroundColor: colors.backgroundSecondary },
          ]}
        >
          <LinearGradient
            colors={colors.gradientPrimary as [string, string]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={[styles.progressBar, { width: `${progress}%` }]}
          />
        </View>
        <Text style={[styles.questionNumber, { color: colors.textTertiary }]}>
          Soru {currentQuestionIndex + 1}/{currentQuestions.length}
        </Text>
        <Text style={[styles.questionText, { color: colors.text }]}>
          {currentQuestion.question}
        </Text>
        <Animated.View
          style={[
            styles.optionsContainer,
            { transform: [{ translateX: shakeAnim }, { scale: scaleAnim }] },
          ]}
        >
          {currentQuestion.options.map((option, index) => {
            const state = getOptionState(option);
            const isCorrectOpt = option === currentQuestion.correctAnswer;
            return (
              <TouchableOpacity
                key={index}
                style={[
                  styles.option,
                  {
                    backgroundColor:
                      state === "correct"
                        ? colors.successLight
                        : state === "wrong"
                        ? colors.errorLight
                        : state === "selected"
                        ? colors.primaryGlow
                        : colors.backgroundSecondary,
                    borderColor:
                      state === "correct"
                        ? colors.success
                        : state === "wrong"
                        ? colors.error
                        : state === "selected"
                        ? colors.primary
                        : colors.border,
                  },
                ]}
                onPress={() => handleOptionSelect(option)}
                activeOpacity={0.7}
                disabled={showResult}
              >
                <View
                  style={[
                    styles.optionIndicator,
                    {
                      backgroundColor:
                        state === "correct"
                          ? colors.success
                          : state === "wrong"
                          ? colors.error
                          : state === "selected"
                          ? colors.primary
                          : colors.border,
                    },
                  ]}
                >
                  <Text style={styles.optionLetter}>
                    {String.fromCharCode(65 + index)}
                  </Text>
                </View>
                <Text
                  style={[
                    styles.optionText,
                    {
                      color:
                        state === "correct"
                          ? colors.success
                          : state === "wrong"
                          ? colors.error
                          : colors.text,
                    },
                  ]}
                >
                  {option}
                </Text>
                {showResult && isCorrectOpt && (
                  <Ionicons
                    name="checkmark-circle"
                    size={20}
                    color={colors.success}
                  />
                )}
                {showResult && option === selectedOption && !isCorrect && (
                  <Ionicons
                    name="close-circle"
                    size={20}
                    color={colors.error}
                  />
                )}
              </TouchableOpacity>
            );
          })}
        </Animated.View>
        {showResult && (
          <View style={styles.resultContainer}>
            <View
              style={[
                styles.resultBadge,
                {
                  backgroundColor: isCorrect
                    ? colors.successLight
                    : colors.errorLight,
                },
              ]}
            >
              <Ionicons
                name={isCorrect ? "checkmark-circle" : "close-circle"}
                size={20}
                color={isCorrect ? colors.success : colors.error}
              />
              <Text
                style={[
                  styles.resultText,
                  { color: isCorrect ? colors.success : colors.error },
                ]}
              >
                {isCorrect ? "Doğru!" : "Yanlış!"}
              </Text>
            </View>
            <TouchableOpacity onPress={handleNextQuestion} activeOpacity={0.8}>
              <LinearGradient
                colors={colors.gradientPrimary as [string, string]}
                style={styles.nextButton}
              >
                <Text style={styles.nextButtonText}>
                  {currentQuestionIndex < currentQuestions.length - 1
                    ? "Sonraki"
                    : "Yeni Set"}
                </Text>
                <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
              </LinearGradient>
            </TouchableOpacity>
          </View>
        )}
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  card: { borderRadius: 24, padding: 20, borderWidth: 1 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  headerLeft: { flexDirection: "row", alignItems: "center", gap: 10 },
  trophyBadge: {
    width: 32,
    height: 32,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: { fontSize: 17, fontWeight: "700" },
  setIndicator: { fontSize: 11, fontWeight: "500", marginTop: 2 },
  scoreBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    gap: 4,
  },
  scoreText: { fontSize: 14, fontWeight: "700" },
  progressContainer: {
    height: 4,
    borderRadius: 2,
    marginBottom: 16,
    overflow: "hidden",
  },
  progressBar: { height: "100%", borderRadius: 2 },
  questionNumber: { fontSize: 12, fontWeight: "600", marginBottom: 6 },
  questionText: {
    fontSize: 16,
    fontWeight: "600",
    lineHeight: 24,
    marginBottom: 20,
  },
  optionsContainer: { gap: 10 },
  option: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    borderRadius: 14,
    borderWidth: 1.5,
    gap: 12,
  },
  optionIndicator: {
    width: 28,
    height: 28,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  optionLetter: { fontSize: 13, fontWeight: "700", color: "#FFFFFF" },
  optionText: { flex: 1, fontSize: 15, fontWeight: "500" },
  resultContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
  },
  resultBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
    gap: 6,
  },
  resultText: { fontSize: 14, fontWeight: "700" },
  nextButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 12,
    gap: 6,
  },
  nextButtonText: { fontSize: 14, fontWeight: "700", color: "#FFFFFF" },
});

export default MiniQuizCard;
