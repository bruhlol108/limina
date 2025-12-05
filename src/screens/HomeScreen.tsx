import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { Colors, Spacing, Typography, BorderRadius, Shadows } from '../constants/theme';
import { TransactionCategory } from '../types';

// Mock data for demo
const mockTransactions = [
  {
    id: '1',
    description: 'Chipotle',
    amount: -12.50,
    category: TransactionCategory.FOOD_DINING,
    date: new Date(),
  },
  {
    id: '2',
    description: 'Uber',
    amount: -8.75,
    category: TransactionCategory.TRANSPORTATION,
    date: new Date(),
  },
  {
    id: '3',
    description: 'Amazon',
    amount: -45.00,
    category: TransactionCategory.OTHER,
    date: new Date(),
  },
];

const weeklySpending = {
  total: 180,
  budget: 200,
  categories: [
    { category: TransactionCategory.FOOD_DINING, amount: 85, color: '#FF6584' },
    { category: TransactionCategory.SOCIAL_ENTERTAINMENT, amount: 45, color: '#6C63FF' },
    { category: TransactionCategory.TRANSPORTATION, amount: 30, color: '#FFC107' },
    { category: TransactionCategory.OTHER, amount: 20, color: '#4CAF50' },
  ],
};

export default function HomeScreen() {
  const spendingPercentage = (weeklySpending.total / weeklySpending.budget) * 100;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.greeting}>Hey there!</Text>
          <Text style={styles.headerTitle}>Here's your week</Text>
        </View>

        {/* Weekly Summary Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>This Week</Text>
            <Text style={styles.weekDates}>Nov 27 - Dec 3</Text>
          </View>

          <View style={styles.spendingAmount}>
            <Text style={styles.amountLabel}>Total Spent</Text>
            <Text style={styles.amount}>${weeklySpending.total.toFixed(2)}</Text>
            <Text style={styles.budgetText}>
              of ${weeklySpending.budget} budget
            </Text>
          </View>

          {/* Progress Bar */}
          <View style={styles.progressBarContainer}>
            <View style={styles.progressBarBackground}>
              <View
                style={[
                  styles.progressBarFill,
                  { width: `${Math.min(spendingPercentage, 100)}%` },
                  spendingPercentage > 90 && styles.progressBarWarning,
                ]}
              />
            </View>
            <Text style={styles.progressText}>{spendingPercentage.toFixed(0)}%</Text>
          </View>

          {/* Category Breakdown */}
          <View style={styles.categoryBreakdown}>
            {weeklySpending.categories.map((cat) => (
              <View key={cat.category} style={styles.categoryRow}>
                <View style={styles.categoryLeft}>
                  <View
                    style={[styles.categoryDot, { backgroundColor: cat.color }]}
                  />
                  <Text style={styles.categoryName}>{cat.category}</Text>
                </View>
                <Text style={styles.categoryAmount}>${cat.amount}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Emergency Fund Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Emergency Fund</Text>
            <Text style={styles.fundProgress}>$150 / $500</Text>
          </View>
          <View style={styles.progressBarContainer}>
            <View style={styles.progressBarBackground}>
              <View style={[styles.progressBarFill, { width: '30%', backgroundColor: Colors.success }]} />
            </View>
          </View>
          <View style={styles.fundPrompt}>
            <Text style={styles.fundPromptText}>
              You're $25 under budget this week!
            </Text>
            <TouchableOpacity style={styles.fundButton}>
              <Text style={styles.fundButtonText}>Add to Fund</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Recent Transactions */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Recent Transactions</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See all</Text>
            </TouchableOpacity>
          </View>

          {mockTransactions.map((transaction) => (
            <View key={transaction.id} style={styles.transactionRow}>
              <View style={styles.transactionLeft}>
                <View style={styles.transactionIcon}>
                  <Text style={styles.transactionIconText}>
                    {transaction.description.charAt(0)}
                  </Text>
                </View>
                <View>
                  <Text style={styles.transactionDescription}>
                    {transaction.description}
                  </Text>
                  <Text style={styles.transactionCategory}>
                    {transaction.category}
                  </Text>
                </View>
              </View>
              <Text style={styles.transactionAmount}>
                ${Math.abs(transaction.amount).toFixed(2)}
              </Text>
            </View>
          ))}
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
  greeting: {
    ...Typography.caption,
    color: Colors.textSecondary,
  },
  headerTitle: {
    ...Typography.h1,
    color: Colors.text,
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
  cardTitle: {
    ...Typography.h3,
    color: Colors.text,
  },
  weekDates: {
    ...Typography.caption,
    color: Colors.textSecondary,
  },
  spendingAmount: {
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  amountLabel: {
    ...Typography.caption,
    color: Colors.textSecondary,
    marginBottom: Spacing.xs,
  },
  amount: {
    fontSize: 48,
    fontWeight: '700',
    color: Colors.text,
  },
  budgetText: {
    ...Typography.caption,
    color: Colors.textSecondary,
  },
  progressBarContainer: {
    marginBottom: Spacing.md,
  },
  progressBarBackground: {
    height: 8,
    backgroundColor: Colors.border,
    borderRadius: BorderRadius.round,
    overflow: 'hidden',
    marginBottom: Spacing.xs,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.round,
  },
  progressBarWarning: {
    backgroundColor: Colors.warning,
  },
  progressText: {
    ...Typography.small,
    color: Colors.textSecondary,
    textAlign: 'right',
  },
  categoryBreakdown: {
    marginVertical: -Spacing.xs / 2,
  },
  categoryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: Spacing.xs / 2,
  },
  categoryLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: Spacing.sm,
  },
  categoryName: {
    ...Typography.body,
    color: Colors.text,
  },
  categoryAmount: {
    ...Typography.bodyBold,
    color: Colors.text,
  },
  fundProgress: {
    ...Typography.bodyBold,
    color: Colors.success,
  },
  fundPrompt: {
    backgroundColor: Colors.background,
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    marginTop: Spacing.md,
  },
  fundPromptText: {
    ...Typography.body,
    color: Colors.text,
    marginBottom: Spacing.sm,
  },
  fundButton: {
    backgroundColor: Colors.success,
    padding: Spacing.sm,
    borderRadius: BorderRadius.sm,
    alignItems: 'center',
  },
  fundButtonText: {
    ...Typography.bodyBold,
    color: Colors.surface,
  },
  seeAllText: {
    ...Typography.caption,
    color: Colors.primary,
  },
  transactionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.background,
  },
  transactionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  transactionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  transactionIconText: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.surface,
  },
  transactionDescription: {
    ...Typography.bodyBold,
    color: Colors.text,
  },
  transactionCategory: {
    ...Typography.small,
    color: Colors.textSecondary,
  },
  transactionAmount: {
    ...Typography.bodyBold,
    color: Colors.text,
  },
});
