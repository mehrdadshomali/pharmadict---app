// MiniQuizCard.tsx - Interactive Quiz Widget Component
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
}

const questions: Question[] = [
  {
    id: 1,
    question: "Aspirin'in etken maddesi nedir?",
    options: ['Parasetamol', 'Asetilsalisilik Asit', 'İbuprofen'],
    correctAnswer: 'Asetilsalisilik Asit',
  },
  {
    id: 2,
    question: 'Hangi vitamin güneş ışığından sentezlenir?',
    options: ['Vitamin A', 'Vitamin D', 'Vitamin C'],
    correctAnswer: 'Vitamin D',
  },
  {
    id: 3,
    question: 'Kalp atışını düzenleyen mineral hangisidir?',
    options: ['Demir', 'Potasyum', 'Kalsiyum'],
    correctAnswer: 'Potasyum',
  },
  {
    id: 4,
    question: 'Hangi bitki antioksidan özelliği ile bilinir?',
    options: ['Zencefil', 'Yeşil Çay', 'Kekik'],
    correctAnswer: 'Yeşil Çay',
  },
];

const MiniQuizCard: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const shakeAnim = React.useRef(new Animated.Value(0)).current;
  const scaleAnim = React.useRef(new Animated.Value(1)).current;

  const currentQuestion = questions[currentQuestionIndex];

  useEffect(() => {
    // Reset state when question changes
    setSelectedOption(null);
    setShowResult(false);
    scaleAnim.setValue(1);
    shakeAnim.setValue(0);
  }, [currentQuestionIndex]);

  const handleOptionSelect = (option: string) => {
    if (showResult) return;

    setSelectedOption(option);
    const correct = option === currentQuestion.correctAnswer;
    setIsCorrect(correct);
    setShowResult(true);

    if (correct) {
      setScore(score + 1);
      // Success animation
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      // Shake animation for wrong answer
      Animated.sequence([
        Animated.timing(shakeAnim, {
          toValue: 10,
          duration: 50,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnim, {
          toValue: -10,
          duration: 50,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnim, {
          toValue: 10,
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
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Quiz completed, restart
      setCurrentQuestionIndex(0);
      setScore(0);
    }
  };

  const getOptionStyle = (option: string) => {
    if (!showResult) {
      return selectedOption === option
        ? styles.optionSelected
        : styles.optionDefault;
    }

    if (option === currentQuestion.correctAnswer) {
      return styles.optionCorrect;
    }

    if (option === selectedOption && !isCorrect) {
      return styles.optionWrong;
    }

    return styles.optionDefault;
  };

  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#667EEA', '#764BA2']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Ionicons name="trophy" size={24} color="#FFD700" />
            <Text style={styles.headerTitle}>Bilgi Yarışması</Text>
          </View>
          <View style={styles.scoreContainer}>
            <Ionicons name="star" size={16} color="#FFD700" />
            <Text style={styles.scoreText}>{score}</Text>
          </View>
        </View>

        {/* Progress Bar */}
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBar, { width: `${progress}%` }]} />
        </View>

        {/* Question Number */}
        <Text style={styles.questionNumber}>
          Soru {currentQuestionIndex + 1} / {questions.length}
        </Text>

        {/* Question */}
        <Text style={styles.questionText}>{currentQuestion.question}</Text>

        {/* Options */}
        <Animated.View
          style={[
            styles.optionsContainer,
            {
              transform: [
                { translateX: shakeAnim },
                { scale: scaleAnim },
              ],
            },
          ]}
        >
          {currentQuestion.options.map((option, index) => {
            const isSelected = selectedOption === option;
            const isCorrectOption = option === currentQuestion.correctAnswer;
            const showIcon = showResult && (isSelected || isCorrectOption);

            return (
              <TouchableOpacity
                key={index}
                style={[styles.option, getOptionStyle(option)]}
                onPress={() => handleOptionSelect(option)}
                activeOpacity={0.7}
                disabled={showResult}
              >
                <View style={styles.optionContent}>
                  <View style={styles.optionLeft}>
                    <View
                      style={[
                        styles.optionIndicator,
                        isSelected && styles.optionIndicatorSelected,
                        showResult &&
                          isCorrectOption &&
                          styles.optionIndicatorCorrect,
                        showResult &&
                          isSelected &&
                          !isCorrect &&
                          styles.optionIndicatorWrong,
                      ]}
                    >
                      <Text style={styles.optionLetter}>
                        {String.fromCharCode(65 + index)}
                      </Text>
                    </View>
                    <Text
                      style={[
                        styles.optionText,
                        isSelected && styles.optionTextSelected,
                        showResult &&
                          isCorrectOption &&
                          styles.optionTextCorrect,
                      ]}
                    >
                      {option}
                    </Text>
                  </View>
                  {showIcon && (
                    <Ionicons
                      name={
                        isCorrectOption
                          ? 'checkmark-circle'
                          : 'close-circle'
                      }
                      size={24}
                      color={isCorrectOption ? '#10B981' : '#EF4444'}
                    />
                  )}
                </View>
              </TouchableOpacity>
            );
          })}
        </Animated.View>

        {/* Result Message */}
        {showResult && (
          <View style={styles.resultContainer}>
            <View
              style={[
                styles.resultBox,
                isCorrect ? styles.resultBoxCorrect : styles.resultBoxWrong,
              ]}
            >
              <Ionicons
                name={isCorrect ? 'checkmark-circle' : 'close-circle'}
                size={32}
                color={isCorrect ? '#10B981' : '#EF4444'}
              />
              <Text
                style={[
                  styles.resultText,
                  isCorrect ? styles.resultTextCorrect : styles.resultTextWrong,
                ]}
              >
                {isCorrect ? 'Doğru! 🎉' : 'Yanlış! 😔'}
              </Text>
              {!isCorrect && (
                <Text style={styles.correctAnswerText}>
                  Doğru cevap: {currentQuestion.correctAnswer}
                </Text>
              )}
            </View>
          </View>
        )}

        {/* Next Button */}
        {showResult && (
          <TouchableOpacity
            style={styles.nextButton}
            onPress={handleNextQuestion}
            activeOpacity={0.8}
          >
            <Text style={styles.nextButtonText}>
              {currentQuestionIndex < questions.length - 1
                ? 'Sonraki Soru'
                : 'Yeniden Başla'}
            </Text>
            <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        )}
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginBottom: 24,
    borderRadius: 24,
    overflow: 'hidden',
    shadowColor: '#667EEA',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  gradient: {
    padding: 20,
    borderRadius: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    marginLeft: 8,
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  scoreText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    marginLeft: 4,
  },
  progressBarContainer: {
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 2,
    marginBottom: 16,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#FFD700',
    borderRadius: 2,
  },
  questionNumber: {
    fontSize: 14,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 8,
  },
  questionText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 20,
    lineHeight: 26,
  },
  optionsContainer: {
    marginBottom: 16,
  },
  option: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  optionDefault: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  optionSelected: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    borderColor: 'rgba(255, 255, 255, 0.4)',
  },
  optionCorrect: {
    backgroundColor: 'rgba(16, 185, 129, 0.3)',
    borderColor: '#10B981',
  },
  optionWrong: {
    backgroundColor: 'rgba(239, 68, 68, 0.3)',
    borderColor: '#EF4444',
  },
  optionContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  optionIndicator: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  optionIndicatorSelected: {
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },
  optionIndicatorCorrect: {
    backgroundColor: '#10B981',
  },
  optionIndicatorWrong: {
    backgroundColor: '#EF4444',
  },
  optionLetter: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  optionText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
    flex: 1,
  },
  optionTextSelected: {
    fontWeight: '600',
  },
  optionTextCorrect: {
    fontWeight: '600',
  },
  resultContainer: {
    marginTop: 8,
    marginBottom: 16,
  },
  resultBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
  resultBoxCorrect: {
    backgroundColor: 'rgba(16, 185, 129, 0.2)',
  },
  resultBoxWrong: {
    backgroundColor: 'rgba(239, 68, 68, 0.2)',
    flexDirection: 'column',
  },
  resultText: {
    fontSize: 18,
    fontWeight: '700',
    marginLeft: 8,
  },
  resultTextCorrect: {
    color: '#10B981',
  },
  resultTextWrong: {
    color: '#EF4444',
    marginLeft: 0,
    marginTop: 8,
  },
  correctAnswerText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    marginTop: 4,
    textAlign: 'center',
  },
  nextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    marginRight: 8,
  },
});

export default MiniQuizCard;

