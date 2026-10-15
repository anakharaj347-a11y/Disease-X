import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ScreenContainer from '../../components/ScreenContainer';
import FilterChips from '../../components/FilterChips';
import PrimaryButton from '../../components/PrimaryButton';
import SecondaryButton from '../../components/SecondaryButton';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Spacing } from '../../constants/spacing';
import { symptomItems, assessmentQuestions, assessmentHistoryData, symptomCategories } from '../../data/symptoms';

type Step = 'select' | 'questions' | 'review' | 'result' | 'history';

export default function SymptomAIScreen() {
  const [step, setStep] = useState<Step>('select');
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const symptoms = selectedCategory === 'All' ? symptomItems : symptomItems.filter(s => s.category === selectedCategory);

  const toggleSymptom = (id: string) => {
    setSelectedSymptoms(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]);
  };

  const reset = () => { setStep('select'); setSelectedSymptoms([]); setCurrentQ(0); setAnswers({}); };

  return (
    <ScreenContainer>
      <View style={styles.header}>
        <View>
          <Text style={styles.headerLabel}>PRELIMINARY ASSESSMENT</Text>
          <Text style={styles.headerTitle}>Symptom AI</Text>
        </View>
        <TouchableOpacity style={styles.historyBtn} onPress={() => setStep('history')}>
          <Ionicons name="time-outline" size={18} color={Colors.primary} />
          <Text style={styles.historyText}>History</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.disclaimer}>
        <Ionicons name="information-circle-outline" size={16} color={Colors.warning} />
        <Text style={styles.disclaimerText}>This is a demonstration tool. It does not provide medical advice. Always consult a healthcare professional.</Text>
      </View>

      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        nestedScrollEnabled
        keyboardShouldPersistTaps="handled"
        bounces
      >
        {step === 'select' && (
          <>
            <Text style={styles.stepTitle}>Select your symptoms</Text>
            <Text style={styles.stepSubtitle}>{selectedSymptoms.length} selected</Text>
            <FilterChips options={symptomCategories} selected={selectedCategory} onSelect={setSelectedCategory} />
            <View style={styles.symptomGrid}>
              {symptoms.map(s => {
                const isSelected = selectedSymptoms.includes(s.id);
                return (
                  <TouchableOpacity key={s.id} style={[styles.symptomChip, isSelected && styles.symptomChipActive]} onPress={() => toggleSymptom(s.id)}>
                    <Ionicons name={isSelected ? 'checkmark-circle' : 'add-circle-outline'} size={18} color={isSelected ? Colors.primary : Colors.textMuted} />
                    <Text style={[styles.symptomName, isSelected && styles.symptomNameActive]}>{s.name}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
            <View style={styles.actionRow}>
              <PrimaryButton title={`Continue (${selectedSymptoms.length})`} onPress={() => { if (selectedSymptoms.length > 0) setStep('questions'); }} disabled={selectedSymptoms.length === 0} fullWidth />
            </View>
          </>
        )}

        {step === 'questions' && (
          <>
            <View style={styles.progressRow}>
              <Text style={styles.stepTitle}>Assessment Questions</Text>
              <Text style={styles.progressText}>{currentQ + 1} / {assessmentQuestions.length}</Text>
            </View>
            <View style={styles.progressBar}><View style={[styles.progressFill, { width: `${((currentQ + 1) / assessmentQuestions.length) * 100}%` }]} /></View>
            <View style={styles.questionCard}>
              <Text style={styles.questionText}>{assessmentQuestions[currentQ].question}</Text>
              {assessmentQuestions[currentQ].options?.map(opt => (
                <TouchableOpacity
                  key={opt}
                  style={[styles.optionBtn, answers[assessmentQuestions[currentQ].id] === opt && styles.optionBtnActive]}
                  onPress={() => setAnswers(prev => ({ ...prev, [assessmentQuestions[currentQ].id]: opt }))}
                >
                  <Ionicons name={answers[assessmentQuestions[currentQ].id] === opt ? 'radio-button-on' : 'radio-button-off'} size={20} color={answers[assessmentQuestions[currentQ].id] === opt ? Colors.primary : Colors.textMuted} />
                  <Text style={[styles.optionText, answers[assessmentQuestions[currentQ].id] === opt && styles.optionTextActive]}>{opt}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <View style={styles.navRow}>
              <SecondaryButton title="Back" onPress={() => { if (currentQ > 0) setCurrentQ(currentQ - 1); else setStep('select'); }} />
              <PrimaryButton title={currentQ < assessmentQuestions.length - 1 ? 'Next' : 'Review'} onPress={() => { if (currentQ < assessmentQuestions.length - 1) setCurrentQ(currentQ + 1); else setStep('review'); }} />
            </View>
          </>
        )}

        {step === 'review' && (
          <>
            <Text style={styles.stepTitle}>Review Assessment</Text>
            <View style={styles.reviewCard}>
              <Text style={styles.reviewLabel}>Selected Symptoms ({selectedSymptoms.length})</Text>
              <View style={styles.reviewTags}>
                {selectedSymptoms.map(id => {
                  const s = symptomItems.find(si => si.id === id);
                  return s ? <View key={id} style={styles.reviewTag}><Text style={styles.reviewTagText}>{s.name}</Text></View> : null;
                })}
              </View>
              <Text style={styles.reviewLabel}>Answers</Text>
              {Object.entries(answers).map(([qId, ans]) => {
                const q = assessmentQuestions.find(aq => aq.id === qId);
                return (
                  <View key={qId} style={styles.reviewAnswer}>
                    <Text style={styles.reviewQ}>{q?.question}</Text>
                    <Text style={styles.reviewA}>{ans}</Text>
                  </View>
                );
              })}
            </View>
            <View style={styles.actionRow}>
              <SecondaryButton title="Edit" onPress={() => setStep('questions')} />
              <PrimaryButton title="Get Assessment" onPress={() => setStep('result')} />
            </View>
          </>
        )}

        {step === 'result' && (
          <>
            <Text style={styles.stepTitle}>Preliminary Assessment</Text>
            <View style={styles.resultCard}>
              <View style={styles.urgencyBadge}><Text style={styles.urgencyText}>URGENT — Seek medical attention soon</Text></View>
              <Text style={styles.resultNote}>Based on your selected symptoms, the following conditions may be relevant. This is NOT a diagnosis.</Text>
              {[
                { disease: 'Dengue', match: 78, symptoms: ['Fever', 'Headache', 'Joint Pain'] },
                { disease: 'Chikungunya', match: 62, symptoms: ['Fever', 'Joint Pain'] },
                { disease: 'Influenza A', match: 45, symptoms: ['Fever', 'Headache'] },
              ].map(c => (
                <View key={c.disease} style={styles.conditionItem}>
                  <View style={styles.conditionHeader}>
                    <Text style={styles.conditionName}>{c.disease}</Text>
                    <Text style={styles.conditionMatch}>{c.match}% match</Text>
                  </View>
                  <View style={styles.matchBar}><View style={[styles.matchFill, { width: `${c.match}%` }]} /></View>
                  <Text style={styles.matchedSymptoms}>Matched: {c.symptoms.join(', ')}</Text>
                </View>
              ))}
              <Text style={styles.resultDisclaimer}>This preliminary assessment is generated from demonstration data and does not constitute medical advice. Please consult a qualified healthcare provider for proper diagnosis and treatment.</Text>
            </View>
            <View style={styles.actionRow}>
              <PrimaryButton title="Start New Assessment" onPress={reset} fullWidth />
            </View>
          </>
        )}

        {step === 'history' && (
          <>
            <View style={styles.progressRow}>
              <Text style={styles.stepTitle}>Assessment History</Text>
              <TouchableOpacity onPress={() => setStep('select')}><Text style={styles.backLink}>New Assessment</Text></TouchableOpacity>
            </View>
            {assessmentHistoryData.map(h => (
              <View key={h.id} style={styles.historyCard}>
                <View style={styles.historyHeader}>
                  <Text style={styles.historyDate}>{new Date(h.date).toLocaleDateString()}</Text>
                  <View style={[styles.urgencySmall, { backgroundColor: h.urgencyLevel === 'Urgent' ? Colors.criticalBg : h.urgencyLevel === 'Soon' ? Colors.warningBg : Colors.lightBlue }]}>
                    <Text style={[styles.urgencySmallText, { color: h.urgencyLevel === 'Urgent' ? Colors.critical : h.urgencyLevel === 'Soon' ? Colors.warning : Colors.primary }]}>{h.urgencyLevel}</Text>
                  </View>
                </View>
                <Text style={styles.historyCondition}>Top: {h.topCondition}</Text>
                <Text style={styles.historyMeta}>{h.symptomCount} symptoms · {h.status}</Text>
              </View>
            ))}
          </>
        )}

      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: Spacing.screenHorizontal, paddingTop: Spacing.lg, paddingBottom: Spacing.md },
  headerLabel: { ...Typography.label, color: Colors.textSecondary, fontSize: 10 },
  headerTitle: { ...Typography.h2, color: Colors.textPrimary },
  historyBtn: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: Colors.primaryLight, paddingHorizontal: 12, paddingVertical: 8, borderRadius: 20 },
  historyText: { ...Typography.captionBold, color: Colors.primary },
  disclaimer: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: Colors.warningBg, marginHorizontal: Spacing.screenHorizontal, marginTop: Spacing.sm, padding: Spacing.md, borderRadius: 12 },
  disclaimerText: { ...Typography.caption, color: Colors.warning, flex: 1 },
  scroll: { flex: 1 },
  scrollContent: { paddingBottom: Spacing.scrollBottomInset },
  stepTitle: { ...Typography.h3, color: Colors.textPrimary, paddingHorizontal: Spacing.screenHorizontal, marginTop: Spacing.lg },
  stepSubtitle: { ...Typography.caption, color: Colors.textSecondary, paddingHorizontal: Spacing.screenHorizontal, marginBottom: Spacing.sm },
  symptomGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm, paddingHorizontal: Spacing.screenHorizontal, marginTop: Spacing.sm },
  symptomChip: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 12, paddingVertical: 12, borderRadius: 14, backgroundColor: Colors.card, width: '48%', shadowColor: Colors.shadow, shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 1 },
  symptomChipActive: { backgroundColor: Colors.primaryLight },
  symptomName: { ...Typography.bodySmall, color: Colors.textPrimary, flex: 1 },
  symptomNameActive: { color: Colors.primary, fontWeight: '600' },
  actionRow: { flexDirection: 'row', gap: Spacing.md, paddingHorizontal: Spacing.screenHorizontal, marginTop: Spacing.xl },

  progressRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: Spacing.screenHorizontal, marginTop: Spacing.lg },
  progressText: { ...Typography.captionBold, color: Colors.primary },
  progressBar: { height: 4, backgroundColor: Colors.secondaryFill, borderRadius: 2, marginHorizontal: Spacing.screenHorizontal, marginTop: Spacing.sm, marginBottom: Spacing.lg, overflow: 'hidden' },
  progressFill: { height: '100%', backgroundColor: Colors.primary, borderRadius: 2 },
  questionCard: { backgroundColor: Colors.card, borderRadius: Spacing.cardRadius, marginHorizontal: Spacing.screenHorizontal, padding: Spacing.cardPadding, shadowColor: Colors.shadow, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 2 },
  questionText: { ...Typography.subtitle, color: Colors.textPrimary, marginBottom: Spacing.lg },
  optionBtn: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md, paddingVertical: Spacing.md, paddingHorizontal: Spacing.sm, borderRadius: 10, marginBottom: 4 },
  optionBtnActive: { backgroundColor: Colors.primaryLight },
  optionText: { ...Typography.bodySmall, color: Colors.textPrimary },
  optionTextActive: { color: Colors.primary, fontWeight: '600' },
  navRow: { flexDirection: 'row', gap: Spacing.md, paddingHorizontal: Spacing.screenHorizontal, marginTop: Spacing.xl, justifyContent: 'space-between' },

  reviewCard: { backgroundColor: Colors.card, borderRadius: Spacing.cardRadius, marginHorizontal: Spacing.screenHorizontal, padding: Spacing.cardPadding, marginTop: Spacing.md, shadowColor: Colors.shadow, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 2 },
  reviewLabel: { ...Typography.subtitle, color: Colors.textPrimary, marginTop: Spacing.md, marginBottom: Spacing.sm },
  reviewTags: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  reviewTag: { backgroundColor: Colors.primaryLight, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  reviewTagText: { ...Typography.captionBold, color: Colors.primary },
  reviewAnswer: { marginBottom: Spacing.md },
  reviewQ: { ...Typography.bodySmall, color: Colors.textSecondary },
  reviewA: { ...Typography.subtitle, color: Colors.textPrimary, marginTop: 2 },

  resultCard: { backgroundColor: Colors.card, borderRadius: Spacing.cardRadius, marginHorizontal: Spacing.screenHorizontal, padding: Spacing.cardPadding, marginTop: Spacing.md, shadowColor: Colors.shadow, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 2 },
  urgencyBadge: { backgroundColor: Colors.criticalBg, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8, alignSelf: 'flex-start', marginBottom: Spacing.md },
  urgencyText: { ...Typography.captionBold, color: Colors.critical },
  resultNote: { ...Typography.bodySmall, color: Colors.textSecondary, marginBottom: Spacing.lg },
  conditionItem: { marginBottom: Spacing.lg },
  conditionHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  conditionName: { ...Typography.subtitle, color: Colors.textPrimary },
  conditionMatch: { ...Typography.captionBold, color: Colors.primary },
  matchBar: { height: 6, backgroundColor: Colors.secondaryFill, borderRadius: 3, overflow: 'hidden', marginBottom: 4 },
  matchFill: { height: '100%', backgroundColor: Colors.primary, borderRadius: 3 },
  matchedSymptoms: { ...Typography.caption, color: Colors.textSecondary },
  resultDisclaimer: { ...Typography.caption, color: Colors.warning, marginTop: Spacing.md, fontStyle: 'italic', lineHeight: 18 },

  backLink: { ...Typography.captionBold, color: Colors.primary },
  historyCard: { backgroundColor: Colors.card, borderRadius: Spacing.cardRadius, marginHorizontal: Spacing.screenHorizontal, padding: Spacing.cardPadding, marginTop: Spacing.sm, shadowColor: Colors.shadow, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 2 },
  historyHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  historyDate: { ...Typography.subtitle, color: Colors.textPrimary },
  urgencySmall: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6 },
  urgencySmallText: { ...Typography.label, fontSize: 10 },
  historyCondition: { ...Typography.bodySmall, color: Colors.primary, fontWeight: '600' },
  historyMeta: { ...Typography.caption, color: Colors.textMuted, marginTop: 2 },
});
