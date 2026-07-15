import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={26} style={{ marginBottom: -3 }} {...props} />;
}
import { OrderProvider } from '../../context/OrderContext';

export default function TabLayout() {
  return (
    <OrderProvider>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: '#E63946',
          tabBarInactiveTintColor: '#999',
          headerShown: false,
          tabBarStyle: {
            backgroundColor: '#fff',
            borderTopColor: '#F0F0F0',
            elevation: 8,
          },
        }}
      >
        <Tabs.Screen
          name="katalog"
          options={{
            title: 'Katalog',
            tabBarIcon: ({ color }) => <TabBarIcon name="cutlery" color={color} />,
          }}
        />
        <Tabs.Screen
          name="order_detail"
          options={{
            title: 'Pesanan',
            tabBarIcon: ({ color }) => <TabBarIcon name="list-alt" color={color} />,
          }}
        />
        <Tabs.Screen
          name="camera"
          options={{
            title: 'Kamera',
            href: null,
            tabBarIcon: ({ color }) => <TabBarIcon name="camera" color={color} />,
          }}
        />
        <Tabs.Screen
          name="maps"
          options={{
            title: 'Maps',
            tabBarIcon: ({ color }) => <TabBarIcon name="map-marker" color={color} />,
          }}
        />
        <Tabs.Screen
          name="index"
          options={{
            href: null, 
          }}
        />
        <Tabs.Screen
          name="two"
          options={{
            href: null, 
          }}
        />
      </Tabs>
    </OrderProvider>
  );
}
