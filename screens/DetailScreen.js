import React, { useState, useContext, useEffect } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FavoriteOrchidsContext } from './FavoriteOrchidsContext';
const DetailScreen = ({ route, maxLines = 3 }) => {
  const [showFullContent, setShowFullContent] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const { orchid } = route.params;
  const [isFavorite, setIsFavorite] = useState(false);
  const [animation] = useState(new Animated.Value(1));
  const { favoriteOrchids, setFavoriteOrchids } = useContext(
    FavoriteOrchidsContext
  );

  const navigation = useNavigation();

  const handleToggleFavorite = () => {
    const updatedIsFavorite = !isFavorite;
    setIsFavorite(updatedIsFavorite);
    Animated.sequence([
      Animated.timing(animation, {
        toValue: 1.2,
        duration: 100,
        useNativeDriver: false,
      }),
      Animated.timing(animation, {
        toValue: 1,
        duration: 100,
        useNativeDriver: false,
      }),
    ]).start();

    if (updatedIsFavorite) {
      setFavoriteOrchids([...favoriteOrchids, orchid]);
    } else {
      const updatedFavorites = favoriteOrchids.filter(
        (item) => item.id !== orchid.id
      );
      setFavoriteOrchids(updatedFavorites);
    }
  };

  const heartScale = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.5],
  });

  useEffect(() => {
    const isCurrentlyFavorite = favoriteOrchids.some(
      (item) => item.id === orchid.id
    );
    setIsFavorite(isCurrentlyFavorite);
  }, []);

  const toggleContent = () => {
    setShowFullContent(!showFullContent);
  };

  const handleHeartPress = () => {
    handleToggleFavorite();
  };

  const handleContainerPress = () => {
    if (!isFavorite) {
      handleToggleFavorite();
    }
  };

  const handleIncreaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleBuy = () => {
    // TODO: Handle buy logic
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {orchid && (
          <View style={styles.contentContainer}>
            <View style={styles.headerContainer}>
              <View style={styles.titleContainer}>
                <Text style={styles.headerTitle}>
                  {orchid.name.toUpperCase()}
                </Text>
                <TouchableOpacity onPress={handleToggleFavorite}>
                  <Animated.View
                    style={[{ transform: [{ scale: heartScale }] }]}>
                    <Text style={styles.heart}>{isFavorite ? '❤️' : '♡'}</Text>
                  </Animated.View>
                </TouchableOpacity>
              </View>
            </View>
            <Image source={orchid.image} style={styles.image} />
            <View style={styles.priceContainer}>
              <Text style={styles.priceText}>
                {orchid.price.toLocaleString()} &#8363;
              </Text>
            </View>
            <View style={styles.priceContainer}>
              <Text style={styles.priceText}>
                Catgeory:
                {orchid.category}
              </Text>
            </View>
            <Text
              numberOfLines={showFullContent ? undefined : maxLines}
              ellipsizeMode="tail"
              style={styles.description}>
              {orchid.desc}
            </Text>
            {!showFullContent && (
              <TouchableOpacity onPress={toggleContent}>
                <Text style={styles.viewMore}>Xem thêm +</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </ScrollView>
      <View style={styles.buttonContainer}>
        <View style={styles.buyContainer}>
          <Button 
            title="Mua"
            onPress={handleBuy}
            color="green" // Màu sắc của nút Buy
          />
        </View>
        <View style={styles.quantityContainer}>
          <TouchableOpacity onPress={handleDecreaseQuantity}>
            <Text style={styles.quantityButton}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityText}>{quantity}</Text>
          <TouchableOpacity onPress={handleIncreaseQuantity}>
            <Text style={styles.quantityButton}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1.4,
    // backgroundColor: '#f0f8ff', // Màu nền tổng thể
    padding: 18,
  },
  contentContainer: {
    backgroundColor: '#ffffff', // Màu nền phần nội dung
    borderRadius: 20,
    padding: 10,
  },
  image: {
    width: 360,
    height: 360,
    resizeMode: 'cover',
    borderRadius: 10,
    marginBottom: 10,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  backButton: {
    fontSize: 18,
    color: 'blue',
    marginRight: 10,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 4, // Khoảng cách trái của heartContainer và headerTitle
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'blue', // Màu cho title
    marginRight: 160,
  },
  heartContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heart: {
    fontSize: 24,
    color: 'red',
  },
  priceContainer: {
    marginLeft: 8,
  },
  priceText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'green', // Màu cho giá
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    overflow: 'hidden',
    padding: 10,
  },
  viewMore: {
    color: 'red',
    marginTop: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    borderRadius: 6,
    backgroundColor: '#f0f8ff',
  },
  buyContainer: {
    flex: 1,
    marginRight: 8,
    backgroundColor: '#f0f8ff', // Màu nền của nút Buy
    borderRadius: 5,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  quantityButton: {
    fontSize: 30,
    paddingHorizontal: 8,
    color: 'black',
  },
  quantityText: {
    fontSize: 20,
    paddingHorizontal: 10,
  },
});

export default DetailScreen;
