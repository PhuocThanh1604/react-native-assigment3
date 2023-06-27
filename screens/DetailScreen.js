import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button, Card, Title, Paragraph } from 'react-native-paper';
import { FavoriteOrchidsContext } from './FavoriteOrchidsContext';
import { FontAwesome } from '@expo/vector-icons';
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
          <Card style={styles.contentContainer}>
            <Card.Content>
              <View style={styles.headerContainer}>
                <Title style={styles.headerTitle}>
                  {orchid.name.toUpperCase()}
                </Title>
                <Animated.View
                  style={[{ transform: [{ scale: heartScale }] }]}>
                  <FontAwesome
                    style={styles.heart}
                    onPress={handleToggleFavorite}
                    name={isFavorite ? 'heart' : 'heart-o'}

                  >
                  </FontAwesome>
                </Animated.View>
              </View>
              <Card.Cover source={orchid.image} style={styles.image} />
              <Paragraph style={styles.priceText}>
              Giá: {orchid.price.toLocaleString()} &#8363;
              </Paragraph>
              <Paragraph style={styles.categoryText}>
                Loại:
                {orchid.category} ;
              </Paragraph>
              <Paragraph
                numberOfLines={showFullContent ? undefined : maxLines}
                ellipsizeMode="tail"
                style={styles.description}
              >
                {orchid.desc}
              </Paragraph>
              {!showFullContent && (
                <Text style={styles.viewMore} onPress={toggleContent}>
                  Xem thêm +
                </Text>
              )}
            </Card.Content>
          </Card>
        )}
      </ScrollView>
      <View style={styles.buttonContainer}>
        <View style={styles.buyContainer}>
          <Button
            mode="contained"
            onPress={handleBuy}
            color="green"
            labelStyle={{ color: '#ffffff' }}
          >
            Mua
          </Button>
        </View>
        <View style={styles.quantityContainer}>
          <Text
            style={styles.quantityButton}
            onPress={handleDecreaseQuantity}
          >
            -
          </Text>
          <Text style={styles.quantityText}>{quantity}</Text>
          <Text
            style={styles.quantityButton}
            onPress={handleIncreaseQuantity}
          >
            +
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f0f8ff',
    elevation: 6, // Hiệu ứng shadow cho Android
    shadowColor: '#a52a2a', // Màu shadow
    shadowOffset: { width: 2, height: 4 }, // Độ dịch chuyển shadow
    shadowOpacity: 0.5, // Độ mờ shadow
    shadowRadius: 100, // Độ cong mép của shadow
  },
  contentContainer: {
    borderRadius: 20,
    padding: 10,
    backgroundColor: 'white',
  },
  image: {
    width: 360,
    height: 360,
    resizeMode: 'cover',
    borderRadius: 10,
    marginBottom: 10,
    elevation: 6, // Hiệu ứng shadow cho Android
    shadowColor: '#a52a2a', // Màu shadow
    shadowOffset: { width: 2, height: 4 }, // Độ dịch chuyển shadow
    shadowOpacity: 0.5, // Độ mờ shadow
    shadowRadius: 100, // Độ cong mép của shadow
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
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'blue',
    marginRight: 160,
  },
  heart: {
    fontSize: 24,
    color: 'red',
  },
  priceText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'green',
    marginLeft: 8,
  },
  categoryText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'green',
    marginLeft: 8,
    marginTop: 8,
    
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    overflow: 'hidden',
    padding: 10,
  },
  viewMore: {
    fontSize: 16,
    color: 'red',
    marginTop: 2,
    marginLeft: 8,
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
    backgroundColor: '#f0f8ff',
    borderRadius: 5,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 20,
    paddingHorizontal: 10,
    backgroundColor: 'white',
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
