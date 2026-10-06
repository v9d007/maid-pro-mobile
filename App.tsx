import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { colors, spacing, radii, shadows } from './src/theme/tokens';
import { getArchitectureDiagnostics, ArchitectureDiagnostics } from './src/utils/engineCheck';

export default function App() {
  const [diagnostics, setDiagnostics] = useState<ArchitectureDiagnostics>(() =>
    getArchitectureDiagnostics()
  );
  const [selectedTopic, setSelectedTopic] = useState<string | null>('bridge-vs-jsi');

  const refreshDiagnostics = () => {
    setDiagnostics(getArchitectureDiagnostics());
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />

      {/* MaidPro Top Brand Bar */}
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <Text style={styles.brandTitle}>✨ MaidPro Mobile</Text>
          <View style={styles.cityPill}>
            <Text style={styles.cityText}>📍 Agra, UP ▾</Text>
          </View>
        </View>
        <Text style={styles.headerSubtitle}>
          Home Cleaning & Domestic Help Services • Architecture Runtime Check
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Module 1: Architecture & Engine Diagnostics Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>🔬 Module 1: Engine & Architecture Status</Text>
            <TouchableOpacity onPress={refreshDiagnostics} style={styles.refreshBadge}>
              <Text style={styles.refreshText}>🔄 Recheck</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.statusRow}>
            <Text style={styles.metricLabel}>Runtime Architecture:</Text>
            <View
              style={[
                styles.badge,
                diagnostics.isNewArchitecture ? styles.badgeSuccess : styles.badgeWarning,
              ]}
            >
              <Text
                style={[
                  styles.badgeText,
                  diagnostics.isNewArchitecture
                    ? styles.badgeSuccessText
                    : styles.badgeWarningText,
                ]}
              >
                {diagnostics.isNewArchitecture ? '✓ New Architecture' : 'Legacy Bridge'}
              </Text>
            </View>
          </View>

          <View style={styles.statusRow}>
            <Text style={styles.metricLabel}>JavaScript Engine:</Text>
            <View
              style={[
                styles.badge,
                diagnostics.isHermes ? styles.badgeSuccess : styles.badgeWarning,
              ]}
            >
              <Text
                style={[
                  styles.badgeText,
                  diagnostics.isHermes
                    ? styles.badgeSuccessText
                    : styles.badgeWarningText,
                ]}
              >
                {diagnostics.isHermes ? '✓ Hermes AOT' : 'JSC / V8'}
              </Text>
            </View>
          </View>

          <View style={styles.statusRow}>
            <Text style={styles.metricLabel}>Fabric UI Layer:</Text>
            <Text style={styles.metricValue}>
              {diagnostics.isFabric ? 'Active (C++ Shadow Tree)' : 'Bridge Paper UI'}
            </Text>
          </View>

          <View style={styles.statusRow}>
            <Text style={styles.metricLabel}>TurboModules Layer:</Text>
            <Text style={styles.metricValue}>
              {diagnostics.isTurboModules ? 'Active (Lazy JSI Modules)' : 'Eager Native Modules'}
            </Text>
          </View>

          <View style={styles.statusRow}>
            <Text style={styles.metricLabel}>Platform Target:</Text>
            <Text style={styles.metricValue}>
              {Platform.OS.toUpperCase()} {Platform.Version}
            </Text>
          </View>
        </View>

        {/* Interactive Deep-Dive Explorer for Interview Preparation */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>📚 Module 1: Interview Deep-Dive Selector</Text>
          <Text style={styles.cardSubtitle}>
            Tap a topic below to review key architectural interview questions and answers:
          </Text>

          <View style={styles.tabContainer}>
            <TouchableOpacity
              style={[
                styles.topicTab,
                selectedTopic === 'bridge-vs-jsi' && styles.topicTabActive,
              ]}
              onPress={() => setSelectedTopic('bridge-vs-jsi')}
            >
              <Text
                style={[
                  styles.topicTabText,
                  selectedTopic === 'bridge-vs-jsi' && styles.topicTabTextActive,
                ]}
              >
                1. Bridge vs JSI
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.topicTab,
                selectedTopic === 'fabric' && styles.topicTabActive,
              ]}
              onPress={() => setSelectedTopic('fabric')}
            >
              <Text
                style={[
                  styles.topicTabText,
                  selectedTopic === 'fabric' && styles.topicTabTextActive,
                ]}
              >
                2. Fabric & TurboModules
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.topicTab,
                selectedTopic === 'hermes' && styles.topicTabActive,
              ]}
              onPress={() => setSelectedTopic('hermes')}
            >
              <Text
                style={[
                  styles.topicTabText,
                  selectedTopic === 'hermes' && styles.topicTabTextActive,
                ]}
              >
                3. Hermes Engine & GC
              </Text>
            </TouchableOpacity>
          </View>

          {/* Topic Explanations */}
          {selectedTopic === 'bridge-vs-jsi' && (
            <View style={styles.topicDetails}>
              <Text style={styles.qaTitle}>Q: How did the legacy Bridge cause bottlenecks?</Text>
              <Text style={styles.qaAnswer}>
                • The 3-Thread Model: JavaScript Thread (business logic), Shadow Thread (Yoga flexbox calculations), and Main UI Thread (native drawing).{'\n'}
                • The Bridge relied on asynchronous JSON string serialization: JS side ran JSON.stringify(), queued an async message, and the native side parsed it with JSON.parse().{'\n'}
                • Heavy operations (e.g. rapid scrolling) congested the message queue, resulting in blank screen patches and dropped animation frames.
              </Text>

              <Text style={styles.qaTitle}>Q: How does JSI solve this completely?</Text>
              <Text style={styles.qaAnswer}>
                • JSI (JavaScript Interface) provides direct C++ memory references called HostObjects.{'\n'}
                • JavaScript can call native C++ and Objective-C/Java methods synchronously without any JSON stringification.{'\n'}
                • Allows zero-copy data passing between JS and native runtimes.
              </Text>
            </View>
          )}

          {selectedTopic === 'fabric' && (
            <View style={styles.topicDetails}>
              <Text style={styles.qaTitle}>Q: What is Fabric and why is the shadow tree in C++?</Text>
              <Text style={styles.qaAnswer}>
                • In Fabric, the shadow tree (element layout hierarchy) is implemented in C++ and shared directly across threads.{'\n'}
                • It is immutable and thread-safe, enabling synchronous layout calculations and instant measurement.{'\n'}
                • Eliminates jumpy UI and blank virtualized list cells because layout measures happen synchronously before paint.
              </Text>

              <Text style={styles.qaTitle}>Q: How are TurboModules different from old native modules?</Text>
              <Text style={styles.qaAnswer}>
                • Old modules were eagerly loaded on app start (slowing down launch time).{'\n'}
                • TurboModules are lazily loaded on first access via JSI, drastically reducing memory footprint and startup time.{'\n'}
                • Codegen automatically generates C++ glue code from TypeScript specs to guarantee compile-time type safety.
              </Text>
            </View>
          )}

          {selectedTopic === 'hermes' && (
            <View style={styles.topicDetails}>
              <Text style={styles.qaTitle}>Q: Why Hermes AOT over Just-In-Time (JIT) engines?</Text>
              <Text style={styles.qaAnswer}>
                • Ahead-Of-Time (AOT): Hermes pre-compiles JavaScript files into optimized Hermes bytecode during the build phase.{'\n'}
                • At mobile runtime, Hermes executes pre-parsed bytecode immediately without spending CPU time parsing JS strings, cutting Time-to-Interactive (TTI) in half.{'\n'}
                • JIT engines (like V8) are power-hungry on mobile and require large warm-up memory caches.
              </Text>

              <Text style={styles.qaTitle}>Q: How does Hermes Garbage Collection work?</Text>
              <Text style={styles.qaAnswer}>
                • Generational GC: Segregates objects into Young (nursery) and Old generations, scanning short-lived allocations quickly.{'\n'}
                • Non-moving GC: Memory addresses stay fixed, which is critical for direct C++ JSI HostObject pointers without pointer corruption.
              </Text>
            </View>
          )}
        </View>

        {/* Next Step / Phase Preview */}
        <View style={[styles.card, styles.nextPhaseCard]}>
          <Text style={styles.nextPhaseTitle}>🚀 Phase 1 Complete — Ready for Phase 2</Text>
          <Text style={styles.nextPhaseDesc}>
            Foundations are active. In Phase 2, we will implement the Pristine Authority design primitives (`AppButton`, `AppInput`, `AppCard`), Safe Area insets, and Yoga Flexbox layouts.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.primary.DEFAULT,
  },
  header: {
    backgroundColor: colors.primary.DEFAULT,
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.md,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  brandTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#ffffff',
    letterSpacing: -0.5,
  },
  cityPill: {
    backgroundColor: colors.primary.container,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radii.full,
  },
  cityText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#ffffff',
  },
  headerSubtitle: {
    fontSize: 12,
    color: colors.primary.fixed,
    marginTop: spacing.xs,
  },
  scrollContent: {
    backgroundColor: colors.surface.DEFAULT,
    padding: spacing.base,
    paddingBottom: spacing.xxl,
  },
  card: {
    backgroundColor: colors.surface.containerLowest,
    borderRadius: radii.lg,
    padding: spacing.base,
    marginBottom: spacing.base,
    borderWidth: 1,
    borderColor: colors.border.default,
    ...shadows.soft,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text.primary,
  },
  cardSubtitle: {
    fontSize: 13,
    color: colors.text.secondary,
    marginBottom: spacing.md,
  },
  refreshBadge: {
    backgroundColor: colors.primary.lightTint,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: radii.sm,
  },
  refreshText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.primary.DEFAULT,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.surface.containerLow,
  },
  metricLabel: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  metricValue: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.text.primary,
  },
  badge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xxs,
    borderRadius: radii.sm,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '700',
  },
  badgeSuccess: {
    backgroundColor: colors.accent.softTint,
  },
  badgeSuccessText: {
    color: colors.accent.emerald,
    fontSize: 12,
    fontWeight: '700',
  },
  badgeWarning: {
    backgroundColor: colors.surface.containerHigh,
  },
  badgeWarningText: {
    color: colors.text.secondary,
    fontSize: 12,
    fontWeight: '600',
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: spacing.md,
    gap: spacing.xs,
  },
  topicTab: {
    flex: 1,
    paddingVertical: spacing.sm,
    borderRadius: radii.sm,
    backgroundColor: colors.surface.containerLow,
    alignItems: 'center',
  },
  topicTabActive: {
    backgroundColor: colors.primary.DEFAULT,
  },
  topicTabText: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.text.secondary,
  },
  topicTabTextActive: {
    color: '#ffffff',
  },
  topicDetails: {
    backgroundColor: colors.surface.containerLow,
    borderRadius: radii.md,
    padding: spacing.md,
    marginTop: spacing.xs,
  },
  qaTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.primary.DEFAULT,
    marginTop: spacing.xs,
    marginBottom: spacing.xs,
  },
  qaAnswer: {
    fontSize: 12,
    lineHeight: 18,
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  nextPhaseCard: {
    backgroundColor: colors.primary.lightTint,
    borderColor: colors.primary.fixedDim,
  },
  nextPhaseTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.primary.dark,
    marginBottom: spacing.xs,
  },
  nextPhaseDesc: {
    fontSize: 13,
    lineHeight: 18,
    color: colors.primary.DEFAULT,
  },
});
