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

export default function ProfileScreen() {
  const userStats = {
    memberSince: 'November 2024',
    university: 'UT Austin',
    emergencyFund: 150,
    emergencyGoal: 500,
    challengesCompleted: 2,
    totalSaved: 340,
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>SK</Text>
          </View>
          <Text style={styles.userName}>Sarah Kim</Text>
          <Text style={styles.userEmail}>sarah.kim@utexas.edu</Text>
        </View>

        {/* Stats Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Your Stats</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>${userStats.totalSaved}</Text>
              <Text style={styles.statLabel}>Total Saved</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{userStats.challengesCompleted}</Text>
              <Text style={styles.statLabel}>Challenges</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>
                ${userStats.emergencyFund}
              </Text>
              <Text style={styles.statLabel}>Emergency Fund</Text>
            </View>
          </View>
        </View>

        {/* Account Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          <View style={styles.card}>
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuItemText}>University</Text>
              <Text style={styles.menuItemValue}>{userStats.university}</Text>
            </TouchableOpacity>
            <View style={styles.menuDivider} />
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuItemText}>Connected Bank Accounts</Text>
              <Text style={styles.menuItemValue}>1</Text>
            </TouchableOpacity>
            <View style={styles.menuDivider} />
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuItemText}>Emergency Fund Goal</Text>
              <Text style={styles.menuItemValue}>${userStats.emergencyGoal}</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Settings Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Settings</Text>
          <View style={styles.card}>
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuItemText}>Notifications</Text>
              <Text style={styles.menuItemChevron}>›</Text>
            </TouchableOpacity>
            <View style={styles.menuDivider} />
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuItemText}>Privacy</Text>
              <Text style={styles.menuItemChevron}>›</Text>
            </TouchableOpacity>
            <View style={styles.menuDivider} />
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuItemText}>Help & Support</Text>
              <Text style={styles.menuItemChevron}>›</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* About Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <View style={styles.card}>
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuItemText}>Terms of Service</Text>
              <Text style={styles.menuItemChevron}>›</Text>
            </TouchableOpacity>
            <View style={styles.menuDivider} />
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuItemText}>Privacy Policy</Text>
              <Text style={styles.menuItemChevron}>›</Text>
            </TouchableOpacity>
            <View style={styles.menuDivider} />
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuItemText}>App Version</Text>
              <Text style={styles.menuItemValue}>1.0.0</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton}>
          <Text style={styles.logoutButtonText}>Log Out</Text>
        </TouchableOpacity>

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
    alignItems: 'center',
    padding: Spacing.lg,
    paddingTop: Spacing.xl,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: '600',
    color: Colors.surface,
  },
  userName: {
    ...Typography.h2,
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  userEmail: {
    ...Typography.body,
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
  cardTitle: {
    ...Typography.h3,
    color: Colors.text,
    marginBottom: Spacing.md,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    ...Typography.h2,
    color: Colors.primary,
    marginBottom: Spacing.xs,
  },
  statLabel: {
    ...Typography.caption,
    color: Colors.textSecondary,
  },
  section: {
    marginTop: Spacing.md,
  },
  sectionTitle: {
    ...Typography.h3,
    color: Colors.text,
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.sm,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
  },
  menuItemText: {
    ...Typography.body,
    color: Colors.text,
  },
  menuItemValue: {
    ...Typography.body,
    color: Colors.textSecondary,
  },
  menuItemChevron: {
    fontSize: 24,
    color: Colors.textLight,
  },
  menuDivider: {
    height: 1,
    backgroundColor: Colors.background,
    marginVertical: Spacing.xs,
  },
  logoutButton: {
    backgroundColor: Colors.error,
    marginHorizontal: Spacing.lg,
    marginTop: Spacing.lg,
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
  },
  logoutButtonText: {
    ...Typography.bodyBold,
    color: Colors.surface,
  },
});
