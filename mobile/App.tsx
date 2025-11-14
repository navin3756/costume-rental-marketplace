import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import Constants from 'expo-constants';

const queryClient = new QueryClient();
const apiUrl = Constants.expoConfig?.extra?.apiUrl ?? 'http://localhost:4000/api';

const fetchHealth = async () => {
  const response = await fetch(`${apiUrl}/health`);
  return response.json();
};

const HealthCheck = () => {
  const { data, isLoading } = useQuery({ queryKey: ['health'], queryFn: fetchHealth });
  if (isLoading) {
    return <Text style={styles.muted}>Checking API...</Text>;
  }
  return <Text style={styles.muted}>API status: {data?.status ?? 'unknown'}</Text>;
};

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.content}>
          <Text style={styles.heading}>Costume Marketplace</Text>
          <Text style={styles.subheading}>Browse, book, and manage rentals on the go.</Text>
          <View style={styles.card}>
            <Text style={styles.cardHeading}>Next actions</Text>
            <Text>• Complete Firebase Auth hooks</Text>
            <Text>• Connect Stripe for in-app deposits</Text>
            <Text>• Sync offline bookings with React Query persistence</Text>
          </View>
          <HealthCheck />
        </ScrollView>
        <StatusBar style="auto" />
      </SafeAreaView>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc'
  },
  content: {
    padding: 24,
    gap: 16
  },
  heading: {
    fontSize: 28,
    fontWeight: '700'
  },
  subheading: {
    fontSize: 16,
    color: '#475569'
  },
  card: {
    padding: 16,
    borderRadius: 16,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 2
  },
  cardHeading: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8
  },
  muted: {
    color: '#475569'
  }
});
