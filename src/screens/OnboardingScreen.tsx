import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Colors, Spacing, Typography, BorderRadius } from '../constants/theme';

export default function OnboardingScreen() {
  const [email, setEmail] = useState('');
  const [step, setStep] = useState<'email' | 'goal' | 'connect'>('email');
  const [emergencyGoal, setEmergencyGoal] = useState('500');

  const isValidEmail = (email: string) => {
    // Check for .edu email
    return email.endsWith('.edu') && email.includes('@');
  };

  const handleContinue = () => {
    if (step === 'email') {
      if (isValidEmail(email)) {
        setStep('goal');
      } else {
        alert('Please use your university .edu email');
      }
    } else if (step === 'goal') {
      setStep('connect');
    } else {
      // TODO: Navigate to main app
      console.log('Complete onboarding');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <View style={styles.content}>
          {/* Logo/Header */}
          <View style={styles.header}>
            <Text style={styles.logo}>Limina</Text>
            <Text style={styles.subtitle}>
              Smart spending, powered by your peers
            </Text>
          </View>

          {/* Step Content */}
          {step === 'email' && (
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Welcome!</Text>
              <Text style={styles.stepDescription}>
                Sign up with your university email to get started
              </Text>
              <TextInput
                style={styles.input}
                placeholder="yourname@university.edu"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>
          )}

          {step === 'goal' && (
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Set Your Emergency Fund Goal</Text>
              <Text style={styles.stepDescription}>
                Students with $500+ emergency funds report 60% less financial stress
              </Text>
              <View style={styles.goalContainer}>
                <Text style={styles.dollarSign}>$</Text>
                <TextInput
                  style={styles.goalInput}
                  placeholder="500"
                  value={emergencyGoal}
                  onChangeText={setEmergencyGoal}
                  keyboardType="number-pad"
                />
              </View>
              <View style={styles.goalSuggestions}>
                {[300, 500, 1000].map((amount) => (
                  <TouchableOpacity
                    key={amount}
                    style={styles.suggestionChip}
                    onPress={() => setEmergencyGoal(amount.toString())}
                  >
                    <Text style={styles.suggestionText}>${amount}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          {step === 'connect' && (
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Connect Your Bank</Text>
              <Text style={styles.stepDescription}>
                We use Plaid to securely connect your bank account and categorize
                your transactions. Your data is encrypted and never shared.
              </Text>
              <TouchableOpacity style={styles.plaidButton}>
                <Text style={styles.plaidButtonText}>Connect with Plaid</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleContinue}>
                <Text style={styles.skipText}>Skip for now</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Continue Button */}
          {step !== 'connect' && (
            <TouchableOpacity
              style={[
                styles.continueButton,
                (step === 'email' && !isValidEmail(email)) && styles.buttonDisabled,
              ]}
              onPress={handleContinue}
              disabled={step === 'email' && !isValidEmail(email)}
            >
              <Text style={styles.continueButtonText}>Continue</Text>
            </TouchableOpacity>
          )}

          {/* Progress Indicators */}
          <View style={styles.progressContainer}>
            {['email', 'goal', 'connect'].map((s, i) => (
              <View
                key={s}
                style={[
                  styles.progressDot,
                  s === step && styles.progressDotActive,
                ]}
              />
            ))}
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  keyboardView: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: Spacing.lg,
    justifyContent: 'space-between',
  },
  header: {
    alignItems: 'center',
    marginTop: Spacing.xxl,
  },
  logo: {
    fontSize: 48,
    fontWeight: '700',
    color: Colors.primary,
    marginBottom: Spacing.sm,
  },
  subtitle: {
    ...Typography.body,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  stepContent: {
    flex: 1,
    justifyContent: 'center',
  },
  stepTitle: {
    ...Typography.h1,
    color: Colors.text,
    marginBottom: Spacing.md,
  },
  stepDescription: {
    ...Typography.body,
    color: Colors.textSecondary,
    marginBottom: Spacing.xl,
  },
  input: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    fontSize: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  goalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: Spacing.md,
  },
  dollarSign: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.text,
    marginRight: Spacing.sm,
  },
  goalInput: {
    flex: 1,
    fontSize: 24,
    fontWeight: '600',
    color: Colors.text,
  },
  goalSuggestions: {
    flexDirection: 'row',
    marginHorizontal: -Spacing.xs,
  },
  suggestionChip: {
    backgroundColor: Colors.primaryLight,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.round,
    marginHorizontal: Spacing.xs,
  },
  suggestionText: {
    color: Colors.surface,
    fontWeight: '600',
  },
  plaidButton: {
    backgroundColor: Colors.primary,
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  plaidButtonText: {
    color: Colors.surface,
    fontWeight: '600',
    fontSize: 16,
  },
  skipText: {
    ...Typography.body,
    color: Colors.textSecondary,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  continueButton: {
    backgroundColor: Colors.primary,
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: Colors.border,
  },
  continueButtonText: {
    color: Colors.surface,
    fontWeight: '600',
    fontSize: 16,
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: Spacing.lg,
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.border,
    marginHorizontal: Spacing.xs / 2,
  },
  progressDotActive: {
    backgroundColor: Colors.primary,
    width: 24,
  },
});
