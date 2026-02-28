// src/components/ErrorBoundary.tsx
import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <View className="flex-1 items-center justify-center px-6">
          <Text className="mb-2 text-2xl font-bold text-gray-800">Oops!</Text>
          <Text className="mb-6 text-center text-gray-500">
            Something went wrong. Please try again.
          </Text>
          <TouchableOpacity
            className="rounded-xl bg-indigo-500 px-6 py-3"
            onPress={this.handleReset}>
            <Text className="font-semibold text-white">Retry</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return this.props.children;
  }
}
