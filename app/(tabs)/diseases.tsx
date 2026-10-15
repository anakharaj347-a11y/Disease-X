import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import ScreenContainer from '../../components/ScreenContainer';
import SearchBar from '../../components/SearchBar';
import FilterChips from '../../components/FilterChips';
import DiseaseCard from '../../components/DiseaseCard';
import { FadeIn } from '../../components/Animated';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Spacing } from '../../constants/spacing';
import { useDiseases } from '../../hooks/useDiseases';
import { diseaseCategories } from '../../data/diseases';

export default function DiseasesScreen() {
  const router = useRouter();
  const { diseases, searchQuery, setSearchQuery, selectedCategory, setSelectedCategory } =
    useDiseases();

  return (
    <ScreenContainer>
      <FadeIn>
        <View style={styles.header}>
          <Text style={styles.headerLabel}>PATHOGEN DATABASE</Text>
          <Text style={styles.headerTitle}>Disease Directory</Text>
          <Text style={styles.headerCount}>{diseases.length} diseases</Text>
        </View>
      </FadeIn>
      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Search diseases..."
      />
      <FilterChips
        options={diseaseCategories}
        selected={selectedCategory}
        onSelect={setSelectedCategory}
      />
      <FlatList
        data={diseases}
        keyExtractor={(item) => item.id}
        style={styles.list}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        nestedScrollEnabled
        removeClippedSubviews={false}
        renderItem={({ item, index }) => (
          <View
            style={[
              styles.cardRow,
              index === 0 && styles.cardFirst,
              index === diseases.length - 1 && styles.cardLast,
            ]}
          >
            <DiseaseCard
              name={item.name}
              category={item.category}
              demoCaseCount={item.demoCaseCount}
              severity={item.severity}
              trend={item.trendDirection}
              onPress={() => router.push(`/diseases/${item.id}`)}
            />
          </View>
        )}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: Spacing.screenHorizontal,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.md,
  },
  headerLabel: { ...Typography.label, color: Colors.textSecondary, fontSize: 10 },
  headerTitle: { ...Typography.h2, color: Colors.textPrimary },
  headerCount: { ...Typography.caption, color: Colors.textMuted, marginTop: 2 },
  list: { flex: 1 },
  listContent: {
    paddingHorizontal: Spacing.screenHorizontal,
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.scrollBottomInset,
  },
  cardRow: {
    backgroundColor: Colors.card,
    overflow: 'hidden',
  },
  cardFirst: {
    borderTopLeftRadius: Spacing.cardRadius,
    borderTopRightRadius: Spacing.cardRadius,
  },
  cardLast: {
    borderBottomLeftRadius: Spacing.cardRadius,
    borderBottomRightRadius: Spacing.cardRadius,
    marginBottom: Spacing.md,
  },
});
