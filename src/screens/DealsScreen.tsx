import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { Colors, Spacing, Typography, BorderRadius, Shadows } from '../constants/theme';

// Mock student deals data
const mockDeals = [
  {
    id: '1',
    businessName: "Cabo Bob's",
    category: 'Food & Dining',
    discountAmount: '15% off',
    description: 'Get 15% off your entire order with student ID',
    location: '2828 Rio Grande St',
    distanceFromCampus: 0.3,
    verificationMethod: 'student_id' as const,
    terms: 'Valid for dine-in and takeout. Cannot be combined with other offers.',
  },
  {
    id: '2',
    businessName: 'Speedway Coffee',
    category: 'Coffee',
    discountAmount: '$1 off',
    description: '$1 off any size coffee or specialty drink',
    location: '2400 Guadalupe St',
    distanceFromCampus: 0.1,
    verificationMethod: 'student_id' as const,
    terms: 'Show valid .edu email or student ID. One per customer per day.',
  },
  {
    id: '3',
    businessName: 'University Co-op',
    category: 'Textbooks',
    discountAmount: '10% off',
    description: '10% off used textbooks and course materials',
    location: '2246 Guadalupe St',
    distanceFromCampus: 0.2,
    verificationMethod: 'email' as const,
    terms: 'Valid on used textbooks only. New books excluded.',
  },
  {
    id: '4',
    businessName: 'iPic Theaters',
    category: 'Entertainment',
    discountAmount: '$5 off tickets',
    description: '$5 off movie tickets on Tuesdays and Wednesdays',
    location: '3225 Amy Donovan Plaza',
    distanceFromCampus: 2.5,
    verificationMethod: 'student_id' as const,
    terms: 'Valid Tuesday-Wednesday only. Show student ID at box office.',
  },
  {
    id: '5',
    businessName: 'Orange Theory Fitness',
    category: 'Fitness',
    discountAmount: '20% off membership',
    description: '20% off monthly membership for students',
    location: '2700 W Anderson Ln',
    distanceFromCampus: 3.1,
    verificationMethod: 'email' as const,
    terms: 'Valid for new members only. Requires 3-month commitment.',
  },
];

const categories = ['All', 'Food & Dining', 'Coffee', 'Textbooks', 'Entertainment', 'Fitness'];

export default function DealsScreen() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredDeals = mockDeals.filter((deal) => {
    const matchesCategory = selectedCategory === 'All' || deal.category === selectedCategory;
    const matchesSearch =
      deal.businessName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      deal.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} stickyHeaderIndices={[1]}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Student Deals</Text>
          <Text style={styles.headerSubtitle}>
            Save money at local Austin businesses
          </Text>
        </View>

        {/* Search and Filter */}
        <View style={styles.stickySection}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search deals..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.categoryScroll}
          >
            {categories.map((category) => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.categoryChip,
                  selectedCategory === category && styles.categoryChipActive,
                ]}
                onPress={() => setSelectedCategory(category)}
              >
                <Text
                  style={[
                    styles.categoryChipText,
                    selectedCategory === category && styles.categoryChipTextActive,
                  ]}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Contextual Suggestion */}
        <View style={styles.suggestionCard}>
          <Text style={styles.suggestionTitle}>💡 Smart Suggestion</Text>
          <Text style={styles.suggestionText}>
            You spent $180 at restaurants this week. Try Cabo Bob's (15% off) instead
            of Chipotle to save ~$3 per meal!
          </Text>
        </View>

        {/* Deals List */}
        <View style={styles.dealsContainer}>
          {filteredDeals.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>No deals found</Text>
              <Text style={styles.emptyStateSubtext}>
                Try adjusting your search or filters
              </Text>
            </View>
          ) : (
            filteredDeals.map((deal) => (
              <View key={deal.id} style={styles.dealCard}>
                {/* Deal Header */}
                <View style={styles.dealHeader}>
                  <View style={styles.dealHeaderLeft}>
                    <Text style={styles.dealBusinessName}>{deal.businessName}</Text>
                    <Text style={styles.dealCategory}>{deal.category}</Text>
                  </View>
                  <View style={styles.dealBadge}>
                    <Text style={styles.dealBadgeText}>{deal.discountAmount}</Text>
                  </View>
                </View>

                {/* Deal Description */}
                <Text style={styles.dealDescription}>{deal.description}</Text>

                {/* Deal Info */}
                <View style={styles.dealInfo}>
                  <View style={styles.dealInfoRow}>
                    <Text style={styles.dealInfoIcon}>📍</Text>
                    <Text style={styles.dealInfoText}>
                      {deal.location} • {deal.distanceFromCampus} mi from campus
                    </Text>
                  </View>
                  <View style={styles.dealInfoRow}>
                    <Text style={styles.dealInfoIcon}>🎓</Text>
                    <Text style={styles.dealInfoText}>
                      Show {deal.verificationMethod === 'student_id' ? 'student ID' : '.edu email'}
                    </Text>
                  </View>
                </View>

                {/* Terms */}
                <View style={styles.termsContainer}>
                  <Text style={styles.termsLabel}>Terms:</Text>
                  <Text style={styles.termsText}>{deal.terms}</Text>
                </View>

                {/* Action Button */}
                <TouchableOpacity style={styles.dealButton}>
                  <Text style={styles.dealButtonText}>Get Directions</Text>
                </TouchableOpacity>
              </View>
            ))
          )}
        </View>

        {/* Info Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Know a business with student discounts?
          </Text>
          <TouchableOpacity>
            <Text style={styles.footerLink}>Submit a deal</Text>
          </TouchableOpacity>
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
  stickySection: {
    backgroundColor: Colors.background,
    paddingBottom: Spacing.sm,
  },
  searchInput: {
    backgroundColor: Colors.surface,
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.md,
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    fontSize: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  categoryScroll: {
    paddingLeft: Spacing.lg,
  },
  categoryChip: {
    backgroundColor: Colors.surface,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.round,
    marginRight: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  categoryChipActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  categoryChipText: {
    ...Typography.caption,
    color: Colors.text,
  },
  categoryChipTextActive: {
    color: Colors.surface,
    fontWeight: '600',
  },
  suggestionCard: {
    backgroundColor: Colors.primaryLight + '20',
    marginHorizontal: Spacing.lg,
    marginTop: Spacing.md,
    marginBottom: Spacing.md,
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.primaryLight + '40',
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
  dealsContainer: {
    paddingHorizontal: Spacing.lg,
  },
  dealCard: {
    backgroundColor: Colors.surface,
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.md,
    ...Shadows.small,
  },
  dealHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.sm,
  },
  dealHeaderLeft: {
    flex: 1,
  },
  dealBusinessName: {
    ...Typography.h3,
    color: Colors.text,
  },
  dealCategory: {
    ...Typography.small,
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
  },
  dealBadge: {
    backgroundColor: Colors.secondary,
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.sm,
    borderRadius: BorderRadius.sm,
  },
  dealBadgeText: {
    ...Typography.small,
    fontWeight: '600',
    color: Colors.surface,
  },
  dealDescription: {
    ...Typography.body,
    color: Colors.text,
    marginBottom: Spacing.md,
  },
  dealInfo: {
    marginBottom: Spacing.md,
  },
  dealInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  dealInfoIcon: {
    fontSize: 14,
    marginRight: Spacing.xs,
  },
  dealInfoText: {
    ...Typography.caption,
    color: Colors.textSecondary,
  },
  termsContainer: {
    backgroundColor: Colors.background,
    padding: Spacing.sm,
    borderRadius: BorderRadius.sm,
    marginBottom: Spacing.md,
  },
  termsLabel: {
    ...Typography.small,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  termsText: {
    ...Typography.small,
    color: Colors.textSecondary,
  },
  dealButton: {
    backgroundColor: Colors.primary,
    padding: Spacing.sm,
    borderRadius: BorderRadius.sm,
    alignItems: 'center',
  },
  dealButtonText: {
    ...Typography.bodyBold,
    color: Colors.surface,
  },
  emptyState: {
    padding: Spacing.xxl,
    alignItems: 'center',
  },
  emptyStateText: {
    ...Typography.h3,
    color: Colors.textSecondary,
    marginBottom: Spacing.xs,
  },
  emptyStateSubtext: {
    ...Typography.caption,
    color: Colors.textLight,
  },
  footer: {
    padding: Spacing.lg,
    alignItems: 'center',
  },
  footerText: {
    ...Typography.body,
    color: Colors.textSecondary,
    marginBottom: Spacing.xs,
  },
  footerLink: {
    ...Typography.bodyBold,
    color: Colors.primary,
  },
});
