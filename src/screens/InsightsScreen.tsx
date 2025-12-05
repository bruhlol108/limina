import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { Colors, Spacing, Typography, BorderRadius, Shadows } from '../constants/theme';
import { TransactionCategory } from '../types';

// Mock peer insights data
const peerInsights = [
  {
    category: TransactionCategory.FOOD_DINING,
    userSpending: 180,
    peerAverage: 150,
    sampleSize: 247,
    comparison: 'above' as const,
  },
  {
    category: TransactionCategory.TRANSPORTATION,
    userSpending: 30,
    peerAverage: 45,
    sampleSize: 247,
    comparison: 'below' as const,
  },
  {
    category: TransactionCategory.SOCIAL_ENTERTAINMENT,
    userSpending: 45,
    peerAverage: 50,
    sampleSize: 247,
    comparison: 'similar' as const,
  },
  {
    category: TransactionCategory.TEXTBOOKS,
    userSpending: 0,
    peerAverage: 25,
    sampleSize: 247,
    comparison: 'below' as const,
  },
];

export default function InsightsScreen() {
  const getComparisonColor = (comparison: string) => {
    switch (comparison) {
      case 'above':
        return Colors.spendingAbove;
      case 'below':
        return Colors.spendingBelow;
      case 'similar':
        return Colors.spendingSimilar;
      default:
        return Colors.textSecondary;
    }
  };

  const getComparisonText = (comparison: string, diff: number) => {
    const absDiff = Math.abs(diff);
    switch (comparison) {
      case 'above':
        return `$${absDiff} more than peers`;
      case 'below':
        return `$${absDiff} less than peers`;
      case 'similar':
        return 'Similar to peers';
      default:
        return '';
    }
  };

  const getComparisonIcon = (comparison: string) => {
    switch (comparison) {
      case 'above':
        return '↑';
      case 'below':
        return '↓';
      case 'similar':
        return '→';
      default:
        return '';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Peer Insights</Text>
          <Text style={styles.headerSubtitle}>
            See how your spending compares to other UT Austin students
          </Text>
        </View>

        {/* Info Card */}
        <View style={styles.infoCard}>
          <Text style={styles.infoText}>
            Based on <Text style={styles.infoBold}>247 UT Austin students</Text>
          </Text>
          <Text style={styles.infoSubtext}>
            All data is completely anonymous. Your spending is never shared.
          </Text>
        </View>

        {/* Peer Comparison Cards */}
        {peerInsights.map((insight, index) => {
          const diff = insight.userSpending - insight.peerAverage;
          const percentage = ((diff / insight.peerAverage) * 100).toFixed(0);

          return (
            <View key={index} style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.categoryTitle}>{insight.category}</Text>
                <View
                  style={[
                    styles.comparisonBadge,
                    { backgroundColor: getComparisonColor(insight.comparison) },
                  ]}
                >
                  <Text style={styles.comparisonIcon}>
                    {getComparisonIcon(insight.comparison)}
                  </Text>
                  <Text style={styles.comparisonBadgeText}>
                    {insight.comparison === 'similar' ? 'On track' : percentage + '%'}
                  </Text>
                </View>
              </View>

              {/* Spending Comparison */}
              <View style={styles.comparisonContainer}>
                <View style={styles.comparisonRow}>
                  <Text style={styles.comparisonLabel}>You</Text>
                  <Text style={styles.comparisonAmount}>
                    ${insight.userSpending}
                  </Text>
                </View>
                <View style={styles.comparisonRow}>
                  <Text style={styles.comparisonLabel}>Peers</Text>
                  <Text style={styles.comparisonAmountPeer}>
                    ${insight.peerAverage}
                  </Text>
                </View>
              </View>

              {/* Visual Bar Comparison */}
              <View style={styles.barComparison}>
                <View style={styles.barContainer}>
                  <View style={styles.barLabel}>
                    <Text style={styles.barLabelText}>You</Text>
                  </View>
                  <View style={styles.barBackground}>
                    <View
                      style={[
                        styles.barFill,
                        {
                          width: `${Math.min(
                            (insight.userSpending / Math.max(insight.userSpending, insight.peerAverage)) * 100,
                            100
                          )}%`,
                          backgroundColor: getComparisonColor(insight.comparison),
                        },
                      ]}
                    />
                  </View>
                </View>
                <View style={styles.barContainer}>
                  <View style={styles.barLabel}>
                    <Text style={styles.barLabelText}>Peers</Text>
                  </View>
                  <View style={styles.barBackground}>
                    <View
                      style={[
                        styles.barFill,
                        {
                          width: `${Math.min(
                            (insight.peerAverage / Math.max(insight.userSpending, insight.peerAverage)) * 100,
                            100
                          )}%`,
                          backgroundColor: Colors.border,
                        },
                      ]}
                    />
                  </View>
                </View>
              </View>

              {/* Insight Text */}
              <Text
                style={[
                  styles.insightText,
                  { color: getComparisonColor(insight.comparison) },
                ]}
              >
                {getComparisonText(insight.comparison, diff)}
              </Text>

              {/* Suggestion (only if above) */}
              {insight.comparison === 'above' && (
                <View style={styles.suggestionBox}>
                  <Text style={styles.suggestionTitle}>💡 Tip</Text>
                  <Text style={styles.suggestionText}>
                    Check the Deals tab for student discounts that could help you save
                    on {insight.category.toLowerCase()}
                  </Text>
                </View>
              )}
            </View>
          );
        })}

        {/* Success Story */}
        <View style={styles.successCard}>
          <Text style={styles.successTitle}>🎉 Keep it up!</Text>
          <Text style={styles.successText}>
            You're spending less than peers in 2 categories. Students who track
            their spending save an average of $150/month.
          </Text>
        </View>

        {/* Bottom Spacing */}
        <View style={{ height: Spacing.xl }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    padding: Spacing.lg,
    paddingTop: Spacing.md,
  },
  headerTitle: {
    ...Typography.h1,
    color: Colors.text,
  },
  headerSubtitle: {
    ...Typography.body,
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
  },
  infoCard: {
    backgroundColor: Colors.primaryLight + '20',
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.md,
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.primaryLight + '40',
  },
  infoText: {
    ...Typography.body,
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  infoBold: {
    fontWeight: '600',
    color: Colors.primary,
  },
  infoSubtext: {
    ...Typography.small,
    color: Colors.textSecondary,
  },
  card: {
    backgroundColor: Colors.surface,
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.md,
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    ...Shadows.small,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  categoryTitle: {
    ...Typography.h3,
    color: Colors.text,
  },
  comparisonBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.sm,
    borderRadius: BorderRadius.round,
  },
  comparisonIcon: {
    fontSize: 14,
    color: Colors.surface,
    fontWeight: '600',
    marginRight: Spacing.xs,
  },
  comparisonBadgeText: {
    ...Typography.small,
    fontWeight: '600',
    color: Colors.surface,
  },
  comparisonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.md,
  },
  comparisonRow: {
    flex: 1,
  },
  comparisonLabel: {
    ...Typography.caption,
    color: Colors.textSecondary,
    marginBottom: Spacing.xs,
  },
  comparisonAmount: {
    ...Typography.h2,
    color: Colors.text,
  },
  comparisonAmountPeer: {
    ...Typography.h2,
    color: Colors.textSecondary,
  },
  barComparison: {
    marginBottom: Spacing.md,
  },
  barContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  barLabel: {
    width: 50,
    marginRight: Spacing.sm,
  },
  barLabelText: {
    ...Typography.caption,
    color: Colors.textSecondary,
  },
  barBackground: {
    flex: 1,
    height: 24,
    backgroundColor: Colors.background,
    borderRadius: BorderRadius.sm,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: BorderRadius.sm,
  },
  insightText: {
    ...Typography.bodyBold,
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  suggestionBox: {
    backgroundColor: Colors.background,
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    marginTop: Spacing.sm,
  },
  suggestionTitle: {
    ...Typography.bodyBold,
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  suggestionText: {
    ...Typography.caption,
    color: Colors.textSecondary,
  },
  successCard: {
    backgroundColor: Colors.success + '20',
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.md,
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: Colors.success + '40',
  },
  successTitle: {
    ...Typography.h3,
    color: Colors.text,
    marginBottom: Spacing.sm,
  },
  successText: {
    ...Typography.body,
    color: Colors.textSecondary,
  },
});
