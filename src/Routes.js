import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import React, { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, Button, Text } from 'react-native';
import { Center } from './Center';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from './AuthProvider';

const Stack = createStackNavigator();

// Screens
function Login({ navigation }) {
  const { login } = useContext(AuthContext);

  return (
    <Center>
      <Text>I am a login screen</Text>
      <Button
        title="log me in"
        onPress={() => {
          login();
        }}
      />
      <Button
        title="Go to register"
        onPress={() => {
          navigation.navigate('Register');
        }}
      />
    </Center>
  );
}

function Register({ navigation, route }) {
  return (
    <Center>
      <Text>Route Name: {route.name}</Text>
      <Text>I am a register screen</Text>
      <Button
        title="go to login"
        onPress={() => {
          navigation.navigate('Login');
          // navigation.goBack();
        }}
      />
    </Center>
  );
}

export const Routes = () => {
  const { user, login } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // check if the user is logged in or not
    AsyncStorage.getItem('user')
      .then(userString => {
        if (userString) {
          // decode it
          login();
        } else {
          setLoading(false);
        }
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  });

  if (loading) {
    return (
      <Center>
        <ActivityIndicator size="large" color="black" />
      </Center>
    );
  }

  return (
    <NavigationContainer>
      {user ? (
        <Center>
          <Text>you exist</Text>
        </Center>
      ) : (
        <Stack.Navigator
          // for all the screens
          // screenOptions={{
          //   header: () => null,
          // }}
          initialRouteName="Login">
          <Stack.Screen
            name="Login"
            options={{
              headerTitle: 'Sign In',
            }}
            component={Login}
          />
          <Stack.Screen
            name="Register"
            options={{
              // for individual screens
              headerTitle: 'Sign Up',
            }}
            component={Register}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};
