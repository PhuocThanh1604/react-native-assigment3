import React, { useState, useEffect, useContext } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, Animated, SafeAreaView } from 'react-native';
import { FavoriteOrchidsContext } from './FavoriteOrchidsContext';
import { useNavigation } from '@react-navigation/native';

const FavoritesScreen = () => {
  const [animation] = useState(new Animated.Value(0));
  const { favoriteOrchids, setFavoriteOrchids } = useContext(FavoriteOrchidsContext);
  const navigation = useNavigation();

  const handleItemPress = (item) => {
    Animated.sequence([
      Animated.timing(animation, {
        toValue: 1.2,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(animation, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Xử lý logic khi người dùng nhấn vào item
      navigation.navigate('Detail', { orchid: item });
    });
  };

  const renderOrchidItem = ({ item, index }) => {
    const translateX = animation.interpolate({
      inputRange: [0, 1],
      outputRange: [500, 0],
    });

    const animatedStyle = {
      transform: [{ translateX: translateX }],
    };

    return (
      <TouchableOpacity style={styles.orchidItemContainer} onPress={() => handleItemPress(item)}>
        <Animated.View style={[styles.orchidItem, animatedStyle]}>
          <Image source={item.image} style={styles.orchidImage} />
          <Text style={styles.orchidName}>{item.name}</Text>
        </Animated.View>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    // Thực hiện animation khi component được render
    Animated.timing(animation, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Danh sách cây lan ưa thích</Text>
      </View>
      <FlatList
        data={favoriteOrchids}
        renderItem={renderOrchidItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f8ff',
    // paddingHorizontal: 12,
    // borderColor: 'red',
    overflow: 'visible',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  listContainer: {
    paddingBottom: 20,
    padding:10
  },
  orchidItemContainer: {
    marginBottom: 20,
  },
  orchidItem: {
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#f8f8f8',
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 140,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    marginBottom: 10,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: '#9acd32',
  },
  headerText: {
    marginTop:10,
    fontSize: 20,
    fontWeight: 'bold',
  },
  orchidImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 10,
    marginBottom: 10,
  },
  orchidName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  orchidItemContainer: {
    marginBottom: 10,
  },
});

export default FavoritesScreen;
