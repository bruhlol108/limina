import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
  Animated,
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
  const [transactions, setTransactions] = useState(mockTransactions);
  const [showAddModal, setShowAddModal] = useState(false);
  const [budget] = useState(200); // Weekly budget
  const [newTransaction, setNewTransaction] = useState({
    description: '',
    amount: '',
    category: TransactionCategory.FOOD_DINING,
  });

  const slideAnim = useRef(new Animated.Value(300)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (showAddModal) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.spring(slideAnim, {
          toValue: 0,
          damping: 20,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 300,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [showAddModal]);

  // Calculate spending from actual transactions
  const totalSpent = transactions.reduce((sum, t) => sum + Math.abs(t.amount), 0);
  const spendingPercentage = (totalSpent / budget) * 100;

  // Calculate category breakdown
  const categoryTotals = transactions.reduce((acc, t) => {
    const category = t.category;
    acc[category] = (acc[category] || 0) + Math.abs(t.amount);
    return acc;
  }, {} as Record<string, number>);

  const categoryBreakdown = Object.entries(categoryTotals).map(([category, amount]) => ({
    category,
    amount,
    color: getCategoryColor(category),
  }));

  function getCategoryColor(category: string) {
    const colors: Record<string, string> = {
      [TransactionCategory.FOOD_DINING]: '#FF6584',
      [TransactionCategory.SOCIAL_ENTERTAINMENT]: '#6C63FF',
      [TransactionCategory.TRANSPORTATION]: '#FFC107',
      [TransactionCategory.TEXTBOOKS]: '#9C27B0',
      [TransactionCategory.HOUSING_UTILITIES]: '#FF9800',
      [TransactionCategory.HEALTH_WELLNESS]: '#4CAF50',
      [TransactionCategory.PERSONAL_CARE]: '#00BCD4',
      [TransactionCategory.SUBSCRIPTIONS]: '#E91E63',
      [TransactionCategory.OTHER]: '#9E9E9E',
    };
    return colors[category] || '#9E9E9E';
  }

  const handleAddTransaction = () => {
    if (!newTransaction.description || !newTransaction.amount) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    const transaction = {
      id: Date.now().toString(),
      description: newTransaction.description,
      amount: -parseFloat(newTransaction.amount),
      category: newTransaction.category,
      date: new Date(),
    };

    setTransactions([transaction, ...transactions]);
    setShowAddModal(false);
    setNewTransaction({ description: '', amount: '', category: TransactionCategory.FOOD_DINING });
    Alert.alert('Success', 'Transaction added!');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Hey there!</Text>
            <Text style={styles.headerTitle}>Here's your week</Text>
          </View>
        </View>

        {/* Weekly Summary Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>This Week</Text>
            <Text style={styles.weekDates}>Nov 27 - Dec 3</Text>
          </View>

          <View style={styles.spendingAmount}>
            <Text style={styles.amountLabel}>Total Spent</Text>
            <Text style={styles.amount}>${totalSpent.toFixed(2)}</Text>
            <Text style={styles.budgetText}>
              of ${budget} budget
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
            {categoryBreakdown.map((cat) => (
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

          {transactions.map((transaction) => (
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
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => setShowAddModal(true)}
      >
        <Text style={styles.fabText}>+ Add</Text>
      </TouchableOpacity>

      {/* Add Transaction Modal */}
      <Modal
        visible={showAddModal}
        animationType="none"
        transparent={true}
        onRequestClose={() => setShowAddModal(false)}
      >
        <Animated.View style={[styles.modalOverlay, { opacity: fadeAnim }]}>
          <TouchableOpacity
            style={{ flex: 1 }}
            activeOpacity={1}
            onPress={() => setShowAddModal(false)}
          >
            <Animated.View
              style={[
                styles.modalContent,
                { transform: [{ translateY: slideAnim }] },
              ]}
            >
              <TouchableOpacity
                activeOpacity={1}
                onPress={(e) => e.stopPropagation()}
              >
            <Text style={styles.modalTitle}>Add Transaction</Text>

            <Text style={styles.inputLabel}>Description</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. Chipotle"
              value={newTransaction.description}
              onChangeText={(text) =>
                setNewTransaction({ ...newTransaction, description: text })
              }
            />

            <Text style={styles.inputLabel}>Amount ($)</Text>
            <TextInput
              style={styles.input}
              placeholder="0.00"
              keyboardType="decimal-pad"
              value={newTransaction.amount}
              onChangeText={(text) =>
                setNewTransaction({ ...newTransaction, amount: text })
              }
            />

            <Text style={styles.inputLabel}>Category</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categorySelector}>
              {Object.values(TransactionCategory).map((cat) => (
                <TouchableOpacity
                  key={cat}
                  style={[
                    styles.categoryOption,
                    newTransaction.category === cat && styles.categoryOptionSelected,
                  ]}
                  onPress={() => setNewTransaction({ ...newTransaction, category: cat })}
                >
                  <Text
                    style={[
                      styles.categoryOptionText,
                      newTransaction.category === cat && styles.categoryOptionTextSelected,
                    ]}
                  >
                    {cat}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setShowAddModal(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.addTransactionButton]}
                onPress={handleAddTransaction}
              >
                <Text style={styles.addTransactionButtonText}>Add</Text>
              </TouchableOpacity>
            </View>
              </TouchableOpacity>
            </Animated.View>
          </TouchableOpacity>
        </Animated.View>
      </Modal>
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
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 30,
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 28,
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadows.large,
  },
  fabText: {
    fontSize: 16,
    color: Colors.surface,
    fontWeight: '600',
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
    marginBottom: Spacing.lg,
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    ...Shadows.medium,
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
    height: 12,
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
    width: 16,
    height: 16,
    borderRadius: 8,
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.surface,
    borderTopLeftRadius: BorderRadius.xl,
    borderTopRightRadius: BorderRadius.xl,
    padding: Spacing.xl,
    paddingBottom: Spacing.xxl,
  },
  modalTitle: {
    ...Typography.h2,
    color: Colors.text,
    marginBottom: Spacing.lg,
  },
  inputLabel: {
    ...Typography.bodyBold,
    color: Colors.text,
    marginBottom: Spacing.xs,
    marginTop: Spacing.md,
  },
  input: {
    backgroundColor: Colors.background,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    fontSize: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  categorySelector: {
    marginTop: Spacing.sm,
    marginBottom: Spacing.lg,
  },
  categoryOption: {
    backgroundColor: Colors.background,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.round,
    marginRight: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  categoryOptionSelected: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  categoryOptionText: {
    ...Typography.caption,
    color: Colors.text,
  },
  categoryOptionTextSelected: {
    color: Colors.surface,
    fontWeight: '600',
  },
  modalButtons: {
    flexDirection: 'row',
    marginTop: Spacing.lg,
  },
  modalButton: {
    flex: 1,
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: Colors.background,
    marginRight: Spacing.sm,
  },
  cancelButtonText: {
    color: Colors.text,
    fontWeight: '600',
  },
  addTransactionButton: {
    backgroundColor: Colors.primary,
    marginLeft: Spacing.sm,
  },
  addTransactionButtonText: {
    color: Colors.surface,
    fontWeight: '600',
  },
});
