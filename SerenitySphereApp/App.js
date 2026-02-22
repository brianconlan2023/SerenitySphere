import React, { useState, useEffect, useContext, useMemo, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Modal, Alert, Platform, StatusBar, ActivityIndicator, KeyboardAvoidingView, FlatList, Image } from 'react-native';
import Slider from '@react-native-community/slider';
import { MaterialIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useQuery, useMutation } from '@tanstack/react-query';

const ComponentFunction = function() {
// @section:theme @depends:[imports]
  const ThemeContext = React.createContext();
  const ThemeProvider = function(props) {
    const [darkMode, setDarkMode] = useState(false);
    const lightTheme = useMemo(function() {
      return {
        colors: {
          primary: '#6366F1',
          accent: '#8B5CF6',
          background: '#F8FAFC',
          card: '#FFFFFF',
          textPrimary: '#1E293B',
          textSecondary: '#64748B',
          border: '#E5E7EB',
          success: '#10B981',
          error: '#EF4444',
          warning: '#F59E0B',
          lightPurple: '#F3E8FF',
          lightBlue: '#EFF6FF',
          lightGreen: '#ECFDF5'
        }
      };
    }, []);
    const darkTheme = useMemo(function() {
      return {
        colors: {
          primary: '#6366F1',
          accent: '#8B5CF6',
          background: '#1F2937',
          card: '#374151',
          textPrimary: '#F9FAFB',
          textSecondary: '#D1D5DB',
          border: '#4B5563',
          success: '#10B981',
          error: '#EF4444',
          warning: '#F59E0B',
          lightPurple: '#4C1D95',
          lightBlue: '#0C2340',
          lightGreen: '#064E3B'
        }
      };
    }, []);
    const theme = darkMode ? darkTheme : lightTheme;
    const toggleDarkMode = useCallback(function() {
      setDarkMode(function(prev) { return !prev; });
    }, []);
    const value = useMemo(function() {
      return { theme: theme, darkMode: darkMode, toggleDarkMode: toggleDarkMode, designStyle: 'gradient' };
    }, [theme, darkMode, toggleDarkMode]);
    return React.createElement(ThemeContext.Provider, { value: value }, props.children);
  };
  const useTheme = function() { return useContext(ThemeContext); };
// @end:theme

// @section:data-functions @depends:[imports]
  const getMeditationSessions = function() {
    return [
      { id: '1', title: 'Morning Calm', description: 'Start your day with peace and clarity', duration: 10, category: 'Mindfulness', level: 'Beginner', rating: 4.8, ageGroup: 'Adult', audioUrl: 'IMAGE:meditation-audio-1' },
      { id: '2', title: 'Body Scan Relaxation', description: 'Release tension from head to toe', duration: 15, category: 'Relaxation', level: 'Beginner', rating: 4.9, ageGroup: 'Adult', audioUrl: 'IMAGE:meditation-audio-2' },
      { id: '3', title: 'Focus Builder', description: 'Sharpen your concentration and focus', duration: 20, category: 'Focus', level: 'Intermediate', rating: 4.7, ageGroup: 'Adult', audioUrl: 'IMAGE:meditation-audio-3' },
      { id: '4', title: 'Sleep Deep', description: 'Drift into peaceful, restorative sleep', duration: 30, category: 'Sleep', level: 'Beginner', rating: 4.9, ageGroup: 'Adult', audioUrl: 'IMAGE:meditation-audio-4' },
      { id: '5', title: 'Stress Release', description: 'Let go of anxiety and worry', duration: 15, category: 'Stress Relief', level: 'Beginner', rating: 4.8, ageGroup: 'Adult', audioUrl: 'IMAGE:meditation-audio-5' },
      { id: '6', title: 'Loving Kindness', description: 'Cultivate compassion and warmth', duration: 20, category: 'Mindfulness', level: 'Intermediate', rating: 4.7, ageGroup: 'Adult', audioUrl: 'IMAGE:meditation-audio-6' },
      { id: '7', title: 'Chakra Balance', description: 'Align your energy centers', duration: 25, category: 'Mindfulness', level: 'Advanced', rating: 4.6, ageGroup: 'Adult', audioUrl: 'IMAGE:meditation-audio-7' },
      { id: '8', title: 'Walking Meditation', description: 'Meditate while moving', duration: 15, category: 'Mindfulness', level: 'Intermediate', rating: 4.5, ageGroup: 'Adult', audioUrl: 'IMAGE:meditation-audio-8' },
      { id: '9', title: 'Deep Ocean Breath', description: 'Calming ocean-inspired meditation', duration: 12, category: 'Relaxation', level: 'Beginner', rating: 4.8, ageGroup: 'Adult', audioUrl: 'IMAGE:meditation-audio-9' },
      { id: '10', title: 'Anxiety Soother', description: 'Quick relief from anxiety spikes', duration: 5, category: 'Stress Relief', level: 'Beginner', rating: 4.9, ageGroup: 'Adult', audioUrl: 'IMAGE:meditation-audio-10' },
      { id: '11', title: 'Gratitude Practice', description: 'Elevate your mood with gratitude', duration: 10, category: 'Mindfulness', level: 'Beginner', rating: 4.8, ageGroup: 'Adult', audioUrl: 'IMAGE:meditation-audio-11' },
      { id: '12', title: 'Advanced Zen', description: 'Deep meditative silence for masters', duration: 45, category: 'Focus', level: 'Advanced', rating: 4.6, ageGroup: 'Adult', audioUrl: 'IMAGE:meditation-audio-12' },
      { id: '13', title: 'Kid Adventures', description: 'Fun journey for young minds', duration: 8, category: 'Mindfulness', level: 'Beginner', rating: 4.9, ageGroup: 'Youth', audioUrl: 'IMAGE:meditation-audio-13' },
      { id: '14', title: 'Senior Gentle', description: 'Easy seated practice for all ages', duration: 12, category: 'Relaxation', level: 'Beginner', rating: 4.9, ageGroup: 'Senior', audioUrl: 'IMAGE:meditation-audio-14' },
      { id: '15', title: 'Work Break Calm', description: 'Quick reset between meetings', duration: 3, category: 'Stress Relief', level: 'Beginner', rating: 4.8, ageGroup: 'Adult', audioUrl: 'IMAGE:meditation-audio-15' },
      { id: '16', title: 'ADHD Focus Flow', description: 'Structured meditation for ADHD minds', duration: 8, category: 'ADHD', level: 'Beginner', rating: 4.9, ageGroup: 'Adult', audioUrl: 'IMAGE:meditation-audio-16' },
      { id: '17', title: 'Grief Healing Journey', description: 'Compassionate support through loss', duration: 20, category: 'Grief Support', level: 'Beginner', rating: 4.9, ageGroup: 'Adult', audioUrl: 'IMAGE:meditation-audio-17' },
      { id: '18', title: 'Bedtime Story', description: 'Magical journey to dreamland', duration: 15, category: 'Sleep', level: 'Beginner', rating: 4.9, ageGroup: 'Youth', audioUrl: 'IMAGE:meditation-audio-18' },
      { id: '19', title: 'Joint Awareness', description: 'Gentle mobility practice for seniors', duration: 18, category: 'Relaxation', level: 'Beginner', rating: 4.8, ageGroup: 'Senior', audioUrl: 'IMAGE:meditation-audio-19' },
      { id: '20', title: 'ADHD Energy Reset', description: 'Quick reset for scattered energy', duration: 5, category: 'ADHD', level: 'Beginner', rating: 4.7, ageGroup: 'Adult', audioUrl: 'IMAGE:meditation-audio-20' }
    ];
  };

  const getBreathingExercises = function() {
    return [
      { id: 1, name: 'Box Breathing', description: '4-4-4-4 pattern for calm focus', pattern: [4, 4, 4, 4], steps: ['Inhale', 'Hold', 'Exhale', 'Hold'], benefits: 'Calm focus, anxiety relief', duration: 5 },
      { id: 2, name: '4-7-8 Breathing', description: 'Deep relaxation technique', pattern: [4, 7, 8], steps: ['Inhale', 'Hold', 'Exhale'], benefits: 'Deep relaxation, sleep', duration: 6 },
      { id: 3, name: 'Belly Breathing', description: 'Diaphragmatic breathing for stress', pattern: [6, 6], steps: ['Inhale', 'Exhale'], benefits: 'Stress relief, calm', duration: 5 },
      { id: 4, name: 'Equal Breathing', description: 'Balanced inhale and exhale', pattern: [5, 5], steps: ['Inhale', 'Exhale'], benefits: 'Balance, clarity', duration: 5 },
      { id: 5, name: 'Triangle Breathing', description: '3-step calming pattern', pattern: [4, 4, 4], steps: ['Inhale', 'Hold', 'Exhale'], benefits: 'Emotional calm', duration: 5 },
      { id: 6, name: 'Alternate Nostril', description: 'Nadi Shodhana - energy balance', pattern: [4, 4, 4], steps: ['Left In', 'Hold', 'Right Out'], benefits: 'Energy balance', duration: 7 },
      { id: 7, name: 'Humming Bee', description: 'Bhramari - calming vibration', pattern: [4, 6], steps: ['Inhale', 'Humming Exhale'], benefits: 'Anxiety relief', duration: 5 },
      { id: 8, name: 'Deep Ocean', description: 'Slow, deep ocean-like breathing', pattern: [8, 8], steps: ['Deep Inhale', 'Deep Exhale'], benefits: 'Deep calm', duration: 6 },
      { id: 9, name: 'Coherent Breathing', description: '5-count resonant breathing', pattern: [5, 5], steps: ['Inhale', 'Exhale'], benefits: 'Heart calm', duration: 5 },
      { id: 10, name: 'Pursed Lip', description: 'Slow controlled exhale', pattern: [3, 6], steps: ['Inhale', 'Slow Exhale'], benefits: 'Anxiety calm', duration: 5 }
    ];
  };

  const getAchievements = function() {
    return [
      { id: 'first-session', name: 'First Breath', description: 'Complete your first meditation', icon: 'star', points: 10 },
      { id: 'streak-7', name: 'One Week Warrior', description: 'Meditate 7 days in a row', icon: 'local-fire-department', points: 50 },
      { id: 'streak-30', name: 'Month Master', description: 'Meditate 30 days in a row', icon: 'grade', points: 250 },
      { id: 'streak-100', name: 'Century Sage', description: 'Meditate 100 days in a row', icon: 'military-tech', points: 1000 },
      { id: 'hour', name: 'Zenned Out', description: 'Complete 60 minutes of meditation', icon: 'timer', points: 75 },
      { id: 'five-hours', name: 'Meditation Master', description: 'Complete 5 hours of meditation', icon: 'psychology', points: 300 },
      { id: 'diverse-100', name: 'Explorer', description: 'Try 10 different meditation types', icon: 'category', points: 100 },
      { id: 'perfect-week', name: 'Perfect Week', description: 'Meditate every day for a week', icon: 'check-circle', points: 60 },
      { id: 'morning-person', name: 'Early Riser', description: 'Complete 10 morning meditations', icon: 'sunny', points: 40 },
      { id: 'night-owl', name: 'Moon Gazer', description: 'Complete 10 evening meditations', icon: 'nights-stay', points: 40 },
      { id: 'breathwork-master', name: 'Breath Master', description: 'Complete 20 breathing exercises', icon: 'air', points: 100 },
      { id: 'focus-champion', name: 'Focus Champion', description: 'Complete 10 focus meditations', icon: 'target', points: 80 }
    ];
  };
// @end:data-functions

// @section:app-provider-state @depends:[imports]
  const useAppProviderState = function() {
    const { data: userProfiles, loading: profilesLoading, refetch: refetchProfiles } = useQuery('user_profiles');
    const { mutate: insertProfile } = useMutation('user_profiles', 'insert');
    const [isHydrated, setIsHydrated] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [onboardingCompleted, setOnboardingCompleted] = useState(false);

    useEffect(function() {
      if (!profilesLoading && userProfiles) {
        if (userProfiles.length > 0) {
          const profile = userProfiles[0];
          setCurrentUser(profile);
          setOnboardingCompleted(profile.onboarding_completed === true || profile.onboarding_completed === 1);
          setIsHydrated(true);
        } else {
          setOnboardingCompleted(false);
          setIsHydrated(true);
        }
      }
    }, [userProfiles, profilesLoading]);

    const completeOnboarding = function(userGoal, userMood, ageGroup) {
      const profileData = {
        username: 'User_' + Math.random().toString(36).substr(2, 9),
        goals: userGoal,
        onboarding_completed: 1,
        current_mood: userMood,
        age_group: ageGroup,
        level: 1,
        total_minutes_meditated: 0
      };

      insertProfile(profileData)
        .then(function() {
          setOnboardingCompleted(true);
          refetchProfiles();
        })
        .catch(function(error) {
          Platform.OS === 'web' ? window.alert('Error: ' + error.message) : Alert.alert('Error', error.message);
        });
    };

    return {
      isHydrated: isHydrated,
      onboardingCompleted: onboardingCompleted,
      currentUser: currentUser,
      completeOnboarding: completeOnboarding,
      refetchProfiles: refetchProfiles
    };
  };
// @end:app-provider-state

// @section:onboarding-state @depends:[imports,theme,app-provider-state]
  const useOnboardingState = function() {
    const themeContext = useTheme();
    const theme = themeContext.theme;
    const [conversationStep, setConversationStep] = useState(0);
    const [userGoal, setUserGoal] = useState(null);
    const [userMood, setUserMood] = useState(null);
    const [userAgeGroup, setUserAgeGroup] = useState(null);
    const [completed, setCompleted] = useState(false);
    
    const conversations = [
      { type: 'ai', text: 'Welcome to SerenitySphere. I\'m your Zen guide. What brings you here today?' },
      { type: 'options', text: 'What is your primary goal?', options: [
        { label: 'Better Sleep', value: 'sleep' },
        { label: 'Reduce Anxiety', value: 'anxiety' },
        { label: 'Improve Focus', value: 'focus' }
      ] },
      { type: 'moods', text: 'Select your current mood', moods: [
        { emoji: '😌', label: 'Calm', value: 'calm' },
        { emoji: '😟', label: 'Anxious', value: 'anxious' },
        { emoji: '😴', label: 'Tired', value: 'tired' },
        { emoji: '😞', label: 'Stressed', value: 'stressed' }
      ] },
      { type: 'agegroup', text: 'Select your age group', options: [
        { label: 'Youth (5-15)', value: 'youth' },
        { label: 'Adult (18-50)', value: 'adult' },
        { label: 'Senior (60+)', value: 'senior' }
      ] },
      { type: 'ai', text: 'Perfect! Your personalized journey begins now.' }
    ];

    return {
      theme: theme,
      conversationStep: conversationStep,
      setConversationStep: setConversationStep,
      userGoal: userGoal,
      setUserGoal: setUserGoal,
      userMood: userMood,
      setUserMood: setUserMood,
      userAgeGroup: userAgeGroup,
      setUserAgeGroup: setUserAgeGroup,
      completed: completed,
      setCompleted: setCompleted,
      conversations: conversations
    };
  };
// @end:onboarding-state

// @section:ZenFlowOnboarding @depends:[onboarding-state,app-provider-state]
  const ZenFlowOnboarding = function(props) {
    const state = useOnboardingState();
    const appProvider = props.appProvider;
    const currentConversation = state.conversations[state.conversationStep];

    const handleNext = function() {
      if (state.conversationStep < state.conversations.length - 1) {
        state.setConversationStep(state.conversationStep + 1);
      } else {
        if (state.userGoal && state.userMood && state.userAgeGroup) {
          appProvider.completeOnboarding(state.userGoal, state.userMood, state.userAgeGroup);
        }
      }
    };

    const handleGoalSelect = function(goal) {
      state.setUserGoal(goal);
      state.setConversationStep(state.conversationStep + 1);
    };

    const handleMoodSelect = function(mood) {
      state.setUserMood(mood);
      state.setConversationStep(state.conversationStep + 1);
    };

    const handleAgeGroupSelect = function(ageGroup) {
      state.setUserAgeGroup(ageGroup);
      state.setConversationStep(state.conversationStep + 1);
    };

    return React.createElement(View, { style: [styles.onboardingContainer, { backgroundColor: state.theme.colors.background }], componentId: 'zen-flow-onboarding' },
      React.createElement(View, { style: styles.onboardingContent, componentId: 'onboarding-content' },
        React.createElement(Image, {
          source: { uri: 'IMAGE:serene-mountain-lake-meditation-backdrop' },
          style: styles.onboardingBackground,
          componentId: 'onboarding-bg'
        }),
        React.createElement(View, { style: [styles.glassmorphicCard, { backgroundColor: state.theme.colors.card + 'E8', padding: 24, borderRadius: 20, marginHorizontal: 20, maxWidth: 500 }], componentId: 'onboarding-card' },
          React.createElement(Text, { style: [styles.onboardingTitle, { color: state.theme.colors.textPrimary }], componentId: 'onboarding-title' }, currentConversation.text),
          
          currentConversation.type === 'options' && React.createElement(View, { style: styles.optionsContainer, componentId: 'onboarding-options' },
            currentConversation.options.map(function(option, index) {
              return React.createElement(TouchableOpacity, {
                key: index,
                style: [styles.optionButtonOnboarding, { borderColor: state.theme.colors.primary }],
                onPress: function() { handleGoalSelect(option.value); },
                componentId: 'onboarding-option-' + index
              },
                React.createElement(Text, { style: [styles.optionTextOnboarding, { color: state.theme.colors.textPrimary }] }, option.label)
              );
            })
          ),

          currentConversation.type === 'agegroup' && React.createElement(View, { style: styles.optionsContainer, componentId: 'onboarding-agegroup' },
            currentConversation.options.map(function(option, index) {
              return React.createElement(TouchableOpacity, {
                key: index,
                style: [styles.optionButtonOnboarding, { borderColor: state.theme.colors.primary }],
                onPress: function() { handleAgeGroupSelect(option.value); },
                componentId: 'onboarding-agegroup-' + index
              },
                React.createElement(Text, { style: [styles.optionTextOnboarding, { color: state.theme.colors.textPrimary }] }, option.label)
              );
            })
          ),

          currentConversation.type === 'moods' && React.createElement(View, { style: styles.moodsContainer, componentId: 'onboarding-moods' },
            currentConversation.moods.map(function(mood, index) {
              return React.createElement(TouchableOpacity, {
                key: index,
                style: styles.moodButtonOnboarding,
                onPress: function() { handleMoodSelect(mood.value); },
                componentId: 'onboarding-mood-' + index
              },
                React.createElement(Text, { style: styles.moodEmojiOnboarding }, mood.emoji),
                React.createElement(Text, { style: [styles.moodLabelOnboarding, { color: state.theme.colors.textSecondary }] }, mood.label)
              );
            })
          ),

          currentConversation.type === 'ai' && state.conversationStep < state.conversations.length - 1 && React.createElement(TouchableOpacity, {
            style: [styles.nextButton, { backgroundColor: state.theme.colors.primary }],
            onPress: handleNext,
            componentId: 'onboarding-next'
          },
            React.createElement(Text, { style: [styles.nextButtonText, { color: '#FFFFFF' }] }, 'Next')
          ),

          state.conversationStep === state.conversations.length - 1 && React.createElement(TouchableOpacity, {
            style: [styles.nextButton, { backgroundColor: state.theme.colors.success }],
            onPress: handleNext,
            componentId: 'onboarding-start'
          },
            React.createElement(Text, { style: [styles.nextButtonText, { color: '#FFFFFF' }] }, 'Start Journey')
          )
        )
      )
    );
  };
// @end:ZenFlowOnboarding

// @section:gamification-state @depends:[imports,data-functions]
  const useGamificationState = function() {
    const { data: sessionLogs } = useQuery('session_logs');
    const [points, setPoints] = useState(0);
    const [level, setLevel] = useState(1);
    const [streak, setStreak] = useState(0);
    const [unlockedAchievements, setUnlockedAchievements] = useState([]);
    const [todayProgress, setTodayProgress] = useState(0);

    useEffect(function() {
      if (sessionLogs && sessionLogs.length > 0) {
        var today = new Date().toDateString();
        var todayMinutes = sessionLogs
          .filter(function(log) { return new Date(log.timestamp).toDateString() === today; })
          .reduce(function(sum, log) { return sum + (log.duration || 0); }, 0);
        setTodayProgress(todayMinutes);

        var totalMinutes = sessionLogs.reduce(function(sum, log) { return sum + (log.duration || 0); }, 0);
        var calculatedLevel = Math.floor(totalMinutes / 60) + 1;
        var calculatedPoints = totalMinutes * 10;
        setLevel(calculatedLevel);
        setPoints(calculatedPoints);

        var unlocked = [];
        if (sessionLogs.length > 0) unlocked.push('first-session');
        if (totalMinutes >= 60) unlocked.push('hour');
        if (totalMinutes >= 300) unlocked.push('five-hours');
        setUnlockedAchievements(unlocked);
      }
    }, [sessionLogs]);

    return {
      points: points,
      setPoints: setPoints,
      level: level,
      setLevel: setLevel,
      streak: streak,
      setStreak: setStreak,
      unlockedAchievements: unlockedAchievements,
      setUnlockedAchievements: setUnlockedAchievements,
      todayProgress: todayProgress,
      setTodayProgress: setTodayProgress,
      sessionLogs: sessionLogs || []
    };
  };
// @end:gamification-state

// @section:chatbot-state @depends:[imports]
  const useChatbotState = function() {
    const [messages, setMessages] = useState([
      { id: 1, text: 'Namaste, friend. I am your meditation guide. How can I help you find peace today?', sender: 'ai' }
    ]);
    const [inputText, setInputText] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const aiResponses = {
      sleep: [
        'Try "Sleep Deep" - a 30-minute journey to peaceful rest. Would you like me to start it for you?',
        'For better sleep, I recommend progressive relaxation. Start with just 10 minutes tonight.',
        'The "Cosmic Sleep Journey" session combines visualization with breathing. Perfect for deep rest.'
      ],
      focus: [
        'Let\'s enhance your focus with "Power Hour Focus" - 23 minutes of laser-sharp concentration.',
        'Try the "Focus Builder" session. Structured concentration techniques work wonders.',
        'Short on time? The 3-minute "Work Break Calm" resets your mind between tasks.'
      ],
      anxiety: [
        'The "Anxiety Soother" is my recommendation - just 5 minutes of relief.',
        'Let\'s practice box breathing together. In for 4, hold for 4, out for 4.',
        'Try "Anxiety Shield" - create a mental fortress against worry in just 18 minutes.'
      ],
      breathing: [
        'Box breathing is excellent for calm focus. Ready to try it?',
        'The 4-7-8 technique is perfect for deep relaxation. Shall we begin?',
        'Alternate nostril breathing balances your energy. Would you like to start?'
      ],
      default: [
        'What would help you most right now - better sleep, focus, or stress relief?',
        'I\'m here to guide you. Explore our library or try a quick breathing exercise.',
        'Every moment of mindfulness counts. Which session calls to you?'
      ]
    };

    const sendMessage = function(userMessage) {
      if (!userMessage.trim()) return;

      setMessages(function(prev) {
        return prev.concat({ id: Date.now(), text: userMessage, sender: 'user' });
      });
      setInputText('');
      setIsLoading(true);

      setTimeout(function() {
        var responseKey = 'default';
        if (userMessage.toLowerCase().includes('sleep') || userMessage.toLowerCase().includes('rest')) {
          responseKey = 'sleep';
        } else if (userMessage.toLowerCase().includes('focus') || userMessage.toLowerCase().includes('concentration')) {
          responseKey = 'focus';
        } else if (userMessage.toLowerCase().includes('anxiety') || userMessage.toLowerCase().includes('worry')) {
          responseKey = 'anxiety';
        } else if (userMessage.toLowerCase().includes('breath') || userMessage.toLowerCase().includes('breathing')) {
          responseKey = 'breathing';
        }

        var responses = aiResponses[responseKey];
        var randomResponse = responses[Math.floor(Math.random() * responses.length)];

        setMessages(function(prev) {
          return prev.concat({ id: Date.now() + 1, text: randomResponse, sender: 'ai' });
        });
        setIsLoading(false);
      }, 1000);
    };

    return {
      messages: messages,
      inputText: inputText,
      setInputText: setInputText,
      isLoading: isLoading,
      sendMessage: sendMessage
    };
  };
// @end:chatbot-state

// @section:chatbot-modal @depends:[chatbot-state]
  const ChatbotModal = function(props) {
    const visible = props.visible;
    const onClose = props.onClose;
    const theme = props.theme;
    const state = useChatbotState();

    return React.createElement(Modal, {
      visible: visible,
      animationType: 'slide',
      transparent: false,
      onRequestClose: onClose,
      componentId: 'chatbot-modal'
    },
      React.createElement(View, { style: [styles.container, { backgroundColor: theme.colors.background }], componentId: 'chatbot-container' },
        React.createElement(View, { style: [styles.chatbotHeader, { backgroundColor: theme.colors.primary }], componentId: 'chatbot-header' },
          React.createElement(TouchableOpacity, {
            style: styles.chatbotClose,
            onPress: onClose,
            componentId: 'chatbot-close-button'
          },
            React.createElement(MaterialIcons, { name: 'close', size: 24, color: '#FFFFFF' })
          ),
          React.createElement(Text, { style: [styles.chatbotTitle, { color: '#FFFFFF' }], componentId: 'chatbot-title' }, 'Zen Guide AI Coach')
        ),

        React.createElement(FlatList, {
          data: state.messages,
          keyExtractor: function(item) { return item.id.toString(); },
          renderItem: function(itemData) {
            const message = itemData.item;
            const isAI = message.sender === 'ai';
            return React.createElement(View, {
              style: [styles.messageBubble, isAI ? { alignItems: 'flex-start' } : { alignItems: 'flex-end' }],
              componentId: 'chat-message-' + message.id
            },
              React.createElement(View, {
                style: [
                  styles.message,
                  { backgroundColor: isAI ? theme.colors.card + '90' : theme.colors.primary }
                ],
                componentId: 'message-content'
              },
                React.createElement(Text, {
                  style: [
                    styles.messageText,
                    { color: isAI ? theme.colors.textPrimary : '#FFFFFF' }
                  ]
                }, message.text)
              )
            );
          },
          inverted: false,
          contentContainerStyle: { padding: 16 },
          componentId: 'chatbot-messages'
        }),

        React.createElement(View, { style: [styles.chatbotInputContainer, { borderTopColor: theme.colors.border }], componentId: 'chatbot-input-section' },
          React.createElement(TextInput, {
            style: [styles.chatbotInput, { 
              backgroundColor: theme.colors.card,
              color: theme.colors.textPrimary,
              borderColor: theme.colors.border
            }],
            placeholder: 'Ask me anything...',
            placeholderTextColor: theme.colors.textSecondary,
            value: state.inputText,
            onChangeText: state.setInputText,
            onSubmitEditing: function() { state.sendMessage(state.inputText); },
            componentId: 'chatbot-text-input'
          }),
          React.createElement(TouchableOpacity, {
            style: [styles.chatbotSend, { backgroundColor: theme.colors.primary }],
            onPress: function() { state.sendMessage(state.inputText); },
            componentId: 'chatbot-send-button'
          },
            React.createElement(MaterialIcons, { name: 'send', size: 20, color: '#FFFFFF' })
          )
        )
      )
    );
  };
// @end:chatbot-modal

// @section:mood-matrix-state @depends:[imports]
  const useMoodMatrixState = function() {
    const [moodScore, setMoodScore] = useState(50);
    const [energyScore, setEnergyScore] = useState(50);

    var moodLabel = '';
    var energyLabel = '';

    if (moodScore < 30) moodLabel = 'Stressed';
    else if (moodScore < 60) moodLabel = 'Anxious';
    else moodLabel = 'Calm';

    if (energyScore < 30) energyLabel = 'Low Energy';
    else if (energyScore < 60) energyLabel = 'Balanced';
    else energyLabel = 'High Energy';

    return {
      moodScore: moodScore,
      setMoodScore: setMoodScore,
      energyScore: energyScore,
      setEnergyScore: setEnergyScore,
      moodLabel: moodLabel,
      energyLabel: energyLabel
    };
  };
// @end:mood-matrix-state

// @section:mood-matrix-component @depends:[mood-matrix-state]
  const MoodMatrix = function(props) {
    const state = useMoodMatrixState();
    const theme = props.theme;
    const { mutate: insertLog } = props.insertLog;

    const handleMoodSubmit = function() {
      const logData = {
        mood_before: state.moodLabel + ' (' + state.moodScore + ')',
        timestamp: new Date().toISOString(),
        session_type: 'mood_checkin'
      };
      insertLog(logData);
      props.onClose();
    };

    return React.createElement(View, { style: [styles.glassmorphicCard, styles.moodMatrixContainer, { backgroundColor: theme.colors.card + '90' }], componentId: 'mood-matrix-component' },
      React.createElement(Text, { style: [styles.moodMatrixTitle, { color: theme.colors.textPrimary }], componentId: 'mood-matrix-title' }, 'Mood Matrix'),
      
      React.createElement(View, { style: styles.moodMatrixAxis, componentId: 'mood-axis' },
        React.createElement(Text, { style: [styles.axisLabel, { color: theme.colors.textSecondary }], componentId: 'mood-label-left' }, 'Stressed'),
        React.createElement(Slider, {
          style: { flex: 1, marginHorizontal: 16 },
          minimumValue: 0,
          maximumValue: 100,
          value: state.moodScore,
          onValueChange: state.setMoodScore,
          minimumTrackTintColor: theme.colors.error,
          maximumTrackTintColor: theme.colors.success,
          componentId: 'mood-slider'
        }),
        React.createElement(Text, { style: [styles.axisLabel, { color: theme.colors.textSecondary }], componentId: 'mood-label-right' }, 'Calm')
      ),
      React.createElement(Text, { style: [styles.moodValue, { color: theme.colors.primary }], componentId: 'mood-value' }, state.moodLabel),

      React.createElement(View, { style: styles.moodMatrixAxis, componentId: 'energy-axis' },
        React.createElement(Text, { style: [styles.axisLabel, { color: theme.colors.textSecondary }], componentId: 'energy-label-left' }, 'Low'),
        React.createElement(Slider, {
          style: { flex: 1, marginHorizontal: 16 },
          minimumValue: 0,
          maximumValue: 100,
          value: state.energyScore,
          onValueChange: state.setEnergyScore,
          minimumTrackTintColor: theme.colors.accent,
          maximumTrackTintColor: theme.colors.primary,
          componentId: 'energy-slider'
        }),
        React.createElement(Text, { style: [styles.axisLabel, { color: theme.colors.textSecondary }], componentId: 'energy-label-right' }, 'High')
      ),
      React.createElement(Text, { style: [styles.moodValue, { color: theme.colors.accent }], componentId: 'energy-value' }, state.energyLabel),

      React.createElement(TouchableOpacity, {
        style: [styles.moodMatrixSubmit, { backgroundColor: theme.colors.primary }],
        onPress: handleMoodSubmit,
        componentId: 'mood-matrix-submit'
      },
        React.createElement(Text, { style: [styles.moodMatrixSubmitText, { color: '#FFFFFF' }] }, 'Log Mood')
      )
    );
  };
// @end:mood-matrix-component

// @section:progress-engine-state @depends:[imports]
  const useProgressEngineState = function() {
    const { data: sessionLogs } = useQuery('session_logs');
    const [streak, setStreak] = useState(0);
    const [nextMilestone, setNextMilestone] = useState(10);
    const [progressToMilestone, setProgressToMilestone] = useState(0);

    useEffect(function() {
      if (sessionLogs && sessionLogs.length > 0) {
        var today = new Date().toDateString();
        var todayCount = sessionLogs.filter(function(log) {
          return new Date(log.timestamp).toDateString() === today;
        }).length;
        setStreak(todayCount);

        var milestones = [10, 30, 50, 100, 365];
        var totalSessions = sessionLogs.length;
        var nextMile = milestones.find(function(m) { return m > totalSessions; }) || 365;
        setNextMilestone(nextMile);

        var previousMilestone = milestones.filter(function(m) { return m <= totalSessions; }).pop() || 0;
        var progress = ((totalSessions - previousMilestone) / (nextMile - previousMilestone)) * 100;
        setProgressToMilestone(Math.min(progress, 100));
      }
    }, [sessionLogs]);

    return {
      streak: streak,
      nextMilestone: nextMilestone,
      progressToMilestone: progressToMilestone
    };
  };
// @end:progress-engine-state

// @section:progress-engine-component @depends:[progress-engine-state]
  const ProgressEngine = function(props) {
    const state = useProgressEngineState();
    const theme = props.theme;

    return React.createElement(View, { style: [styles.glassmorphicCard, styles.progressContainer, { backgroundColor: theme.colors.primary + '20' }], componentId: 'progress-engine-component' },
      React.createElement(View, { style: styles.progressHeader, componentId: 'progress-header' },
        React.createElement(MaterialIcons, { name: 'local-fire-department', size: 24, color: theme.colors.accent }),
        React.createElement(Text, { style: [styles.progressLabel, { color: theme.colors.textPrimary }], componentId: 'streak-label' }, 'Daily Streak: ' + state.streak)
      ),

      React.createElement(View, { style: styles.milestoneSection, componentId: 'milestone-section' },
        React.createElement(Text, { style: [styles.milestoneLabel, { color: theme.colors.textSecondary }], componentId: 'milestone-text' }, 
          'Next Milestone: ' + state.nextMilestone + ' sessions'),
        React.createElement(View, { style: [styles.progressBar, { backgroundColor: theme.colors.border }], componentId: 'progress-bar-bg' },
          React.createElement(View, {
            style: [
              styles.progressFill,
              { 
                width: state.progressToMilestone + '%',
                backgroundColor: theme.colors.success
              }
            ],
            componentId: 'progress-bar-fill'
          })
        ),
        React.createElement(Text, { style: [styles.progressPercent, { color: theme.colors.primary }], componentId: 'progress-percent' },
          Math.round(state.progressToMilestone) + '%')
      )
    );
  };
// @end:progress-engine-component

// @section:home-screen-state @depends:[theme,imports,data-functions,gamification-state]
  const useHomeScreenState = function() {
    const themeContext = useTheme();
    const theme = themeContext.theme;
    const { data: profile } = useQuery('user_profiles');
    const { data: sessionLogs } = useQuery('session_logs');
    const gamification = useGamificationState();
    const [selectedMood, setSelectedMood] = useState(null);
    const [showMoodModal, setShowMoodModal] = useState(false);
    const [currentStreak, setCurrentStreak] = useState(0);
    const [showChatbot, setShowChatbot] = useState(false);
    const [totalSessions, setTotalSessions] = useState(0);
    const [totalMinutes, setTotalMinutes] = useState(0);
    const [ambientSound, setAmbientSound] = useState('rain');
    const [showDailyChallenge, setShowDailyChallenge] = useState(false);
    
    useEffect(function() {
      if (sessionLogs && sessionLogs.length > 0) {
        var today = new Date().toDateString();
        var todaySessions = sessionLogs.filter(function(log) {
          return new Date(log.timestamp).toDateString() === today;
        });
        setCurrentStreak(todaySessions.length);
        setTotalSessions(sessionLogs.length);
        var mins = sessionLogs.reduce(function(sum, log) { return sum + (log.duration || 0); }, 0);
        setTotalMinutes(mins);
      }
    }, [sessionLogs]);

    return {
      theme: theme,
      profile: profile && profile.length > 0 ? profile[0] : null,
      selectedMood: selectedMood,
      setSelectedMood: setSelectedMood,
      showMoodModal: showMoodModal,
      setShowMoodModal: setShowMoodModal,
      currentStreak: currentStreak,
      showChatbot: showChatbot,
      setShowChatbot: setShowChatbot,
      totalSessions: totalSessions,
      totalMinutes: totalMinutes,
      ambientSound: ambientSound,
      setAmbientSound: setAmbientSound,
      gamification: gamification,
      showDailyChallenge: showDailyChallenge,
      setShowDailyChallenge: setShowDailyChallenge
    };
  };
// @end:home-screen-state

// @section:home-screen-handlers @depends:[imports]
  const homeScreenHandlers = {
    submitMoodCheckin: function(state, mood) {
      const { mutate: insertLog } = useMutation('session_logs', 'insert');
      const logData = {
        mood_before: mood,
        timestamp: new Date().toISOString(),
        session_type: 'mood_checkin'
      };
      insertLog(logData)
        .then(function() {
          state.setShowMoodModal(false);
          Platform.OS === 'web' ? window.alert('Mood logged successfully!') : Alert.alert('Success', 'Mood logged successfully!');
        })
        .catch(function(error) {
          Platform.OS === 'web' ? window.alert(error.message) : Alert.alert('Error', error.message);
        });
    },
    openChatbot: function(state) {
      state.setShowChatbot(true);
    }
  };

  const renderMoodModal = function(visible, onClose, onSubmit, theme) {
    const moods = [
      { emoji: '😊', label: 'Happy', value: 5 },
      { emoji: '😌', label: 'Calm', value: 4 },
      { emoji: '😐', label: 'Neutral', value: 3 },
      { emoji: '😟', label: 'Anxious', value: 2 },
      { emoji: '😢', label: 'Stressed', value: 1 }
    ];

    return React.createElement(Modal, {
      visible: visible,
      animationType: 'slide',
      transparent: true,
      onRequestClose: onClose
    },
      React.createElement(View, { style: styles.modalOverlay, componentId: 'home-mood-modal-overlay' },
        React.createElement(View, { style: [styles.glassmorphicCard, styles.modalContent, { backgroundColor: theme.colors.card + 'E8' }], componentId: 'home-mood-modal-content' },
          React.createElement(Text, { style: [styles.modalTitle, { color: theme.colors.textPrimary }], componentId: 'home-mood-modal-title' }, 'How are you feeling?'),
          React.createElement(View, { style: styles.moodGrid, componentId: 'home-mood-grid' },
            moods.map(function(mood, index) {
              return React.createElement(TouchableOpacity, {
                key: index,
                style: styles.moodButton,
                onPress: function() { onSubmit(mood.value); },
                componentId: 'home-mood-button-' + index
              },
                React.createElement(Text, { style: styles.moodEmoji }, mood.emoji),
                React.createElement(Text, { style: [styles.moodLabel, { color: theme.colors.textSecondary }] }, mood.label)
              );
            })
          ),
          React.createElement(TouchableOpacity, {
            style: styles.closeButton,
            onPress: onClose,
            componentId: 'home-mood-close'
          },
            React.createElement(MaterialIcons, { name: 'close', size: 24, color: theme.colors.textSecondary })
          )
        )
      )
    );
  };

  const renderQuickSession = function(session, theme, onPress) {
    return React.createElement(TouchableOpacity, {
      style: [styles.quickSessionCard, styles.glassmorphicCard, { backgroundColor: theme.colors.card + '90' }],
      onPress: onPress,
      componentId: 'home-quick-session-' + session.id
    },
      React.createElement(Image, {
        source: { uri: 'IMAGE:peaceful-meditation-garden-nature' },
        style: styles.quickSessionImage,
        componentId: 'home-quick-session-image'
      }),
      React.createElement(View, { style: styles.quickSessionContent, componentId: 'home-quick-session-content' },
        React.createElement(Text, { style: [styles.quickSessionTitle, { color: theme.colors.textPrimary }] }, session.title),
        React.createElement(Text, { style: [styles.quickSessionDuration, { color: theme.colors.textSecondary }] }, session.duration + ' min'),
        React.createElement(View, { style: styles.quickSessionTags, componentId: 'home-quick-session-tags' },
          React.createElement(View, { style: [styles.tag, { backgroundColor: theme.colors.primary + '20' }], componentId: 'home-session-tag' },
            React.createElement(Text, { style: [styles.tagText, { color: theme.colors.primary }] }, session.category)
          )
        )
      )
    );
  };

  const renderDailyChallengeModal = function(visible, onClose, theme) {
    const dailyChallenges = [
      { id: 1, title: '30-Minute Challenge', description: 'Meditate for 30 minutes today', target: 30, icon: 'timer', reward: 150 },
      { id: 2, title: 'Breathing Master', description: 'Complete 5 breathing exercises', target: 5, icon: 'air', reward: 100 },
      { id: 3, title: 'Focus Fury', description: 'Complete 3 focus meditations', target: 3, icon: 'target', reward: 120 }
    ];

    return React.createElement(Modal, {
      visible: visible,
      animationType: 'slide',
      transparent: true,
      onRequestClose: onClose
    },
      React.createElement(View, { style: styles.modalOverlay, componentId: 'daily-challenge-overlay' },
        React.createElement(View, { style: [styles.glassmorphicCard, styles.modalContent, { backgroundColor: theme.colors.card + 'E8' }], componentId: 'daily-challenge-content' },
          React.createElement(View, { style: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }, componentId: 'daily-challenge-header' },
            React.createElement(Text, { style: [styles.modalTitle, { color: theme.colors.textPrimary }], componentId: 'daily-challenge-title' }, 'Daily Challenges'),
            React.createElement(TouchableOpacity, {
              style: styles.closeButton,
              onPress: onClose,
              componentId: 'daily-challenge-close'
            },
              React.createElement(MaterialIcons, { name: 'close', size: 24, color: theme.colors.textSecondary })
            )
          ),
          React.createElement(ScrollView, { style: { maxHeight: 300 }, componentId: 'daily-challenges-scroll' },
            dailyChallenges.map(function(challenge, index) {
              return React.createElement(View, {
                key: index,
                style: [styles.challengeCard, { backgroundColor: theme.colors.background + '80', marginBottom: 12 }],
                componentId: 'daily-challenge-' + index
              },
                React.createElement(View, { style: { flexDirection: 'row', justifyContent: 'space-between' }, componentId: 'challenge-header' },
                  React.createElement(View, { style: { flex: 1 }, componentId: 'challenge-info' },
                    React.createElement(Text, { style: [styles.challengeTitle, { color: theme.colors.textPrimary }] }, challenge.title),
                    React.createElement(Text, { style: [styles.challengeDescription, { color: theme.colors.textSecondary }] }, challenge.description)
                  ),
                  React.createElement(View, { style: { alignItems: 'center' }, componentId: 'challenge-reward' },
                    React.createElement(MaterialIcons, { name: challenge.icon, size: 24, color: theme.colors.primary }),
                    React.createElement(Text, { style: [styles.rewardPoints, { color: theme.colors.primary }] }, '+' + challenge.reward)
                  )
                )
              );
            })
          )
        )
      )
    );
  };
// @end:home-screen-handlers

// @section:HomeScreen @depends:[home-screen-state,home-screen-handlers,data-functions,progress-engine-component,mood-matrix-component]
  const HomeScreen = function() {
    const state = useHomeScreenState();
    const handlers = homeScreenHandlers;
    const { mutate: insertLog } = useMutation('session_logs', 'insert');

    const startQuickSession = function(session) {
      const logData = {
        meditation_id: session.id,
        timestamp: new Date().toISOString(),
        session_type: 'meditation',
        duration: session.duration
      };
      insertLog(logData)
        .then(function() {
          Platform.OS === 'web' ? window.alert('Session started! Enjoy your meditation.') : Alert.alert('Session Started', 'Enjoy your meditation.');
        })
        .catch(function(error) {
          Platform.OS === 'web' ? window.alert(error.message) : Alert.alert('Error', error.message);
        });
    };

    const allSessions = getMeditationSessions();
    const userAgeGroup = state.profile ? state.profile.age_group : 'adult';
    const recommendedSessions = allSessions
      .filter(function(s) { return s.ageGroup === userAgeGroup.toLowerCase() || s.ageGroup === 'Adult'; })
      .slice(0, 3);

    return React.createElement(ScrollView, {
      style: [styles.container, { backgroundColor: state.theme.colors.background }],
      contentContainerStyle: { paddingBottom: Platform.OS === 'web' ? 90 : 100 },
      componentId: 'home-screen-scroll'
    },
      React.createElement(View, { style: styles.header, componentId: 'home-header' },
        React.createElement(Text, { style: [styles.greeting, { color: state.theme.colors.textPrimary }], componentId: 'home-greeting' }, 'Welcome to SerenitySphere'),
        React.createElement(Text, { style: [styles.subtitle, { color: state.theme.colors.textSecondary }], componentId: 'home-subtitle' }, 'Find your inner peace today'),
        React.createElement(Image, {
          source: { uri: 'IMAGE:serene-mountain-lake-meditation-backdrop' },
          style: styles.headerImage,
          componentId: 'home-header-image'
        })
      ),

      React.createElement(View, { style: styles.gamificationBanner, componentId: 'home-gamification-banner' },
        React.createElement(View, { style: [styles.glassmorphicCard, { backgroundColor: state.theme.colors.primary + '20', flex: 1, flexDirection: 'row', alignItems: 'center', padding: 16, marginRight: 8, borderRadius: 12 }], componentId: 'home-points-card' },
          React.createElement(MaterialIcons, { name: 'star', size: 24, color: state.theme.colors.primary }),
          React.createElement(View, { style: { marginLeft: 12 }, componentId: 'home-points-info' },
            React.createElement(Text, { style: [styles.pointsLabel, { color: state.theme.colors.textSecondary }] }, 'Points'),
            React.createElement(Text, { style: [styles.pointsValue, { color: state.theme.colors.primary }] }, state.gamification.points.toString())
          )
        ),
        React.createElement(View, { style: [styles.glassmorphicCard, { backgroundColor: state.theme.colors.accent + '20', flex: 1, flexDirection: 'row', alignItems: 'center', padding: 16, borderRadius: 12 }], componentId: 'home-level-card' },
          React.createElement(MaterialIcons, { name: 'grade', size: 24, color: state.theme.colors.accent }),
          React.createElement(View, { style: { marginLeft: 12 }, componentId: 'home-level-info' },
            React.createElement(Text, { style: [styles.levelLabel, { color: state.theme.colors.textSecondary }] }, 'Level'),
            React.createElement(Text, { style: [styles.levelValue, { color: state.theme.colors.accent }] }, state.gamification.level.toString())
          )
        )
      ),

      React.createElement(ProgressEngine, { theme: state.theme, componentId: 'home-progress-engine' }),

      React.createElement(View, { style: styles.statsContainer, componentId: 'home-stats' },
        React.createElement(View, { style: [styles.glassmorphicCard, styles.statCard, { backgroundColor: state.theme.colors.card + '80' }], componentId: 'home-streak-card' },
          React.createElement(MaterialIcons, { name: 'local-fire-department', size: 24, color: state.theme.colors.accent }),
          React.createElement(Text, { style: [styles.statNumber, { color: state.theme.colors.textPrimary }] }, state.currentStreak.toString()),
          React.createElement(Text, { style: [styles.statLabel, { color: state.theme.colors.textSecondary }] }, 'Today')
        ),
        React.createElement(View, { style: [styles.glassmorphicCard, styles.statCard, { backgroundColor: state.theme.colors.card + '80' }], componentId: 'home-total-card' },
          React.createElement(MaterialIcons, { name: 'trending-up', size: 24, color: state.theme.colors.success }),
          React.createElement(Text, { style: [styles.statNumber, { color: state.theme.colors.textPrimary }] }, state.totalSessions.toString()),
          React.createElement(Text, { style: [styles.statLabel, { color: state.theme.colors.textSecondary }] }, 'Sessions')
        ),
        React.createElement(TouchableOpacity, {
          style: [styles.glassmorphicCard, styles.statCard, styles.moodCard, { backgroundColor: state.theme.colors.primary + 'E0' }],
          onPress: function() { state.setShowMoodModal(true); },
          componentId: 'home-mood-checkin'
        },
          React.createElement(MaterialIcons, { name: 'mood', size: 24, color: '#FFFFFF' }),
          React.createElement(Text, { style: [styles.statLabel, { color: '#FFFFFF' }] }, 'Mood Check')
        )
      ),

      React.createElement(TouchableOpacity, {
        style: [styles.glassmorphicCard, styles.dailyChallengeButton, { backgroundColor: state.theme.colors.warning + '20' }],
        onPress: function() { state.setShowDailyChallenge(true); },
        componentId: 'home-daily-challenge'
      },
        React.createElement(MaterialIcons, { name: 'emoji-events', size: 24, color: state.theme.colors.warning }),
        React.createElement(View, { style: { marginLeft: 12, flex: 1 }, componentId: 'daily-challenge-info' },
          React.createElement(Text, { style: [styles.dailyChallengeTitle, { color: theme.colors.textPrimary }] }, 'Daily Challenge'),
          React.createElement(Text, { style: [styles.dailyChallengeText, { color: theme.colors.textSecondary }] }, 'Complete challenges to earn rewards')
        ),
        React.createElement(MaterialIcons, { name: 'chevron-right', size: 24, color: theme.colors.textSecondary })
      ),

      React.createElement(View, { style: styles.ambientSection, componentId: 'home-ambient-section' },
        React.createElement(Text, { style: [styles.sectionTitle, { color: state.theme.colors.textPrimary }], componentId: 'home-ambient-title' }, 'Ambient Aura'),
        React.createElement(View, { style: styles.ambientGrid, componentId: 'home-ambient-grid' },
          React.createElement(TouchableOpacity, {
            style: [styles.ambientButton, { backgroundColor: state.ambientSound === 'rain' ? state.theme.colors.primary : state.theme.colors.card + '80' }],
            onPress: function() { state.setAmbientSound('rain'); },
            componentId: 'home-ambient-rain'
          },
            React.createElement(MaterialIcons, { name: 'cloud', size: 24, color: state.ambientSound === 'rain' ? '#FFFFFF' : state.theme.colors.textSecondary }),
            React.createElement(Text, { style: [styles.ambientLabel, { color: state.ambientSound === 'rain' ? '#FFFFFF' : state.theme.colors.textPrimary }] }, 'Rain')
          ),
          React.createElement(TouchableOpacity, {
            style: [styles.ambientButton, { backgroundColor: state.ambientSound === 'forest' ? state.theme.colors.primary : state.theme.colors.card + '80' }],
            onPress: function() { state.setAmbientSound('forest'); },
            componentId: 'home-ambient-forest'
          },
            React.createElement(MaterialIcons, { name: 'nature', size: 24, color: state.ambientSound === 'forest' ? '#FFFFFF' : state.theme.colors.textSecondary }),
            React.createElement(Text, { style: [styles.ambientLabel, { color: state.ambientSound === 'forest' ? '#FFFFFF' : state.theme.colors.textPrimary }] }, 'Forest')
          ),
          React.createElement(TouchableOpacity, {
            style: [styles.ambientButton, { backgroundColor: state.ambientSound === 'whitenoise' ? state.theme.colors.primary : state.theme.colors.card + '80' }],
            onPress: function() { state.setAmbientSound('whitenoise'); },
            componentId: 'home-ambient-noise'
          },
            React.createElement(MaterialIcons, { name: 'volume-up', size: 24, color: state.ambientSound === 'whitenoise' ? '#FFFFFF' : state.theme.colors.textSecondary }),
            React.createElement(Text, { style: [styles.ambientLabel, { color: state.ambientSound === 'whitenoise' ? '#FFFFFF' : state.theme.colors.textPrimary }] }, 'White Noise')
          )
        )
      ),

      React.createElement(View, { style: styles.section, componentId: 'home-recommended-section' },
        React.createElement(Text, { style: [styles.sectionTitle, { color: state.theme.colors.textPrimary }], componentId: 'home-recommended-title' }, 'Recommended for You'),
        recommendedSessions.map(function(session) {
          return renderQuickSession(session, state.theme, function() { startQuickSession(session); });
        })
      ),

      React.createElement(View, { style: styles.quickActions, componentId: 'home-quick-actions' },
        React.createElement(Text, { style: [styles.sectionTitle, { color: state.theme.colors.textPrimary }], componentId: 'home-quick-title' }, 'Quick Actions'),
        React.createElement(View, { style: styles.actionGrid, componentId: 'home-action-grid' },
          React.createElement(TouchableOpacity, {
            style: [styles.glassmorphicCard, styles.actionButton, { backgroundColor: state.theme.colors.primary + '20' }],
            componentId: 'home-action-breathe'
          },
            React.createElement(MaterialIcons, { name: 'air', size: 32, color: state.theme.colors.primary }),
            React.createElement(Text, { style: [styles.actionLabel, { color: state.theme.colors.textPrimary }] }, 'Quick Breathe')
          ),
          React.createElement(TouchableOpacity, {
            style: [styles.glassmorphicCard, styles.actionButton, { backgroundColor: state.theme.colors.accent + '20' }],
            componentId: 'home-action-sleep'
          },
            React.createElement(MaterialIcons, { name: 'bedtime', size: 32, color: state.theme.colors.accent }),
            React.createElement(Text, { style: [styles.actionLabel, { color: state.theme.colors.textPrimary }] }, 'Sleep Sounds')
          ),
          React.createElement(TouchableOpacity, {
            style: [styles.glassmorphicCard, styles.actionButton, { backgroundColor: state.theme.colors.success + '20' }],
            onPress: function() { handlers.openChatbot(state); },
            componentId: 'home-action-chatbot'
          },
            React.createElement(MaterialIcons, { name: 'smart-toy', size: 32, color: state.theme.colors.success }),
            React.createElement(Text, { style: [styles.actionLabel, { color: state.theme.colors.textPrimary }] }, 'AI Coach')
          )
        )
      ),

      renderMoodModal(state.showMoodModal, function() { state.setShowMoodModal(false); }, function(mood) { handlers.submitMoodCheckin(state, mood); }, state.theme),
      renderDailyChallengeModal(state.showDailyChallenge, function() { state.setShowDailyChallenge(false); }, state.theme)
    );
  };
// @end:HomeScreen

// @section:meditate-screen-state @depends:[theme,imports,data-functions]
  const useMeditateScreenState = function() {
    const themeContext = useTheme();
    const theme = themeContext.theme;
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedDuration, setSelectedDuration] = useState('All');
    const [showPlayer, setShowPlayer] = useState(false);
    const [currentSession, setCurrentSession] = useState(null);
    const [showChatbot, setShowChatbot] = useState(false);
    const [showSessionBuilder, setShowSessionBuilder] = useState(false);
    const [customDuration, setCustomDuration] = useState('15');
    const [customSessionType, setCustomSessionType] = useState('Mindfulness');
    
    const categories = ['All', 'Mindfulness', 'Focus', 'Sleep', 'Stress Relief', 'Relaxation', 'ADHD', 'Grief Support'];
    const durations = ['All', '5 min', '10 min', '15 min', '20 min', '30+ min'];
    const sessionTypes = ['Mindfulness', 'Focus', 'Sleep', 'Stress Relief', 'Relaxation', 'ADHD', 'Grief Support'];

    const allSessions = getMeditationSessions();
    const filteredSessions = allSessions.filter(function(session) {
      const categoryMatch = selectedCategory === 'All' || session.category === selectedCategory;
      const durationMatch = selectedDuration === 'All' || 
        (selectedDuration === '5 min' && session.duration <= 5) ||
        (selectedDuration === '10 min' && session.duration <= 10) ||
        (selectedDuration === '15 min' && session.duration <= 15) ||
        (selectedDuration === '20 min' && session.duration <= 20) ||
        (selectedDuration === '30+ min' && session.duration > 30);
      return categoryMatch && durationMatch;
    });

    return {
      theme: theme,
      sessions: filteredSessions,
      categories: categories,
      durations: durations,
      sessionTypes: sessionTypes,
      selectedCategory: selectedCategory,
      setSelectedCategory: setSelectedCategory,
      selectedDuration: selectedDuration,
      setSelectedDuration: setSelectedDuration,
      showPlayer: showPlayer,
      setShowPlayer: setShowPlayer,
      currentSession: currentSession,
      setCurrentSession: setCurrentSession,
      showChatbot: showChatbot,
      setShowChatbot: setShowChatbot,
      showSessionBuilder: showSessionBuilder,
      setShowSessionBuilder: setShowSessionBuilder,
      customDuration: customDuration,
      setCustomDuration: setCustomDuration,
      customSessionType: customSessionType,
      setCustomSessionType: setCustomSessionType
    };
  };
// @end:meditate-screen-state

// @section:meditate-screen-handlers @depends:[imports]
  const meditateScreenHandlers = {
    playSession: function(state, session) {
      state.setCurrentSession(session);
      state.setShowPlayer(true);
    },
    completeSession: function(state, session) {
      const { mutate: insertLog } = useMutation('session_logs', 'insert');
      const logData = {
        meditation_id: session.id,
        timestamp: new Date().toISOString(),
        session_type: 'meditation',
        duration: session.duration,
        mood_after: 'completed'
      };
      insertLog(logData)
        .then(function() {
          state.setShowPlayer(false);
          Platform.OS === 'web' ? window.alert('Session completed! Well done.') : Alert.alert('Completed!', 'Well done on completing your meditation.');
        })
        .catch(function(error) {
          Platform.OS === 'web' ? window.alert(error.message) : Alert.alert('Error', error.message);
        });
    },
    createCustomSession: function(state) {
      const { mutate: insertLog } = useMutation('session_logs', 'insert');
      const customSession = {
        id: 'custom-' + Date.now(),
        title: 'Custom ' + state.customSessionType + ' (' + state.customDuration + ' min)',
        description: 'Your personalized meditation session',
        duration: parseInt(state.customDuration),
        category: state.customSessionType,
        level: 'Intermediate',
        rating: 5,
        isCustom: true
      };
      
      const logData = {
        meditation_id: customSession.id,
        timestamp: new Date().toISOString(),
        session_type: 'meditation',
        duration: customSession.duration,
        mood_after: 'started'
      };
      
      insertLog(logData)
        .then(function() {
          state.setShowSessionBuilder(false);
          state.setCurrentSession(customSession);
          state.setShowPlayer(true);
          Platform.OS === 'web' ? window.alert('Custom session created!') : Alert.alert('Success', 'Custom session created!');
        })
        .catch(function(error) {
          Platform.OS === 'web' ? window.alert(error.message) : Alert.alert('Error', error.message);
        });
    },
    openAIChatbot: function(state) {
      state.setShowChatbot(true);
    }
  };

  const renderFilterChips = function(items, selected, onSelect, theme) {
    return React.createElement(ScrollView, {
      horizontal: true,
      showsHorizontalScrollIndicator: false,
      style: { flexGrow: 0 },
      contentContainerStyle: styles.chipContainer,
      componentId: 'meditate-filter-chips'
    },
      items.map(function(item, index) {
        const isSelected = item === selected;
        return React.createElement(TouchableOpacity, {
          key: index,
          style: [
            styles.chip,
            styles.glassmorphicCard,
            isSelected ? { backgroundColor: theme.colors.primary + 'E0' } : { backgroundColor: theme.colors.background + '80' }
          ],
          onPress: function() { onSelect(item); },
          componentId: 'meditate-chip-' + index
        },
          React.createElement(Text, {
            style: [
              styles.chipText,
              { color: isSelected ? '#FFFFFF' : theme.colors.textSecondary }
            ]
          }, item)
        );
      })
    );
  };

  const renderSessionCard = function(session, theme, onPlay) {
    return React.createElement(TouchableOpacity, {
      style: [styles.sessionCard, styles.glassmorphicCard, { backgroundColor: theme.colors.card + '90' }],
      onPress: onPlay,
      componentId: 'meditate-session-' + session.id
    },
      React.createElement(Image, {
        source: { uri: 'IMAGE:tranquil-forest-meditation-path' },
        style: styles.sessionImage,
        componentId: 'meditate-session-image'
      }),
      React.createElement(View, { style: styles.sessionInfo, componentId: 'meditate-session-info' },
        React.createElement(Text, { style: [styles.sessionTitle, { color: theme.colors.textPrimary }] }, session.title),
        React.createElement(Text, { style: [styles.sessionDescription, { color: theme.colors.textSecondary }] }, session.description || 'Guided meditation session'),
        React.createElement(View, { style: styles.sessionMeta, componentId: 'meditate-session-meta' },
          React.createElement(View, { style: styles.metaItem, componentId: 'meditate-duration-meta' },
            React.createElement(MaterialIcons, { name: 'access-time', size: 16, color: theme.colors.textSecondary }),
            React.createElement(Text, { style: [styles.metaText, { color: theme.colors.textSecondary }] }, session.duration + ' min')
          ),
          React.createElement(View, { style: styles.metaItem, componentId: 'meditate-level-meta' },
            React.createElement(MaterialIcons, { name: 'bar-chart', size: 16, color: theme.colors.textSecondary }),
            React.createElement(Text, { style: [styles.metaText, { color: theme.colors.textSecondary }] }, session.level || 'Beginner')
          )
        )
      ),
      React.createElement(View, { style: styles.playButton, componentId: 'meditate-play-button' },
        React.createElement(MaterialIcons, { name: 'play-arrow', size: 24, color: theme.colors.primary })
      )
    );
  };

  const renderSessionPlayer = function(visible, session, onClose, onComplete, theme) {
    if (!session) return null;

    return React.createElement(Modal, {
      visible: visible,
      animationType: 'slide',
      transparent: false,
      onRequestClose: onClose
    },
      React.createElement(View, { style: [styles.playerContainer, { backgroundColor: theme.colors.background }], componentId: 'meditate-player-container' },
        React.createElement(View, { style: styles.playerHeader, componentId: 'meditate-player-header' },
          React.createElement(TouchableOpacity, {
            style: styles.playerCloseButton,
            onPress: onClose,
            componentId: 'meditate-player-close'
          },
            React.createElement(MaterialIcons, { name: 'keyboard-arrow-down', size: 28, color: theme.colors.textPrimary })
          ),
          React.createElement(Text, { style: [styles.playerTitle, { color: theme.colors.textPrimary }] }, 'Now Playing')
        ),
        
        React.createElement(View, { style: styles.playerContent, componentId: 'meditate-player-content' },
          React.createElement(Image, {
            source: { uri: 'IMAGE:zen-meditation-stones-water' },
            style: styles.playerImage,
            componentId: 'meditate-player-image'
          }),
          React.createElement(Text, { style: [styles.playerSessionTitle, { color: theme.colors.textPrimary }] }, session.title),
          React.createElement(Text, { style: [styles.playerDuration, { color: theme.colors.textSecondary }] }, session.duration + ' minute session'),
          
          React.createElement(View, { style: styles.playerControls, componentId: 'meditate-player-controls' },
            React.createElement(TouchableOpacity, {
              style: [styles.controlButton, styles.glassmorphicCard, { backgroundColor: theme.colors.primary + 'E0' }],
              onPress: function() { onComplete(session); },
              componentId: 'meditate-complete-button'
            },
              React.createElement(MaterialIcons, { name: 'check', size: 24, color: '#FFFFFF' }),
              React.createElement(Text, { style: [styles.controlText, { color: '#FFFFFF' }] }, 'Complete Session')
            )
          )
        )
      )
    );
  };

  const renderSessionBuilder = function(visible, onClose, onCreate, state, theme) {
    return React.createElement(Modal, {
      visible: visible,
      animationType: 'slide',
      transparent: true,
      onRequestClose: onClose
    },
      React.createElement(View, { style: styles.modalOverlay, componentId: 'session-builder-overlay' },
        React.createElement(View, { style: [styles.glassmorphicCard, styles.modalContent, { backgroundColor: theme.colors.card + 'E8' }], componentId: 'session-builder-content' },
          React.createElement(View, { style: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }, componentId: 'builder-header' },
            React.createElement(Text, { style: [styles.modalTitle, { color: theme.colors.textPrimary }], componentId: 'builder-title' }, 'Build Custom Session'),
            React.createElement(TouchableOpacity, {
              style: styles.closeButton,
              onPress: onClose,
              componentId: 'builder-close'
            },
              React.createElement(MaterialIcons, { name: 'close', size: 24, color: theme.colors.textSecondary })
            )
          ),

          React.createElement(Text, { style: [styles.fieldLabel, { color: theme.colors.textPrimary, marginBottom: 8 }] }, 'Session Type'),
          React.createElement(ScrollView, { horizontal: true, showsHorizontalScrollIndicator: false, style: { marginBottom: 20 }, componentId: 'builder-types-scroll' },
            state.sessionTypes.map(function(type, index) {
              const isSelected = state.customSessionType === type;
              return React.createElement(TouchableOpacity, {
                key: index,
                style: [
                  styles.typeButton,
                  isSelected ? { backgroundColor: theme.colors.primary + 'E0' } : { backgroundColor: theme.colors.background + '80' }
                ],
                onPress: function() { state.setCustomSessionType(type); },
                componentId: 'builder-type-' + index
              },
                React.createElement(Text, {
                  style: [
                    styles.typeButtonText,
                    { color: isSelected ? '#FFFFFF' : theme.colors.textSecondary }
                  ]
                }, type)
              );
            })
          ),

          React.createElement(Text, { style: [styles.fieldLabel, { color: theme.colors.textPrimary, marginBottom: 8 }] }, 'Duration (minutes)'),
          React.createElement(TextInput, {
            style: [styles.durationInput, { borderColor: theme.colors.primary, color: theme.colors.textPrimary }],
            placeholder: '15',
            placeholderTextColor: theme.colors.textSecondary,
            value: state.customDuration,
            onChangeText: state.setCustomDuration,
            keyboardType: 'number-pad',
            componentId: 'builder-duration-input'
          }),

          React.createElement(TouchableOpacity, {
            style: [styles.createButton, { backgroundColor: theme.colors.success + 'E0', marginTop: 20 }],
            onPress: onCreate,
            componentId: 'builder-create-button'
          },
            React.createElement(MaterialIcons, { name: 'check-circle', size: 24, color: '#FFFFFF' }),
            React.createElement(Text, { style: [styles.createButtonText, { color: '#FFFFFF', marginLeft: 8 }] }, 'Create Session')
          )
        )
      )
    );
  };
// @end:meditate-screen-handlers

// @section:MeditateScreen @depends:[meditate-screen-state,meditate-screen-handlers]
  const MeditateScreen = function() {
    const state = useMeditateScreenState();
    const handlers = meditateScreenHandlers;

    return React.createElement(View, { style: [styles.container, { backgroundColor: state.theme.colors.background }], componentId: 'meditate-screen' },
      React.createElement(View, { style: styles.screenHeader, componentId: 'meditate-screen-header' },
        React.createElement(Text, { style: [styles.screenTitle, { color: state.theme.colors.textPrimary }], componentId: 'meditate-screen-title' }, 'Meditate'),
        React.createElement(Text, { style: [styles.screenSubtitle, { color: state.theme.colors.textSecondary }], componentId: 'meditate-screen-subtitle' }, 'Find your perfect meditation'),
        React.createElement(View, { style: styles.builderActionRow, componentId: 'builder-action-row' },
          React.createElement(TouchableOpacity, {
            style: [styles.actionButton, styles.glassmorphicCard, { backgroundColor: state.theme.colors.success + '20', flex: 1, marginRight: 8 }],
            onPress: function() { state.setShowSessionBuilder(true); },
            componentId: 'meditate-builder-button'
          },
            React.createElement(MaterialIcons, { name: 'add-circle', size: 20, color: state.theme.colors.success }),
            React.createElement(Text, { style: [styles.actionLabel, { color: state.theme.colors.textPrimary, marginTop: 4 }] }, 'Build Session')
          ),
          React.createElement(TouchableOpacity, {
            style: [styles.actionButton, styles.glassmorphicCard, { backgroundColor: state.theme.colors.success + '20', flex: 1 }],
            onPress: function() { handlers.openAIChatbot(state); },
            componentId: 'meditate-ai-coach'
          },
            React.createElement(MaterialIcons, { name: 'smart-toy', size: 20, color: state.theme.colors.success }),
            React.createElement(Text, { style: [styles.actionLabel, { color: state.theme.colors.textPrimary, marginTop: 4 }] }, 'Ask AI Coach')
          )
        )
      ),

      React.createElement(View, { style: styles.filtersSection, componentId: 'meditate-filters' },
        React.createElement(Text, { style: [styles.filterTitle, { color: state.theme.colors.textPrimary }], componentId: 'meditate-category-title' }, 'Category'),
        renderFilterChips(state.categories, state.selectedCategory, state.setSelectedCategory, state.theme),
        
        React.createElement(Text, { style: [styles.filterTitle, { color: state.theme.colors.textPrimary }], componentId: 'meditate-duration-title' }, 'Duration'),
        renderFilterChips(state.durations, state.selectedDuration, state.setSelectedDuration, state.theme)
      ),

      React.createElement(FlatList, {
        data: state.sessions,
        keyExtractor: function(item) { return item.id; },
        renderItem: function(itemData) {
          return renderSessionCard(itemData.item, state.theme, function() { handlers.playSession(state, itemData.item); });
        },
        contentContainerStyle: { paddingBottom: Platform.OS === 'web' ? 90 : 100, paddingHorizontal: 16 },
        showsVerticalScrollIndicator: false,
        componentId: 'meditate-session-list'
      }),

      renderSessionPlayer(state.showPlayer, state.currentSession, function() { state.setShowPlayer(false); }, handlers.completeSession.bind(null, state), state.theme),
      renderSessionBuilder(state.showSessionBuilder, function() { state.setShowSessionBuilder(false); }, function() { handlers.createCustomSession(state); }, state, state.theme)
    );
  };
// @end:MeditateScreen

// @section:breathe-screen-state @depends:[theme,imports,data-functions]
  const useBreatheScreenState = function() {
    const themeContext = useTheme();
    const theme = themeContext.theme;
    const [selectedExercise, setSelectedExercise] = useState(null);
    const [isActive, setIsActive] = useState(false);
    const [currentStep, setCurrentStep] = useState('inhale');
    const [timer, setTimer] = useState(0);
    const [breathCount, setBreatheCount] = useState(0);
    const [showChatbot, setShowChatbot] = useState(false);

    const exercises = getBreathingExercises();

    return {
      theme: theme,
      exercises: exercises,
      selectedExercise: selectedExercise,
      setSelectedExercise: setSelectedExercise,
      isActive: isActive,
      setIsActive: setIsActive,
      currentStep: currentStep,
      setCurrentStep: setCurrentStep,
      timer: timer,
      setTimer: setTimer,
      breathCount: breathCount,
      setBreatheCount: setBreatheCount,
      showChatbot: showChatbot,
      setShowChatbot: setShowChatbot
    };
  };
// @end:breathe-screen-state

// @section:breathe-screen-handlers @depends:[imports]
  const breatheScreenHandlers = {
    startExercise: function(state, exercise) {
      state.setSelectedExercise(exercise);
      state.setIsActive(true);
      state.setCurrentStep(exercise.steps[0]);
      state.setTimer(exercise.pattern[0]);
      state.setBreatheCount(0);
    },
    stopExercise: function(state) {
      state.setIsActive(false);
      state.setTimer(0);
    },
    completeBreathingSession: function(exercise, count) {
      const { mutate: insertLog } = useMutation('session_logs', 'insert');
      const logData = {
        timestamp: new Date().toISOString(),
        session_type: 'breathing',
        duration: Math.ceil(count * exercise.pattern.reduce(function(a, b) { return a + b; }, 0) / 60),
        mood_after: 'completed'
      };
      insertLog(logData)
        .then(function() {
          Platform.OS === 'web' ? window.alert('Breathing session completed!') : Alert.alert('Well Done!', 'Breathing session completed successfully.');
        })
        .catch(function(error) {
          Platform.OS === 'web' ? window.alert(error.message) : Alert.alert('Error', error.message);
        });
    },
    openAIChatbot: function(state) {
      state.setShowChatbot(true);
    }
  };

  const renderExerciseCard = function(exercise, theme, onStart) {
    return React.createElement(TouchableOpacity, {
      style: [styles.exerciseCard, styles.glassmorphicCard, { backgroundColor: theme.colors.card + '90' }],
      onPress: function() { onStart(exercise); },
      componentId: 'breathe-exercise-' + exercise.id
    },
      React.createElement(Image, {
        source: { uri: 'IMAGE:breathing-exercise-lotus-position' },
        style: styles.exerciseImage,
        componentId: 'breathe-exercise-image'
      }),
      React.createElement(View, { style: styles.exerciseContent, componentId: 'breathe-exercise-content' },
        React.createElement(Text, { style: [styles.exerciseName, { color: theme.colors.textPrimary }] }, exercise.name),
        React.createElement(Text, { style: [styles.exerciseDescription, { color: theme.colors.textSecondary }] }, exercise.description),
        React.createElement(View, { style: styles.exercisePattern, componentId: 'breathe-exercise-pattern' },
          React.createElement(Text, { style: [styles.patternText, { color: theme.colors.primary }] }, 
            'Pattern: ' + exercise.pattern.join('-'))
        ),
        React.createElement(Text, { style: [styles.benefitsText, { color: theme.colors.success }] }, 
          exercise.benefits)
      ),
      React.createElement(MaterialIcons, { name: 'play-circle-outline', size: 32, color: theme.colors.primary })
    );
  };

  const renderActiveSession = function(exercise, currentStep, timer, breathCount, onStop, theme) {
    return React.createElement(View, { style: [styles.activeSession, styles.glassmorphicCard, { backgroundColor: theme.colors.card + 'E0' }], componentId: 'breathe-active-session' },
      React.createElement(View, { style: styles.sessionHeader, componentId: 'breathe-session-header' },
        React.createElement(Text, { style: [styles.activeExerciseName, { color: theme.colors.textPrimary }] }, exercise.name),
        React.createElement(TouchableOpacity, {
          style: styles.stopButton,
          onPress: onStop,
          componentId: 'breathe-stop-button'
        },
          React.createElement(MaterialIcons, { name: 'stop', size: 24, color: theme.colors.error })
        )
      ),
      
      React.createElement(View, { style: styles.breatheCircle, componentId: 'breathe-circle' },
        React.createElement(View, { style: [styles.innerCircle, styles.glassmorphicCard, { backgroundColor: theme.colors.primary + '20' }], componentId: 'breathe-inner-circle' },
          React.createElement(Text, { style: [styles.stepText, { color: theme.colors.primary }] }, currentStep.toUpperCase()),
          React.createElement(Text, { style: [styles.timerText, { color: theme.colors.textPrimary }] }, timer.toString())
        )
      ),
      
      React.createElement(View, { style: styles.sessionStats, componentId: 'breathe-session-stats' },
        React.createElement(Text, { style: [styles.breathCountText, { color: theme.colors.textSecondary }] }, 'Breaths: ' + breathCount),
        React.createElement(TouchableOpacity, {
          style: [styles.completeButton, styles.glassmorphicCard, { backgroundColor: theme.colors.success + 'E0' }],
          onPress: function() { 
            onStop();
            breatheScreenHandlers.completeBreathingSession(exercise, breathCount);
          },
          componentId: 'breathe-complete-button'
        },
          React.createElement(Text, { style: [styles.completeButtonText, { color: '#FFFFFF' }] }, 'Complete Session')
        )
      )
    );
  };
// @end:breathe-screen-handlers

// @section:BreatheScreen @depends:[breathe-screen-state,breathe-screen-handlers]
  const BreatheScreen = function() {
    const state = useBreatheScreenState();
    const handlers = breatheScreenHandlers;

    useEffect(function() {
      let interval = null;
      if (state.isActive && state.selectedExercise) {
        interval = setInterval(function() {
          state.setTimer(function(prev) {
            if (prev <= 1) {
              const currentStepIndex = state.selectedExercise.steps.indexOf(state.currentStep);
              const nextStepIndex = (currentStepIndex + 1) % state.selectedExercise.steps.length;
              state.setCurrentStep(state.selectedExercise.steps[nextStepIndex]);
              if (nextStepIndex === 0) {
                state.setBreatheCount(function(count) { return count + 1; });
              }
              return state.selectedExercise.pattern[nextStepIndex];
            }
            return prev - 1;
          });
        }, 1000);
      }
      return function() {
        if (interval) clearInterval(interval);
      };
    }, [state.isActive, state.currentStep, state.selectedExercise]);

    if (state.isActive && state.selectedExercise) {
      return React.createElement(View, { style: [styles.container, { backgroundColor: state.theme.colors.background }], componentId: 'breathe-active-screen' },
        renderActiveSession(state.selectedExercise, state.currentStep, state.timer, state.breathCount, function() { handlers.stopExercise(state); }, state.theme)
      );
    }

    return React.createElement(ScrollView, {
      style: [styles.container, { backgroundColor: state.theme.colors.background }],
      contentContainerStyle: { paddingBottom: Platform.OS === 'web' ? 90 : 100 },
      componentId: 'breathe-screen-scroll'
    },
      React.createElement(View, { style: styles.screenHeader, componentId: 'breathe-screen-header' },
        React.createElement(Text, { style: [styles.screenTitle, { color: state.theme.colors.textPrimary }], componentId: 'breathe-screen-title' }, 'Breathe'),
        React.createElement(Text, { style: [styles.screenSubtitle, { color: state.theme.colors.textSecondary }], componentId: 'breathe-screen-subtitle' }, 'Guided breathing exercises for calm and focus'),
        React.createElement(Image, {
          source: { uri: 'IMAGE:peaceful-breathing-nature-zen' },
          style: styles.breatheHeaderImage,
          componentId: 'breathe-header-image'
        }),
        React.createElement(TouchableOpacity, {
          style: [styles.actionButton, styles.glassmorphicCard, { backgroundColor: state.theme.colors.success + '20', marginTop: 12 }],
          onPress: function() { handlers.openAIChatbot(state); },
          componentId: 'breathe-ai-coach'
        },
          React.createElement(MaterialIcons, { name: 'smart-toy', size: 20, color: state.theme.colors.success }),
          React.createElement(Text, { style: [styles.actionLabel, { color: state.theme.colors.textPrimary, marginTop: 4 }] }, 'Ask AI Coach')
        )
      ),

      React.createElement(View, { style: styles.exercisesGrid, componentId: 'breathe-exercises-grid' },
        state.exercises.map(function(exercise) {
          return renderExerciseCard(exercise, state.theme, function(ex) { handlers.startExercise(state, ex); });
        })
      )
    );
  };
// @end:BreatheScreen

// @section:achievements-screen-state @depends:[theme,imports,data-functions]
  const useAchievementsScreenState = function() {
    const themeContext = useTheme();
    const theme = themeContext.theme;
    const { data: sessionLogs } = useQuery('session_logs');
    const [points, setPoints] = useState(0);
    const [level, setLevel] = useState(1);
    const [unlockedAchievements, setUnlockedAchievements] = useState([]);

    const allAchievements = getAchievements();

    useEffect(function() {
      if (sessionLogs && sessionLogs.length > 0) {
        var totalMinutes = sessionLogs.reduce(function(sum, log) { return sum + (log.duration || 0); }, 0);
        var calculatedLevel = Math.floor(totalMinutes / 60) + 1;
        var calculatedPoints = totalMinutes * 10;
        setLevel(calculatedLevel);
        setPoints(calculatedPoints);

        var unlocked = [];
        if (sessionLogs.length > 0) unlocked.push('first-session');
        
        var today = new Date().toDateString();
        var todayCount = sessionLogs.filter(function(log) {
          return new Date(log.timestamp).toDateString() === today;
        }).length;
        if (todayCount >= 7) unlocked.push('perfect-week');
        
        if (totalMinutes >= 60) unlocked.push('hour');
        if (totalMinutes >= 300) unlocked.push('five-hours');
        
        var breathingSessions = sessionLogs.filter(function(log) { return log.session_type === 'breathing'; }).length;
        if (breathingSessions >= 20) unlocked.push('breathwork-master');

        setUnlockedAchievements(unlocked);
      }
    }, [sessionLogs]);

    return {
      theme: theme,
      allAchievements: allAchievements,
      unlockedAchievements: unlockedAchievements,
      points: points,
      level: level,
      sessionLogs: sessionLogs || []
    };
  };
// @end:achievements-screen-state

// @section:AchievementsScreen @depends:[achievements-screen-state]
  const AchievementsScreen = function() {
    const state = useAchievementsScreenState();

    return React.createElement(ScrollView, {
      style: [styles.container, { backgroundColor: state.theme.colors.background }],
      contentContainerStyle: { paddingBottom: Platform.OS === 'web' ? 90 : 100 },
      componentId: 'achievements-screen-scroll'
    },
      React.createElement(View, { style: styles.screenHeader, componentId: 'achievements-header' },
        React.createElement(Text, { style: [styles.screenTitle, { color: state.theme.colors.textPrimary }], componentId: 'achievements-title' }, 'Achievements'),
        React.createElement(Text, { style: [styles.screenSubtitle, { color: state.theme.colors.textSecondary }], componentId: 'achievements-subtitle' }, 'Unlock badges and rewards')
      ),

      React.createElement(View, { style: styles.profileStats, componentId: 'achievements-stats' },
        React.createElement(View, { style: [styles.glassmorphicCard, styles.statCard, { backgroundColor: state.theme.colors.card + '90' }], componentId: 'achievements-points-card' },
          React.createElement(MaterialIcons, { name: 'star', size: 28, color: state.theme.colors.primary }),
          React.createElement(Text, { style: [styles.statNumber, { color: state.theme.colors.textPrimary }] }, state.points.toString()),
          React.createElement(Text, { style: [styles.statLabel, { color: state.theme.colors.textSecondary }] }, 'Points')
        ),
        React.createElement(View, { style: [styles.glassmorphicCard, styles.statCard, { backgroundColor: state.theme.colors.card + '90' }], componentId: 'achievements-level-card' },
          React.createElement(MaterialIcons, { name: 'grade', size: 28, color: state.theme.colors.accent }),
          React.createElement(Text, { style: [styles.statNumber, { color: state.theme.colors.textPrimary }] }, state.level.toString()),
          React.createElement(Text, { style: [styles.statLabel, { color: state.theme.colors.textSecondary }] }, 'Level')
        ),
        React.createElement(View, { style: [styles.glassmorphicCard, styles.statCard, { backgroundColor: state.theme.colors.card + '90' }], componentId: 'achievements-unlocked-card' },
          React.createElement(MaterialIcons, { name: 'emoji-events', size: 28, color: state.theme.colors.success }),
          React.createElement(Text, { style: [styles.statNumber, { color: state.theme.colors.textPrimary }] }, state.unlockedAchievements.length.toString()),
          React.createElement(Text, { style: [styles.statLabel, { color: state.theme.colors.textSecondary }] }, 'Unlocked')
        )
      ),

      React.createElement(View, { style: styles.achievementsGrid, componentId: 'achievements-grid' },
        state.allAchievements.map(function(achievement, index) {
          const isUnlocked = state.unlockedAchievements.indexOf(achievement.id) > -1;
          return React.createElement(View, {
            key: index,
            style: [styles.achievementCard, styles.glassmorphicCard, { 
              backgroundColor: isUnlocked ? state.theme.colors.primary + '20' : state.theme.colors.card + '80',
              opacity: isUnlocked ? 1 : 0.5
            }],
            componentId: 'achievement-' + achievement.id
          },
            React.createElement(View, { style: { alignItems: 'center', marginBottom: 8 }, componentId: 'achievement-icon' },
              React.createElement(MaterialIcons, { 
                name: achievement.icon, 
                size: 32, 
                color: isUnlocked ? state.theme.colors.primary : state.theme.colors.textSecondary 
              })
            ),
            React.createElement(Text, { style: [styles.achievementTitle, { color: state.theme.colors.textPrimary }] }, achievement.name),
            React.createElement(Text, { style: [styles.achievementDescription, { color: state.theme.colors.textSecondary, fontSize: 11 }] }, achievement.description),
            React.createElement(View, { style: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 }, componentId: 'achievement-footer' },
              React.createElement(Text, { style: [styles.pointsBadge, { color: state.theme.colors.primary }] }, '+' + achievement.points),
              React.createElement(Text, { style: [styles.statusBadge, { color: isUnlocked ? state.theme.colors.success : state.theme.colors.textSecondary }] }, isUnlocked ? 'Unlocked' : 'Locked')
            )
          );
        })
      )
    );
  };
// @end:AchievementsScreen

// @section:library-screen-state @depends:[theme,imports,data-functions]
  const useLibraryScreenState = function() {
    const themeContext = useTheme();
    const theme = themeContext.theme;
    const [selectedTab, setSelectedTab] = useState('all');
    const [showChatbot, setShowChatbot] = useState(false);

    const allSessions = getMeditationSessions();
    const categories = {
      all: allSessions,
      mindfulness: allSessions.filter(function(s) { return s.category === 'Mindfulness'; }),
      sleep: allSessions.filter(function(s) { return s.category === 'Sleep'; }),
      focus: allSessions.filter(function(s) { return s.category === 'Focus'; }),
      stress: allSessions.filter(function(s) { return s.category === 'Stress Relief'; }),
      relaxation: allSessions.filter(function(s) { return s.category === 'Relaxation'; }),
      adhd: allSessions.filter(function(s) { return s.category === 'ADHD'; }),
      grief: allSessions.filter(function(s) { return s.category === 'Grief Support'; })
    };

    return {
      theme: theme,
      sessions: allSessions,
      categories: categories,
      selectedTab: selectedTab,
      setSelectedTab: setSelectedTab,
      showChatbot: showChatbot,
      setShowChatbot: setShowChatbot
    };
  };

  const renderCategoryTab = function(tabKey, label, isSelected, onPress, theme) {
    return React.createElement(TouchableOpacity, {
      style: [
        styles.categoryTab,
        styles.glassmorphicCard,
        isSelected ? { backgroundColor: theme.colors.primary + 'E0' } : { backgroundColor: 'transparent' }
      ],
      onPress: onPress,
      componentId: 'library-tab-' + tabKey
    },
      React.createElement(Text, {
        style: [
          styles.categoryTabText,
          { color: isSelected ? '#FFFFFF' : theme.colors.textSecondary }
        ]
      }, label)
    );
  };

  const renderSessionListItem = function(session, theme) {
    return React.createElement(View, {
      style: [styles.listSessionCard, styles.glassmorphicCard, { backgroundColor: theme.colors.card + '90' }],
      componentId: 'library-session-' + session.id
    },
      React.createElement(Image, {
        source: { uri: 'IMAGE:meditation-library-peaceful-scene' },
        style: styles.listSessionImage,
        componentId: 'library-session-image'
      }),
      React.createElement(View, { style: styles.listSessionInfo, componentId: 'library-session-info' },
        React.createElement(Text, { style: [styles.listSessionTitle, { color: theme.colors.textPrimary }] }, session.title),
        React.createElement(Text, { style: [styles.listSessionMeta, { color: theme.colors.textSecondary }] }, 
          session.category + ' • ' + session.duration + ' min')
      ),
      React.createElement(MaterialIcons, { name: 'play-arrow', size: 24, color: theme.colors.primary })
    );
  };
// @end:library-screen-state

// @section:LibraryScreen @depends:[library-screen-state]
  const LibraryScreen = function() {
    const state = useLibraryScreenState();

    const tabs = [
      { key: 'all', label: 'All' },
      { key: 'mindfulness', label: 'Mindfulness' },
      { key: 'sleep', label: 'Sleep' },
      { key: 'focus', label: 'Focus' },
      { key: 'stress', label: 'Stress' },
      { key: 'relaxation', label: 'Relaxation' },
      { key: 'adhd', label: 'ADHD' },
      { key: 'grief', label: 'Grief' }
    ];

    const openAIChatbot = function() {
      state.setShowChatbot(true);
    };

    return React.createElement(View, { style: [styles.container, { backgroundColor: state.theme.colors.background }], componentId: 'library-screen' },
      React.createElement(View, { style: styles.screenHeader, componentId: 'library-screen-header' },
        React.createElement(Text, { style: [styles.screenTitle, { color: state.theme.colors.textPrimary }], componentId: 'library-screen-title' }, 'Library'),
        React.createElement(Text, { style: [styles.screenSubtitle, { color: state.theme.colors.textSecondary }], componentId: 'library-screen-subtitle' }, 'Explore our complete collection'),
        React.createElement(TouchableOpacity, {
          style: [styles.actionButton, styles.glassmorphicCard, { backgroundColor: state.theme.colors.success + '20', marginTop: 12 }],
          onPress: openAIChatbot,
          componentId: 'library-ai-coach'
        },
          React.createElement(MaterialIcons, { name: 'smart-toy', size: 20, color: state.theme.colors.success }),
          React.createElement(Text, { style: [styles.actionLabel, { color: state.theme.colors.textPrimary, marginTop: 4 }] }, 'Ask AI Coach')
        )
      ),

      React.createElement(ScrollView, {
        horizontal: true,
        showsHorizontalScrollIndicator: false,
        style: { flexGrow: 0 },
        contentContainerStyle: styles.tabsContainer,
        componentId: 'library-tabs-scroll'
      },
        tabs.map(function(tab) {
          return renderCategoryTab(
            tab.key,
            tab.label,
            state.selectedTab === tab.key,
            function() { state.setSelectedTab(tab.key); },
            state.theme
          );
        })
      ),

      React.createElement(FlatList, {
        data: state.categories[state.selectedTab],
        keyExtractor: function(item) { return item.id; },
        renderItem: function(itemData) {
          return renderSessionListItem(itemData.item, state.theme);
        },
        contentContainerStyle: { paddingBottom: Platform.OS === 'web' ? 90 : 100, paddingHorizontal: 16 },
        showsVerticalScrollIndicator: false,
        componentId: 'library-sessions-list'
      })
    );
  };
// @end:LibraryScreen

// @section:profile-screen-state @depends:[theme,imports]
  const useProfileScreenState = function() {
    const themeContext = useTheme();
    const theme = themeContext.theme;
    const { data: profile, refetch } = useQuery('user_profiles');
    const { data: sessionLogs } = useQuery('session_logs');
    const [showEditModal, setShowEditModal] = useState(false);
    const [showChatbot, setShowChatbot] = useState(false);
    const [narrationVoice, setNarrationVoice] = useState('alto-female');
    const [showPrivacyVault, setShowPrivacyVault] = useState(false);
    const [editedProfile, setEditedProfile] = useState({
      age_group: 'Adult',
      goals: 'Reduce Stress',
      experience_level: 'Beginner'
    });

    const currentProfile = profile && profile.length > 0 ? profile[0] : null;
    const totalSessions = sessionLogs ? sessionLogs.length : 0;
    const totalMinutes = sessionLogs ? sessionLogs.reduce(function(sum, log) { return sum + (log.duration || 0); }, 0) : 0;
    const totalBreaths = sessionLogs ? sessionLogs.filter(function(log) { return log.session_type === 'breathing'; }).length : 0;

    useEffect(function() {
      if (currentProfile) {
        setEditedProfile({
          age_group: currentProfile.age_group || 'Adult',
          goals: currentProfile.goals || 'Reduce Stress',
          experience_level: currentProfile.experience_level || 'Beginner'
        });
      }
    }, [currentProfile]);

    return {
      theme: theme,
      currentProfile: currentProfile,
      totalSessions: totalSessions,
      totalMinutes: totalMinutes,
      totalBreaths: totalBreaths,
      showEditModal: showEditModal,
      setShowEditModal: setShowEditModal,
      editedProfile: editedProfile,
      setEditedProfile: setEditedProfile,
      refetch: refetch,
      showChatbot: showChatbot,
      setShowChatbot: setShowChatbot,
      narrationVoice: narrationVoice,
      setNarrationVoice: setNarrationVoice,
      showPrivacyVault: showPrivacyVault,
      setShowPrivacyVault: setShowPrivacyVault,
      themeContext: themeContext
    };
  };
// @end:profile-screen-state

// @section:profile-screen-handlers @depends:[imports]
  const profileScreenHandlers = {
    saveProfile: function(state) {
      const { mutate: insertProfile } = useMutation('user_profiles', 'insert');
      const { mutate: updateProfile } = useMutation('user_profiles', 'update');
      
      const profileData = {
        age_group: state.editedProfile.age_group,
        goals: state.editedProfile.goals,
        experience_level: state.editedProfile.experience_level,
        updated_at: new Date().toISOString()
      };

      const operation = state.currentProfile ? 
        function() { return updateProfile({ id: state.currentProfile.id, data: profileData }); } :
        function() { return insertProfile(Object.assign({ created_at: new Date().toISOString() }, profileData)); };

      operation()
        .then(function() {
          state.setShowEditModal(false);
          state.refetch();
          Platform.OS === 'web' ? window.alert('Profile updated successfully!') : Alert.alert('Success', 'Profile updated successfully!');
        })
        .catch(function(error) {
          Platform.OS === 'web' ? window.alert(error.message) : Alert.alert('Error', error.message);
        });
    },
    openAIChatbot: function(state) {
      state.setShowChatbot(true);
    }
  };

  const renderEditModal = function(visible, profile, onClose, onSave, onChange, theme) {
    const ageGroups = ['Child (5-12)', 'Teen (13-19)', 'Adult (20-65)', 'Senior (65+)'];
    const goals = ['Reduce Stress', 'Improve Focus', 'Better Sleep', 'Stop Overthinking', 'Build Concentration', 'Release Tension', 'Daily Calm'];
    const levels = ['Beginner', 'Intermediate', 'Advanced'];

    return React.createElement(Modal, {
      visible: visible,
      animationType: 'slide',
      transparent: true,
      onRequestClose: onClose
    },
      React.createElement(KeyboardAvoidingView, {
        style: styles.modalOverlay,
        behavior: Platform.OS === 'ios' ? 'padding' : (Platform.OS === 'web' ? undefined : 'height'),
        componentId: 'profile-edit-modal-container'
      },
        React.createElement(View, { style: [styles.editModalContent, styles.glassmorphicCard, { backgroundColor: theme.colors.card + 'E8' }], componentId: 'profile-edit-modal-content' },
          React.createElement(View, { style: styles.editModalHeader, componentId: 'profile-edit-modal-header' },
            React.createElement(Text, { style: [styles.editModalTitle, { color: theme.colors.textPrimary }] }, 'Edit Profile'),
            React.createElement(TouchableOpacity, {
              style: styles.editModalClose,
              onPress: onClose,
              componentId: 'profile-edit-close'
            },
              React.createElement(MaterialIcons, { name: 'close', size: 24, color: theme.colors.textSecondary })
            )
          ),

          React.createElement(ScrollView, {
            style: styles.editModalForm,
            contentContainerStyle: { paddingBottom: 20 },
            componentId: 'profile-edit-form-scroll'
          },
            React.createElement(Text, { style: [styles.fieldLabel, { color: theme.colors.textPrimary }] }, 'Age Group'),
            React.createElement(View, { style: styles.optionGrid, componentId: 'profile-age-options' },
              ageGroups.map(function(group, index) {
                const isSelected = profile.age_group === group;
                return React.createElement(TouchableOpacity, {
                  key: index,
                  style: [
                    styles.optionButton,
                    styles.glassmorphicCard,
                    isSelected ? { backgroundColor: theme.colors.primary + 'E0' } : { backgroundColor: theme.colors.background + '80' }
                  ],
                  onPress: function() { onChange(Object.assign({}, profile, { age_group: group })); },
                  componentId: 'profile-age-option-' + index
                },
                  React.createElement(Text, {
                    style: [
                      styles.optionText,
                      { color: isSelected ? '#FFFFFF' : theme.colors.textSecondary }
                    ]
                  }, group)
                );
              })
            ),

            React.createElement(Text, { style: [styles.fieldLabel, { color: theme.colors.textPrimary }] }, 'Primary Goal'),
            React.createElement(View, { style: styles.optionGrid, componentId: 'profile-goals-options' },
              goals.map(function(goal, index) {
                const isSelected = profile.goals === goal;
                return React.createElement(TouchableOpacity, {
                  key: index,
                  style: [
                    styles.optionButton,
                    styles.glassmorphicCard,
                    isSelected ? { backgroundColor: theme.colors.primary + 'E0' } : { backgroundColor: theme.colors.background + '80' }
                  ],
                  onPress: function() { onChange(Object.assign({}, profile, { goals: goal })); },
                  componentId: 'profile-goal-option-' + index
                },
                  React.createElement(Text, {
                    style: [
                      styles.optionText,
                      { color: isSelected ? '#FFFFFF' : theme.colors.textSecondary }
                    ]
                  }, goal)
                );
              })
            ),

            React.createElement(Text, { style: [styles.fieldLabel, { color: theme.colors.textPrimary }] }, 'Experience Level'),
            React.createElement(View, { style: styles.optionGrid, componentId: 'profile-level-options' },
              levels.map(function(level, index) {
                const isSelected = profile.experience_level === level;
                return React.createElement(TouchableOpacity, {
                  key: index,
                  style: [
                    styles.optionButton,
                    styles.glassmorphicCard,
                    isSelected ? { backgroundColor: theme.colors.primary + 'E0' } : { backgroundColor: theme.colors.background + '80' }
                  ],
                  onPress: function() { onChange(Object.assign({}, profile, { experience_level: level })); },
                  componentId: 'profile-level-option-' + index
                },
                  React.createElement(Text, {
                    style: [
                      styles.optionText,
                      { color: isSelected ? '#FFFFFF' : theme.colors.textSecondary }
                    ]
                  }, level)
                );
              })
            )
          ),

          React.createElement(TouchableOpacity, {
            style: [styles.saveButton, styles.glassmorphicCard, { backgroundColor: theme.colors.primary + 'E0' }],
            onPress: onSave,
            componentId: 'profile-save-button'
          },
            React.createElement(Text, { style: [styles.saveButtonText, { color: '#FFFFFF' }] }, 'Save Changes')
          )
        )
      )
    );
  };
// @end:profile-screen-handlers

// @section:ProfileScreen @depends:[profile-screen-state,profile-screen-handlers]
  const ProfileScreen = function() {
    const state = useProfileScreenState();
    const handlers = profileScreenHandlers;

    const voices = [
      { label: 'Alto Female', value: 'alto-female' },
      { label: 'Soprano Female', value: 'soprano-female' },
      { label: 'Tenor Male', value: 'tenor-male' },
      { label: 'Bass Male', value: 'bass-male' }
    ];

    return React.createElement(ScrollView, {
      style: [styles.container, { backgroundColor: state.theme.colors.background }],
      contentContainerStyle: { paddingBottom: Platform.OS === 'web' ? 90 : 100 },
      componentId: 'profile-screen-scroll'
    },
      React.createElement(View, { style: styles.profileHeader, componentId: 'profile-header' },
        React.createElement(Image, {
          source: { uri: 'IMAGE:serene-profile-meditation-avatar' },
          style: styles.profileAvatar,
          componentId: 'profile-avatar'
        }),
        React.createElement(Text, { style: [styles.profileName, { color: state.theme.colors.textPrimary }], componentId: 'profile-name' }, 'SerenitySphere'),
        React.createElement(Text, { style: [styles.profileSubtitle, { color: state.theme.colors.textSecondary }], componentId: 'profile-subtitle' }, 'Your wellness journey starts here'),
        React.createElement(TouchableOpacity, {
          style: [styles.actionButton, styles.glassmorphicCard, { backgroundColor: state.theme.colors.success + '20', marginTop: 16 }],
          onPress: function() { handlers.openAIChatbot(state); },
          componentId: 'profile-ai-coach'
        },
          React.createElement(MaterialIcons, { name: 'smart-toy', size: 20, color: state.theme.colors.success }),
          React.createElement(Text, { style: [styles.actionLabel, { color: state.theme.colors.textPrimary, marginTop: 4 }] }, 'Ask AI Coach')
        )
      ),

      React.createElement(View, { style: styles.profileStats, componentId: 'profile-stats' },
        React.createElement(View, { style: [styles.glassmorphicCard, styles.statCard, { backgroundColor: state.theme.colors.card + '90' }], componentId: 'profile-sessions-stat' },
          React.createElement(Text, { style: [styles.statNumber, { color: state.theme.colors.textPrimary }] }, state.totalSessions.toString()),
          React.createElement(Text, { style: [styles.statLabel, { color: state.theme.colors.textSecondary }] }, 'Sessions')
        ),
        React.createElement(View, { style: [styles.glassmorphicCard, styles.statCard, { backgroundColor: state.theme.colors.card + '90' }], componentId: 'profile-minutes-stat' },
          React.createElement(Text, { style: [styles.statNumber, { color: state.theme.colors.textPrimary }] }, state.totalMinutes.toString()),
          React.createElement(Text, { style: [styles.statLabel, { color: state.theme.colors.textSecondary }] }, 'Minutes')
        ),
        React.createElement(View, { style: [styles.glassmorphicCard, styles.statCard, { backgroundColor: state.theme.colors.card + '90' }], componentId: 'profile-breaths-stat' },
          React.createElement(Text, { style: [styles.statNumber, { color: state.theme.colors.textPrimary }] }, state.totalBreaths.toString()),
          React.createElement(Text, { style: [styles.statLabel, { color: state.theme.colors.textSecondary }] }, 'Breaths')
        )
      ),

      React.createElement(View, { style: [styles.glassmorphicCard, styles.profileCard, { backgroundColor: state.theme.colors.card + '90' }], componentId: 'profile-preferences-card' },
        React.createElement(View, { style: styles.cardHeader, componentId: 'profile-preferences-header' },
          React.createElement(Text, { style: [styles.cardTitle, { color: state.theme.colors.textPrimary }] }, 'Preferences'),
          React.createElement(TouchableOpacity, {
            style: styles.editButton,
            onPress: function() { state.setShowEditModal(true); },
            componentId: 'profile-edit-button'
          },
            React.createElement(MaterialIcons, { name: 'edit', size: 20, color: state.theme.colors.primary })
          )
        ),
        React.createElement(View, { style: styles.preferenceItem, componentId: 'profile-age-preference' },
          React.createElement(Text, { style: [styles.preferenceLabel, { color: theme.colors.textSecondary }] }, 'Age Group'),
          React.createElement(Text, { style: [styles.preferenceValue, { color: theme.colors.textPrimary }] }, 
            state.currentProfile ? state.currentProfile.age_group : 'Not set')
        ),
        React.createElement(View, { style: styles.preferenceItem, componentId: 'profile-goal-preference' },
          React.createElement(Text, { style: [styles.preferenceLabel, { color: theme.colors.textSecondary }] }, 'Primary Goal'),
          React.createElement(Text, { style: [styles.preferenceValue, { color: theme.colors.textPrimary }] }, 
            state.currentProfile ? state.currentProfile.goals : 'Not set')
        ),
        React.createElement(View, { style: styles.preferenceItem, componentId: 'profile-level-preference' },
          React.createElement(Text, { style: [styles.preferenceLabel, { color: theme.colors.textSecondary }] }, 'Experience Level'),
          React.createElement(Text, { style: [styles.preferenceValue, { color: theme.colors.textPrimary }] }, 
            state.currentProfile ? state.currentProfile.experience_level : 'Not set')
        )
      ),

      React.createElement(View, { style: [styles.glassmorphicCard, styles.profileCard, { backgroundColor: state.theme.colors.card + '90' }], componentId: 'profile-voice-card' },
        React.createElement(Text, { style: [styles.cardTitle, { color: state.theme.colors.textPrimary }] }, 'AI Voice Narrator'),
        React.createElement(View, { style: styles.voiceGrid, componentId: 'profile-voice-grid' },
          voices.map(function(voice, index) {
            const isSelected = state.narrationVoice === voice.value;
            return React.createElement(TouchableOpacity, {
              key: index,
              style: [
                styles.voiceButton,
                isSelected ? { backgroundColor: state.theme.colors.primary + 'E0' } : { backgroundColor: state.theme.colors.background + '80' }
              ],
              onPress: function() { state.setNarrationVoice(voice.value); },
              componentId: 'profile-voice-' + index
            },
              React.createElement(Text, {
                style: [
                  styles.voiceLabel,
                  { color: isSelected ? '#FFFFFF' : state.theme.colors.textSecondary }
                ]
              }, voice.label)
            );
          })
        )
      ),

      React.createElement(View, { style: [styles.glassmorphicCard, styles.profileCard, { backgroundColor: state.theme.colors.card + '90' }], componentId: 'profile-settings-card' },
        React.createElement(Text, { style: [styles.cardTitle, { color: state.theme.colors.textPrimary }] }, 'Settings'),
        React.createElement(TouchableOpacity, {
          style: styles.settingItem,
          onPress: state.themeContext ? state.themeContext.toggleDarkMode : function() {},
          componentId: 'profile-theme-toggle'
        },
          React.createElement(MaterialIcons, { name: 'dark-mode', size: 24, color: state.theme.colors.textSecondary }),
          React.createElement(Text, { style: [styles.settingLabel, { color: state.theme.colors.textPrimary }] }, 'Dark Mode'),
          React.createElement(MaterialIcons, { name: 'chevron-right', size: 24, color: state.theme.colors.textSecondary })
        ),
        React.createElement(TouchableOpacity, {
          style: styles.settingItem,
          onPress: function() { state.setShowPrivacyVault(true); },
          componentId: 'profile-privacy-vault'
        },
          React.createElement(MaterialIcons, { name: 'lock', size: 24, color: state.theme.colors.textSecondary }),
          React.createElement(Text, { style: [styles.settingLabel, { color: state.theme.colors.textPrimary }] }, 'Privacy Vault'),
          React.createElement(MaterialIcons, { name: 'chevron-right', size: 24, color: state.theme.colors.textSecondary })
        )
      ),

      renderEditModal(
        state.showEditModal,
        state.editedProfile,
        function() { state.setShowEditModal(false); },
        function() { handlers.saveProfile(state); },
        state.setEditedProfile,
        state.theme
      )
    );
  };
// @end:ProfileScreen

// @section:styles @depends:[theme]
  const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    glassmorphicCard: {
      borderWidth: 1,
      borderColor: '#FFFFFF40',
      backdropFilter: 'blur(10px)'
    },
    onboardingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    onboardingContent: {
      width: '100%',
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center'
    },
    onboardingBackground: {
      position: 'absolute',
      width: '100%',
      height: '100%'
    },
    onboardingTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 24,
      textAlign: 'center'
    },
    optionsContainer: {
      width: '100%'
    },
    optionButtonOnboarding: {
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderRadius: 12,
      marginBottom: 12,
      borderWidth: 2
    },
    optionTextOnboarding: {
      fontSize: 16,
      fontWeight: '500',
      textAlign: 'center'
    },
    moodsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      flexWrap: 'wrap'
    },
    moodButtonOnboarding: {
      alignItems: 'center',
      margin: 12
    },
    moodEmojiOnboarding: {
      fontSize: 40,
      marginBottom: 8
    },
    moodLabelOnboarding: {
      fontSize: 14,
      fontWeight: '500'
    },
    nextButton: {
      marginTop: 20,
      paddingVertical: 14,
      paddingHorizontal: 32,
      borderRadius: 12
    },
    nextButtonText: {
      fontSize: 16,
      fontWeight: '600'
    },
    header: {
      padding: 20,
      alignItems: 'center'
    },
    greeting: {
      fontSize: 28,
      fontWeight: 'bold',
      marginBottom: 4
    },
    subtitle: {
      fontSize: 16,
      marginBottom: 20
    },
    headerImage: {
      width: '100%',
      height: 180,
      borderRadius: 16,
      marginBottom: 20
    },
    gamificationBanner: {
      flexDirection: 'row',
      paddingHorizontal: 20,
      marginBottom: 16
    },
    pointsLabel: {
      fontSize: 12,
      fontWeight: '600'
    },
    pointsValue: {
      fontSize: 18,
      fontWeight: 'bold'
    },
    levelLabel: {
      fontSize: 12,
      fontWeight: '600'
    },
    levelValue: {
      fontSize: 18,
      fontWeight: 'bold'
    },
    dailyChallengeButton: {
      flexDirection: 'row',
      alignItems: 'center',
      marginHorizontal: 20,
      paddingHorizontal: 16,
      paddingVertical: 16,
      borderRadius: 16,
      marginBottom: 20
    },
    dailyChallengeTitle: {
      fontSize: 16,
      fontWeight: 'bold'
    },
    dailyChallengeText: {
      fontSize: 13,
      marginTop: 4
    },
    ambientSection: {
      paddingHorizontal: 20,
      marginBottom: 24
    },
    ambientGrid: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 12
    },
    ambientButton: {
      flex: 1,
      paddingVertical: 16,
      paddingHorizontal: 12,
      borderRadius: 12,
      alignItems: 'center',
      marginHorizontal: 4
    },
    ambientLabel: {
      fontSize: 12,
      fontWeight: '600',
      marginTop: 8
    },
    statsContainer: {
      flexDirection: 'row',
      paddingHorizontal: 20,
      marginBottom: 24
    },
    statCard: {
      flex: 1,
      padding: 16,
      borderRadius: 16,
      alignItems: 'center',
      marginHorizontal: 4,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4
    },
    moodCard: {
      flexDirection: 'row',
      justifyContent: 'center'
    },
    statNumber: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 4
    },
    statLabel: {
      fontSize: 14,
      marginLeft: 8
    },
    section: {
      paddingHorizontal: 20,
      marginBottom: 24
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 16
    },
    quickSessionCard: {
      flexDirection: 'row',
      borderRadius: 16,
      marginBottom: 12,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
      overflow: 'hidden'
    },
    quickSessionImage: {
      width: 80,
      height: 80
    },
    quickSessionContent: {
      flex: 1,
      padding: 12
    },
    quickSessionTitle: {
      fontSize: 16,
      fontWeight: '600',
      marginBottom: 4
    },
    quickSessionDuration: {
      fontSize: 14,
      marginBottom: 8
    },
    quickSessionTags: {
      flexDirection: 'row'
    },
    tag: {
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 12
    },
    tagText: {
      fontSize: 12,
      fontWeight: '500'
    },
    quickActions: {
      paddingHorizontal: 20
    },
    actionGrid: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      flexWrap: 'wrap'
    },
    actionButton: {
      flex: 1,
      alignItems: 'center',
      padding: 20,
      borderRadius: 16,
      marginHorizontal: 4,
      marginBottom: 8,
      minWidth: '30%'
    },
    actionLabel: {
      fontSize: 14,
      fontWeight: '600',
      marginTop: 8
    },
    builderActionRow: {
      flexDirection: 'row',
      marginTop: 12
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center'
    },
    modalContent: {
      width: '80%',
      borderRadius: 20,
      padding: 24,
      alignItems: 'center'
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 20
    },
    moodGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center'
    },
    moodButton: {
      alignItems: 'center',
      margin: 8
    },
    moodEmoji: {
      fontSize: 32,
      marginBottom: 4
    },
    moodLabel: {
      fontSize: 12
    },
    closeButton: {
      position: 'absolute',
      top: 16,
      right: 16
    },
    challengeCard: {
      borderRadius: 12,
      padding: 12
    },
    challengeTitle: {
      fontSize: 14,
      fontWeight: '600',
      marginBottom: 2
    },
    challengeDescription: {
      fontSize: 12
    },
    rewardPoints: {
      fontSize: 12,
      fontWeight: 'bold'
    },
    screenHeader: {
      padding: 20,
      paddingBottom: 8
    },
    screenTitle: {
      fontSize: 28,
      fontWeight: 'bold',
      marginBottom: 4
    },
    screenSubtitle: {
      fontSize: 16
    },
    filtersSection: {
      paddingHorizontal: 20,
      marginBottom: 16
    },
    filterTitle: {
      fontSize: 16,
      fontWeight: '600',
      marginBottom: 8,
      marginTop: 16
    },
    chipContainer: {
      paddingRight: 20
    },
    chip: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 16,
      marginRight: 8
    },
    chipText: {
      fontSize: 14,
      fontWeight: '500'
    },
    sessionCard: {
      flexDirection: 'row',
      borderRadius: 16,
      marginBottom: 16,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
      overflow: 'hidden'
    },
    sessionImage: {
      width: 100,
      height: 100
    },
    sessionInfo: {
      flex: 1,
      padding: 16
    },
    sessionTitle: {
      fontSize: 16,
      fontWeight: '600',
      marginBottom: 4
    },
    sessionDescription: {
      fontSize: 14,
      marginBottom: 8,
      lineHeight: 20
    },
    sessionMeta: {
      flexDirection: 'row'
    },
    metaItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 16
    },
    metaText: {
      fontSize: 12,
      marginLeft: 4
    },
    playButton: {
      justifyContent: 'center',
      paddingRight: 16
    },
    playerContainer: {
      flex: 1
    },
    playerHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 20,
      paddingTop: Platform.OS === 'ios' ? 60 : 40
    },
    playerCloseButton: {
      padding: 8
    },
    playerTitle: {
      fontSize: 18,
      fontWeight: '600'
    },
    playerContent: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 40
    },
    playerImage: {
      width: 200,
      height: 200,
      borderRadius: 20,
      marginBottom: 24
    },
    playerSessionTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 8,
      textAlign: 'center'
    },
    playerDuration: {
      fontSize: 16,
      marginBottom: 40
    },
    playerControls: {
      alignItems: 'center'
    },
    controlButton: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 24,
      paddingVertical: 12,
      borderRadius: 16
    },
    controlText: {
      fontSize: 16,
      fontWeight: '600',
      marginLeft: 8
    },
    durationInput: {
      borderWidth: 1,
      borderRadius: 8,
      paddingHorizontal: 12,
      paddingVertical: 10,
      fontSize: 16,
      marginBottom: 16
    },
    typeButton: {
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 8,
      marginRight: 8,
      marginBottom: 8
    },
    typeButtonText: {
      fontSize: 13,
      fontWeight: '500'
    },
    createButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderRadius: 12
    },
    createButtonText: {
      fontSize: 16,
      fontWeight: '600'
    },
    fieldLabel: {
      fontSize: 16,
      fontWeight: '600',
      marginBottom: 8
    },
    exerciseCard: {
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: 16,
      marginBottom: 16,
      padding: 16,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4
    },
    exerciseImage: {
      width: 60,
      height: 60,
      borderRadius: 12,
      marginRight: 16
    },
    exerciseContent: {
      flex: 1
    },
    exerciseName: {
      fontSize: 16,
      fontWeight: '600',
      marginBottom: 4
    },
    exerciseDescription: {
      fontSize: 14,
      marginBottom: 4
    },
    exercisePattern: {
      marginTop: 4
    },
    patternText: {
      fontSize: 12,
      fontWeight: '500'
    },
    benefitsText: {
      fontSize: 11,
      fontWeight: '500',
      marginTop: 4
    },
    breatheHeaderImage: {
      width: '100%',
      height: 160,
      borderRadius: 16,
      marginTop: 16
    },
    exercisesGrid: {
      padding: 20
    },
    activeSession: {
      flex: 1,
      padding: 20,
      borderRadius: 20,
      margin: 20,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.15,
      shadowRadius: 16,
      elevation: 8
    },
    sessionHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 40
    },
    activeExerciseName: {
      fontSize: 18,
      fontWeight: 'bold'
    },
    stopButton: {
      padding: 8
    },
    breatheCircle: {
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 40
    },
    innerCircle: {
      width: 200,
      height: 200,
      borderRadius: 100,
      alignItems: 'center',
      justifyContent: 'center'
    },
    stepText: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 8
    },
    timerText: {
      fontSize: 32,
      fontWeight: 'bold'
    },
    sessionStats: {
      alignItems: 'center'
    },
    breathCountText: {
      fontSize: 16,
      marginBottom: 20
    },
    completeButton: {
      paddingHorizontal: 24,
      paddingVertical: 12,
      borderRadius: 16
    },
    completeButtonText: {
      fontSize: 16,
      fontWeight: '600'
    },
    tabsContainer: {
      paddingHorizontal: 20,
      paddingVertical: 8
    },
    categoryTab: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 16,
      marginRight: 8
    },
    categoryTabText: {
      fontSize: 14,
      fontWeight: '500'
    },
    listSessionCard: {
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: 12,
      marginBottom: 12,
      padding: 12,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2
    },
    listSessionImage: {
      width: 50,
      height: 50,
      borderRadius: 8,
      marginRight: 12
    },
    listSessionInfo: {
      flex: 1
    },
    listSessionTitle: {
      fontSize: 14,
      fontWeight: '600',
      marginBottom: 2
    },
    listSessionMeta: {
      fontSize: 12
    },
    achievementsGrid: {
      paddingHorizontal: 20,
      paddingTop: 16
    },
    achievementCard: {
      borderRadius: 12,
      padding: 16,
      marginBottom: 16,
      alignItems: 'center'
    },
    achievementTitle: {
      fontSize: 16,
      fontWeight: '600',
      textAlign: 'center'
    },
    achievementDescription: {
      fontSize: 12,
      textAlign: 'center',
      marginTop: 4
    },
    pointsBadge: {
      fontSize: 12,
      fontWeight: 'bold'
    },
    statusBadge: {
      fontSize: 11,
      fontWeight: '600'
    },
    profileHeader: {
      alignItems: 'center',
      padding: 20,
      paddingBottom: 16
    },
    profileAvatar: {
      width: 80,
      height: 80,
      borderRadius: 40,
      marginBottom: 12
    },
    profileName: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 4
    },
    profileSubtitle: {
      fontSize: 14
    },
    profileStats: {
      flexDirection: 'row',
      paddingHorizontal: 20,
      marginBottom: 20
    },
    profileCard: {
      marginHorizontal: 20,
      marginBottom: 16,
      borderRadius: 16,
      padding: 16,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4
    },
    cardHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 16
    },
    cardTitle: {
      fontSize: 18,
      fontWeight: 'bold'
    },
    editButton: {
      padding: 4
    },
    preferenceItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 8
    },
    preferenceLabel: {
      fontSize: 14
    },
    preferenceValue: {
      fontSize: 14,
      fontWeight: '500'
    },
    voiceGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginTop: 12
    },
    voiceButton: {
      flex: 1,
      paddingVertical: 12,
      paddingHorizontal: 8,
      borderRadius: 12,
      marginRight: 8,
      marginBottom: 8,
      minWidth: '40%'
    },
    voiceLabel: {
      fontSize: 13,
      fontWeight: '500',
      textAlign: 'center'
    },
    settingItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 12
    },
    settingLabel: {
      flex: 1,
      fontSize: 16,
      marginLeft: 12
    },
    editModalContent: {
      width: '90%',
      maxHeight: '80%',
      borderRadius: 20,
      padding: 0
    },
    editModalHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 20,
      paddingBottom: 16
    },
    editModalTitle: {
      fontSize: 18,
      fontWeight: 'bold'
    },
    editModalClose: {
      padding: 4
    },
    editModalForm: {
      paddingHorizontal: 20
    },
    optionGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginBottom: 8
    },
    optionButton: {
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 12,
      marginRight: 8,
      marginBottom: 8
    },
    optionText: {
      fontSize: 14,
      fontWeight: '500'
    },
    saveButton: {
      margin: 20,
      paddingVertical: 14,
      borderRadius: 16,
      alignItems: 'center'
    },
    saveButtonText: {
      fontSize: 16,
      fontWeight: '600'
    },
    chatbotHeader: {
      paddingTop: Platform.OS === 'ios' ? 60 : 40,
      paddingHorizontal: 16,
      paddingBottom: 16,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    chatbotTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      flex: 1
    },
    chatbotClose: {
      padding: 8
    },
    messageBubble: {
      marginVertical: 8,
      flexDirection: 'row'
    },
    message: {
      maxWidth: '80%',
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderRadius: 16
    },
    messageText: {
      fontSize: 14,
      lineHeight: 20
    },
    chatbotInputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 16,
      borderTopWidth: 1
    },
    chatbotInput: {
      flex: 1,
      borderRadius: 12,
      paddingHorizontal: 16,
      paddingVertical: 12,
      marginRight: 8,
      borderWidth: 1,
      fontSize: 14
    },
    chatbotSend: {
      width: 44,
      height: 44,
      borderRadius: 12,
      justifyContent: 'center',
      alignItems: 'center'
    },
    moodMatrixContainer: {
      padding: 16,
      borderRadius: 12,
      marginHorizontal: 20,
      marginBottom: 20
    },
    moodMatrixTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign: 'center'
    },
    moodMatrixAxis: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 16
    },
    axisLabel: {
      fontSize: 12,
      fontWeight: '500',
      width: 50
    },
    moodValue: {
      fontSize: 14,
      fontWeight: '600',
      marginTop: 8,
      textAlign: 'center'
    },
    moodMatrixSubmit: {
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderRadius: 12,
      alignItems: 'center',
      marginTop: 16
    },
    moodMatrixSubmitText: {
      fontSize: 16,
      fontWeight: '600'
    },
    progressContainer: {
      padding: 16,
      marginHorizontal: 20,
      marginBottom: 20,
      borderRadius: 12
    },
    progressHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 16
    },
    progressLabel: {
      fontSize: 16,
      fontWeight: '600',
      marginLeft: 12
    },
    milestoneSection: {
      marginTop: 12
    },
    milestoneLabel: {
      fontSize: 12,
      marginBottom: 8
    },
    progressBar: {
      height: 8,
      borderRadius: 4,
      overflow: 'hidden',
      marginBottom: 8
    },
    progressFill: {
      height: '100%'
    },
    progressPercent: {
      fontSize: 12,
      fontWeight: 'bold',
      textAlign: 'right'
    }
  });
// @end:styles

// @section:TabNavigator @depends:[HomeScreen,MeditateScreen,BreatheScreen,LibraryScreen,AchievementsScreen,ProfileScreen,theme]
  const TabNavigator = function(props) {
    const themeContext = useTheme();
    const theme = themeContext.theme;
    const showChatbot = props.showChatbot || false;
    const setShowChatbot = props.setShowChatbot || function() {};

    return React.createElement(View, { style: { flex: 1, width: '100%', height: '100%', overflow: 'hidden' }, componentId: 'tab-navigator-container' },
      React.createElement(Tab.Navigator, {
        screenOptions: function(route) {
          return {
            headerShown: false,
            tabBarStyle: {
              position: 'absolute',
              bottom: 0,
              backgroundColor: theme.colors.card + 'E0',
              borderTopWidth: 1,
              borderTopColor: theme.colors.border,
              height: Platform.OS === 'web' ? 80 : 90,
              paddingBottom: Platform.OS === 'web' ? 10 : 20,
              paddingTop: 10,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: -4 },
              shadowOpacity: 0.1,
              shadowRadius: 8,
              elevation: 8
            },
            tabBarActiveTintColor: theme.colors.primary,
            tabBarInactiveTintColor: theme.colors.textSecondary,
            tabBarLabelStyle: {
              fontSize: 12,
              fontWeight: '500'
            },
            tabBarIcon: function(iconProps) {
              let iconName = 'home';
              const routeName = route.route.name;
              
              if (routeName === 'Home') {
                iconName = 'home';
              } else if (routeName === 'Meditate') {
                iconName = 'spa';
              } else if (routeName === 'Breathe') {
                iconName = 'air';
              } else if (routeName === 'Library') {
                iconName = 'library-books';
              } else if (routeName === 'Achievements') {
                iconName = 'emoji-events';
              } else if (routeName === 'Profile') {
                iconName = 'person';
              }

              return React.createElement(MaterialIcons, {
                name: iconName,
                size: iconProps.size,
                color: iconProps.color
              });
            }
          };
        }
      },
        React.createElement(Tab.Screen, { name: 'Home', component: HomeScreen }),
        React.createElement(Tab.Screen, { name: 'Meditate', component: MeditateScreen }),
        React.createElement(Tab.Screen, { name: 'Breathe', component: BreatheScreen }),
        React.createElement(Tab.Screen, { name: 'Library', component: LibraryScreen }),
        React.createElement(Tab.Screen, { name: 'Achievements', component: AchievementsScreen }),
        React.createElement(Tab.Screen, { name: 'Profile', component: ProfileScreen })
      )
    );
  };
// @end:TabNavigator

// @section:return @depends:[TabNavigator,theme,ZenFlowOnboarding,app-provider-state,chatbot-modal]
  const AppContainer = function() {
    const appProvider = useAppProviderState();
    const themeContext = useTheme();
    const [showChatbot, setShowChatbot] = useState(false);

    if (!appProvider.isHydrated) {
      return React.createElement(View, { style: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: themeContext.theme.colors.background }, componentId: 'app-loading' },
        React.createElement(ActivityIndicator, { size: 'large', color: themeContext.theme.colors.primary })
      );
    }

    if (!appProvider.onboardingCompleted) {
      return React.createElement(ZenFlowOnboarding, { appProvider: appProvider, componentId: 'onboarding-flow' });
    }

    return React.createElement(View, { style: { flex: 1, width: '100%', height: '100%' }, componentId: 'app-root' },
      React.createElement(StatusBar, { barStyle: 'dark-content' }),
      React.createElement(TabNavigator, { showChatbot: showChatbot, setShowChatbot: setShowChatbot, componentId: 'tab-navigator' }),
      React.createElement(ChatbotModal, { 
        visible: showChatbot, 
        onClose: function() { setShowChatbot(false); },
        theme: themeContext.theme,
        componentId: 'chatbot-modal-container'
      })
    );
  };

  return React.createElement(QueryClientProvider, { client: queryClient }, React.createElement(ThemeProvider, null, React.createElement(AppContainer)));
// @end:return
};
export default ComponentFunction;
