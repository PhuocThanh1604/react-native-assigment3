import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const Card = ({ orchid }) => {
  return (
    <View style={styles.container}>
      <Image source={orchid.image} style={styles.orchidImage} />
      <View style={styles.contentContainer}>
        <Text style={styles.orchidName}>{orchid.name}</Text>
        <Text style={styles.orchidPrice}>Giá: <Text>{orchid.price}</Text></Text>
        {/* <Text style={styles.orchidDate}>Ngày: <Text>{orchid.date}</Text></Text> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    paddingHorizontal: 5,
  },
  orchidImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  contentContainer: {
    padding: 10,
  },
  orchidName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  orchidPrice: {
    fontSize: 14,
    marginBottom: 5,
  },
  orchidDate: {
    fontSize: 14,
    marginBottom: 5,
  },
});

export default Card;
