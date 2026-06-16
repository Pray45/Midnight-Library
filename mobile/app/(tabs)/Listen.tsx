import { View, Text, Image, ScrollView, Pressable } from 'react-native';
import React, { useState } from 'react';
import Vertical from 'components/Vertical';
import books from '../../data.json';

export default function Listen() {
  return (
    <ScrollView>
      <Vertical data={books} scale={1} />
    </ScrollView>
  );
}
