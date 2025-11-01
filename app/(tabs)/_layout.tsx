import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';

const TabsLayout = () => {
    return (
        <Tabs
            screenOptions={{ 
                tabBarActiveTintColor: '#373f0dff',
                tabBarInactiveTintColor: '#384305ff',
                tabBarStyle: { 
                    backgroundColor: '#f2f3e8ff',
                    borderTopWidth: .5,
                    borderTopColor: '#5d6f03ff',
                    height: 90,
                    paddingBottom: 30,
                    paddingTop: 10
                },
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: '700',
                },
                headerShown: false
             }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Todos',
                    tabBarIcon: ({ color, size, focused }) => (
                        <Ionicons name={focused ? "flash" : "flash-outline"} color={color} size={size} />
                    )
                }}
            />
            <Tabs.Screen
                name="settings"
                options={{
                    title: 'Settings',
                    tabBarIcon: ({ color, size, focused }) => (
                        <Ionicons name={focused ? "settings" : "settings-outline"} color={color} size={size} />
                    )
                }}
            />
        </Tabs>
    );
};

export default TabsLayout;