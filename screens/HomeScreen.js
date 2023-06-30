import React, { useContext, useState, useEffect } from 'react';
import {
  View,
  Text,
  Button,
  FlatList,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Keyboard,
  SafeAreaView,
  KeyboardAvoidingView,
  Animated,
} from 'react-native';
import { FavoriteOrchidsContext } from './FavoriteOrchidsContext';
import * as Animatable from 'react-native-animatable';
// import Icon from 'react-native-vector-icons/Feather';
import unorm from 'unorm';
import Icon from 'react-native-vector-icons/FontAwesome';
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({ navigation }) => {
  const categories = [
    { id: 1, name: 'Tất cả', icon: 'list' },
    { id: 2, name: 'Địa lan', icon: 'sun' },
    { id: 3, name: 'Bán địa lan', icon: 'cloud' },
    { id: 4, name: 'Phong lan', icon: 'umbrella' },
  ];
  const initialOrchids = [
    {
      id: 1,
      name: 'Hoa địa Lan',
      price: '10000',
      date: '17/08/2020',
      image: require('../images/orchid1.jpg'),
      category: 'Địa lan',
      quantity: 50,
      desc: 'Loại cây này thường được trồng ở trong chậu hoặc thường sống trong đất, thuộc loại cây thân thảo, phù hợp với môi trường sống ở ngoài trời hoặc ở trong bóng râm. Trong quá trình chăm sóc, loại cây này thường có nguy cơ bị héo và hay gặp phải các loại mầm bệnh gây hư hỏng cây, bị úng nước hoặc gãy hoa khi gặp phải thời tiết khắc nghiệt như mưa gió quá lớn nhưng không có biện pháp khắc phục tốt.',
    },
    {
      id: 2,
      name: 'Lan Hoàng Thảo',
      price: '40000',
      date: '17/08/2020',
      category: 'Phong lan',
      image: require('../images/orchid2.jpg'),
      quantity: 0,
      desc: 'Sở dĩ loại Lan này được gọi như vậy là do ngoại hình của chúng có các thua xòe ra ở bộ lưỡi và cánh hoa. Đây là loài Lan có màu sắc rực rỡ và nổi bật. Nếu chăm sóc tốt Lan Hoàng Thảo có thể được bán với giá cao. Loại Lan này phát triển với tốc độ nhanh, dễ trồng chỉ cần cung cấp cho nó đầy đủ các chất dinh dưỡng cần thiết.',
    },
    {
      id: 3,
      name: 'Lan Hồ Điệp',
      price: '3000',
      date: '17/08/2020',
      image: require('../images/orchid3.jpg'),
      category: 'Địa lan',
      quantity: 0,
      desc: 'Lan Hồ Điệp với những cánh hoa có hình dạng như những con bướm đang bay lượn. Loại Lan này có có tên khoa học là Phalaenopsis.',
    },
    {
      id: 4,
      name: 'Hoa Địa Lan Vàng ',
      price: '12000',
      date: '17/08/2020',
      image: require('../images/orchid4.jpg'),
      category: 'Địa lan',
      quantity: 8,
      desc: 'Loại cây này thường được trồng ở trong chậu hoặc thường sống trong đất, thuộc loại cây thân thảo, phù hợp với môi trường sống ở ngoài trời hoặc ở trong bóng râm. Trong quá trình chăm sóc, loại cây này thường có nguy cơ bị héo và hay gặp phải các loại mầm bệnh gây hư hỏng cây, bị úng nước hoặc gãy hoa khi gặp phải thời tiết khắc nghiệt như mưa gió quá lớn nhưng không có biện pháp khắc phục tốt.',
    },
    {
      id: 5,
      name: 'Lan Vanda',
      price: '9000',
      date: '17/08/2020',
      category: 'Bán địa lan',
      quantity: 9,
      image: require('../images/orchid9.jpg'),
      desc: 'Sở dĩ loại Lan này được gọi như vậy là do ngoại hình của chúng có các thua xòe ra ở bộ lưỡi và cánh hoa. Đây là loài Lan có màu sắc rực rỡ và nổi bật. Nếu chăm sóc tốt Lan Hoàng Thảo có thể được bán với giá cao. Loại Lan này phát triển với tốc độ nhanh, dễ trồng chỉ cần cung cấp cho nó đầy đủ các chất dinh dưỡng cần thiết.',
    },
    {
      id: 6,
      name: 'Lan Hỏa Hoàng Cam',
      price: '180000',
      date: '17/6/2023',
      quantity: 14,
      image: require('../images/orchid10.jpg'),
      category: 'Phong lan',
      desc: 'Lan Hồ Điệp với những cánh hoa có hình dạng như những con bướm đang bay lượn. Loại Lan này có có tên khoa học là Phalaenopsis.',
    },
    {
      id: 7,
      name: 'Lan Kiều Dẹt',
      price: '120000',
      date: '12/01/2023',
      category: 'Địa lan',
      quantity: 100,
      image: require('../images/orchid8.jpg'),
      desc: 'Loại cây này thường được trồng ở trong chậu hoặc thường sống trong đất, thuộc loại cây thân thảo, phù hợp với môi trường sống ở ngoài trời hoặc ở trong bóng râm. Trong quá trình chăm sóc, loại cây này thường có nguy cơ bị héo và hay gặp phải các loại mầm bệnh gây hư hỏng cây, bị úng nước hoặc gãy hoa khi gặp phải thời tiết khắc nghiệt như mưa gió quá lớn nhưng không có biện pháp khắc phục tốt.',
    },
    {
      id: 8,
      name: 'Lan Tam Bảo Sắc',
      price: '79000',
      date: '17/08/2020',
      quantity: 18,
      category: 'Phong lan',
      image: require('../images/orchid7.jpg'),
      desc: 'Sở dĩ loại Lan này được gọi như vậy là do ngoại hình của chúng có các thua xòe ra ở bộ lưỡi và cánh hoa. Đây là loài Lan có màu sắc rực rỡ và nổi bật. Nếu chăm sóc tốt Lan Hoàng Thảo có thể được bán với giá cao. Loại Lan này phát triển với tốc độ nhanh, dễ trồng chỉ cần cung cấp cho nó đầy đủ các chất dinh dưỡng cần thiết.',
    },
    {
      id: 9,
      name: 'Hoa Lan Cẩm Cù',
      price: '50000',
      date: '7/3/2023',
      quantity: 13,
      category: 'Địa lan',
      image: require('../images/orchid6.jpg'),
      desc: 'Lan Hồ Điệp với những cánh hoa có hình dạng như những con bướm đang bay lượn. Loại Lan này có có tên khoa học là Phalaenopsis.',
    },
    {
      id: 10,
      name: 'Cây Chu Đinh Lan',
      price: '30000',
      date: '17/08/2020',
      category: 'Phong lan',
      quantity: 19,
      image: require('../images/orchid5.jpg'),
      desc: 'Lan Hồ Điệp với những cánh hoa có hình dạng như những con bướm đang bay lượn. Loại Lan này có có tên khoa học là Phalaenopsis.',
    },
    // Thêm các cây lan Bán địa lanc vào đây
  ];
  const [orchids, setOrchids] = useState(initialOrchids);
  const [isFavorite, setIsFavorite] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [selectedOrchidId, setSelectedOrchidId] = useState(null);
  const animation = useState(new Animated.Value(1))[0];
  // Initialize the animation value
  const { favoriteOrchids, setFavoriteOrchids } = useContext(FavoriteOrchidsContext);
  const [reloadData, setReloadData] = useState(false);
  const [favoriteOrchidsHome, setFavoriteOrchidsHome] = useState([]);

  const heartScale = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.5],
  });
  const [categoryButtonText, setCategoryButtonText] = useState('Tất cả');
  const handleSelectCategory = (category) => {
    setSelectedCategory(category.name);

    if (category.name === 'Tất cả') {
      setOrchids(initialOrchids);
    } else {
      const filteredOrchids = initialOrchids.filter(
        (item) => item.category === category.name
      );
      setOrchids(filteredOrchids);
    }
  };
 
  const [selectedCategory, setSelectedCategory] = useState({
    label: 'Tất cả',
    value: 'Tất cả',
  });
  
  const handleToggleHeart = (orchidId) => {
    const isFavorite = isFavoriteOrchid(orchidId);
  
    setFavoriteOrchids((prevState) => {
      const updatedFavorites = isFavorite
        ? prevState.filter((item) => item !== orchidId)
        : [...prevState, orchidId];
  
      return updatedFavorites;
    });
  
    setFavoriteOrchidsHome((prevState) => {
      const updatedFavorites = isFavorite
        ? prevState.filter((item) => item !== orchidId)
        : [...prevState, orchidId];
  
      return updatedFavorites;
    });
  
    Animated.spring(animation, {
      toValue: isFavorite ? 0.8 : 1,
      useNativeDriver: true,
    }).start();
  };
  
  
  

  const isFavoriteOrchid = (orchidId) => {
    return favoriteOrchids.includes(orchidId);
  };

useEffect(() => {
  const unsubscribe = navigation.addListener('focus', () => {
    // Cập nhật danh sách yêu thích tại đây
  });

  return unsubscribe;
}, [navigation]);


  const [searchText, setSearchText] = useState('');
  const handleSelectOrchid = (orchid) => {
    const isFavorite = isFavoriteOrchid(orchid.id);

    if (!isFavorite) {
      setFavoriteOrchids([...favoriteOrchids, orchid.id]);
    }
    // if (!isFavorite) {
    //   setFavoriteOrchids([...favoriteOrchids, orchid]);
    // }
    const transaction = {
      id: orchid.id,
      name: orchid.name,
      price: orchid.price,
      date: new Date().toLocaleDateString(),
    };

    // Add the transaction to the transactions array
    setTransactions([...transactions, transaction]);
  };

  const handleSearch = () => {
    const normalizedSearchText = unorm.nfkc(searchText.toLowerCase());

    let filteredOrchids = initialOrchids.filter((item) =>
      unorm.nfkc(item.name.toLowerCase()).includes(normalizedSearchText)
    );
    setOrchids(filteredOrchids);
    Keyboard.dismiss();
  };
  const handleAddToDetail = (orchid) => {
    navigation.navigate('Detail', {
      orchid,
      isFavorite: favoriteOrchidsHome.includes(orchid.id),
      favoriteOrchidsHome: favoriteOrchidsHome,
    });
  };

  // const handleAddToDetail = (orchid) => {
  //   navigation.navigate('Detail', { orchid, isFavorite: favoriteOrchids.includes(orchid) });
  // };
  
  // const handleAddToFavorite = (orchid) => {
  //   setFavoriteOrchids([...favoriteOrchids, orchid]);
  // };

  const handleAddToFavorite = (orchid) => {
    handleToggleHeart(orchid.id);
  };
  
  useEffect(() => {
    if (!searchText) {
      setOrchids(initialOrchids);
    }
  }, [searchText]);
  const updateFavoriteOrchids = async (favoriteOrchids) => {
    try {
      const jsonValue = JSON.stringify(favoriteOrchids);
      await AsyncStorage.setItem('favoriteOrchids', jsonValue);
    } catch (error) {
      console.error('Error saving favorite orchids:', error);
    }
  };
  
  useEffect(() => {
    updateFavoriteOrchids(favoriteOrchids);
  }, [favoriteOrchids]);
  const getFavoriteOrchids = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('favoriteOrchids');
      return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (error) {
      console.log(error);
      return [];
    }
  };
  
  const handleToggleFavorite = (orchid) => {
    const updatedFavorites = favoriteOrchids.includes(orchid)
      ? favoriteOrchids.filter((item) => item !== orchid)
      : [...favoriteOrchids, orchid];
  
    setIsFavorite(updatedFavorites);
    setFavoriteOrchids(updatedFavorites);
  
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
  };
    useEffect(() => {
    setFavoriteOrchids(favoriteOrchids);
    setFavoriteOrchidsHome(favoriteOrchids);
  }, [favoriteOrchids]);

  const renderOrchidItem = ({ item }) => (
    <TouchableOpacity
      style={styles.orchidItemContainer}
      onPress={() => handleAddToDetail(item)}>
      <Animatable.View
        animation="fadeIn"
        duration={1000}
        style={styles.orchidContainer}>
        <View style={styles.orchidContainer}>
          <View style={styles.orchidContainerImage}>
            <Image source={item.image} style={styles.orchidImage} />
          </View>

          <View>
            {/* <View style={styles.headerContainer}>
              <Animated.View style={[{ transform: [{ scale: heartScale }] }]}>
                <FontAwesome
                  style={styles.heart}
                  onPress={() => handleToggleHeart(item.id)}
                  name={isFavoriteOrchid(item.id) ? 'heart' : 'heart-o'}></FontAwesome>
              </Animated.View>
            </View> */}
            <Text style={[styles.orchidName, { color: 'black' }]}>
              {item.name}
            </Text>
            <Text style={[styles.orchidPrice, { color: 'green' }]}>
              Giá: {item.price}&#8363;
            </Text>
            {item.quantity === 0 ? (
              <View style={styles.buttonCatgegory}>
                <Text style={[styles.orchidCategory, { color: 'white' }]}>
                  Out of stock
                </Text>
              </View>
            ) : (
              <View>
                <Text style={[styles.orchidCategory, { color: 'blue' }]}>
                  Số lượng: {item.quantity}
                </Text>
              </View>
            )}
          </View>
        </View>
      </Animatable.View>
    </TouchableOpacity>
  );

  return (
    // <KeyboardAvoidingView
    //   style={styles.container}
    //   behavior="padding"
    //   keyboardVerticalOffset={Platform.select({
    //     ios: () => 0,
    //     android: () => 50,
    //   })()}>
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.headerText]}>Welcome To</Text>
        <Text style={[styles.headerText2]}>Orchid Store</Text>
      </View>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Tìm kiếm..."
          value={searchText}
          onChangeText={setSearchText}
          onSubmitEditing={handleSearch}
        />
        <TouchableOpacity onPress={handleSearch} style={styles.iconContainer}>
          <Icon name="search" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.categoryContainer}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryButton,
              selectedCategory === category.name &&
                styles.categoryButtonSelected,
            ]}
            onPress={() => handleSelectCategory(category)}>
            <Text style={styles.categoryButtonText}>{category.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={orchids}
        renderItem={renderOrchidItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        numColumns={2}
        // ItemSeparatorComponent={ItemSeparator} // Thêm dòng này
        // keyboardShouldPersistTaps="handled"
        keyboardShouldPersistTaps="always"
      />
    </SafeAreaView>
    // </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f8ff',
    overflow: 'visible',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginBottom: 20,
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 140,
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    marginBottom: 10,
    borderBottomLeftRadius: 26,
    borderBottomRightRadius: 26,
    backgroundColor: '#9acd32',
  },
  headerText: {
    fontSize: 26,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#808080',
  },
  headerText2: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#f0fff0',
  },
  orchidContainer: {
    borderWidth: 1.6,
    borderColor: '#fff',
    borderRadius: 10,
    padding: 4,
  },
  orchidContainerImage: {
    borderWidth: 1.6,
    borderColor: '#ccc',
    borderRadius: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
    margin: 10,
    borderRadius: 20,
    padding: 5,
  },
  orchidCategory: {
    backgroundColor: 'red',
  },
  searchInput: {
    flex: 1,
    borderColor: '#ccc',
    borderRadius: 14,
    paddingHorizontal: 20, // Adjust this value as needed
    paddingVertical: 10,
    marginRight: 10,
  },
  buttonCatgegory: {
    backgroundColor: 'red',
    width: 110,
    borderRadius: 10,
    padding: 2,
    marginLeft: 8,
  },
  iconContainer: {
    padding: 8,
  },
  listContainer: {
    paddingBottom: 22,
  },
  orchidItemContainer: {
    flex: 1.2,
    marginBottom: 18,
    margin: 6,
    paddingHorizontal: 1,
    borderRadius: 8,
    backgroundColor: 'white',
    elevation: 2, // Hiệu ứng shadow cho Android
    shadowColor: '#000', // Màu shadow
    shadowOffset: { width: 0, height: 1 }, // Độ dịch chuyển shadow
    shadowOpacity: 0.4, // Độ mờ shadow
    shadowRadius: 4, // Độ cong mép của shadow
  },
  orchidImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  orchidName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 6,
    marginLeft: 8,
  },
  orchidPrice: {
    fontSize: 16,
    marginBottom: 5,
    marginLeft: 8,
  },
  orchidCategory: {
    fontSize: 16,
    marginBottom: 5,
    marginLeft: 8,
  },
  orchidDate: {
    fontSize: 14,
    marginBottom: 5,
  },
  categoryContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    borderRadius: 10,
    margin: 12,
  },
  categoryButtonSelected: {
    backgroundColor: '#9acd32',
    borderRadius: 20,
  },
  categoryButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ccc',
    marginRight: 10,
  },
  // itemSeparator: {
  //   height: 1,
  //   margin:5,
  //   backgroundColor: 'gray',
  // },
  categoryButtonText: {
    color: 'black',
    fontWeight: 600,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  heart: {
    fontSize: 24,
    color: 'red',
  },
});

export default HomeScreen;
