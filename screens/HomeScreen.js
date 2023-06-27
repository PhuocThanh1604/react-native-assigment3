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
} from 'react-native';
import { FavoriteOrchidsContext } from './FavoriteOrchidsContext';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/Feather';
import unorm from 'unorm';

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
      desc: 'Loại cây này thường được trồng ở trong chậu hoặc thường sống trong đất, thuộc loại cây thân thảo, phù hợp với môi trường sống ở ngoài trời hoặc ở trong bóng râm. Trong quá trình chăm sóc, loại cây này thường có nguy cơ bị héo và hay gặp phải các loại mầm bệnh gây hư hỏng cây, bị úng nước hoặc gãy hoa khi gặp phải thời tiết khắc nghiệt như mưa gió quá lớn nhưng không có biện pháp khắc phục tốt.',
    },
    {
      id: 2,
      name: 'Lan Hoàng Thảo',
      price: '40000',
      date: '17/08/2020',
      category: 'Phong lan',
      image: require('../images/orchid2.jpg'),
      desc: 'Sở dĩ loại Lan này được gọi như vậy là do ngoại hình của chúng có các thua xòe ra ở bộ lưỡi và cánh hoa. Đây là loài Lan có màu sắc rực rỡ và nổi bật. Nếu chăm sóc tốt Lan Hoàng Thảo có thể được bán với giá cao. Loại Lan này phát triển với tốc độ nhanh, dễ trồng chỉ cần cung cấp cho nó đầy đủ các chất dinh dưỡng cần thiết.',
    },
    {
      id: 3,
      name: 'Lan Hồ Điệp',
      price: '3000',
      date: '17/08/2020',
      image: require('../images/orchid3.jpg'),
      category: 'Địa lan',
      desc: 'Lan Hồ Điệp với những cánh hoa có hình dạng như những con bướm đang bay lượn. Loại Lan này có có tên khoa học là Phalaenopsis.',
    },
    {
      id: 4,
      name: 'Hoa Địa Lan Vàng ',
      price: '12000',
      date: '17/08/2020',
      image: require('../images/orchid4.jpg'),
      category: 'Địa lan',
      desc: 'Loại cây này thường được trồng ở trong chậu hoặc thường sống trong đất, thuộc loại cây thân thảo, phù hợp với môi trường sống ở ngoài trời hoặc ở trong bóng râm. Trong quá trình chăm sóc, loại cây này thường có nguy cơ bị héo và hay gặp phải các loại mầm bệnh gây hư hỏng cây, bị úng nước hoặc gãy hoa khi gặp phải thời tiết khắc nghiệt như mưa gió quá lớn nhưng không có biện pháp khắc phục tốt.',
    },
    {
      id: 5,
      name: 'Lan Vanda',
      price: '9000',
      date: '17/08/2020',
      category: 'Bán địa lan',
      image: require('../images/orchid9.jpg'),
      desc: 'Sở dĩ loại Lan này được gọi như vậy là do ngoại hình của chúng có các thua xòe ra ở bộ lưỡi và cánh hoa. Đây là loài Lan có màu sắc rực rỡ và nổi bật. Nếu chăm sóc tốt Lan Hoàng Thảo có thể được bán với giá cao. Loại Lan này phát triển với tốc độ nhanh, dễ trồng chỉ cần cung cấp cho nó đầy đủ các chất dinh dưỡng cần thiết.',
    },
    {
      id: 6,
      name: 'Lan Hỏa Hoàng Cam',
      price: '180000',
      date: '17/6/2023',
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
      image: require('../images/orchid8.jpg'),
      desc: 'Loại cây này thường được trồng ở trong chậu hoặc thường sống trong đất, thuộc loại cây thân thảo, phù hợp với môi trường sống ở ngoài trời hoặc ở trong bóng râm. Trong quá trình chăm sóc, loại cây này thường có nguy cơ bị héo và hay gặp phải các loại mầm bệnh gây hư hỏng cây, bị úng nước hoặc gãy hoa khi gặp phải thời tiết khắc nghiệt như mưa gió quá lớn nhưng không có biện pháp khắc phục tốt.',
    },
    {
      id: 8,
      name: 'Lan Tam Bảo Sắc',
      price: '79000',
      date: '17/08/2020',
      category: 'Phong lan',
      image: require('../images/orchid7.jpg'),
      desc: 'Sở dĩ loại Lan này được gọi như vậy là do ngoại hình của chúng có các thua xòe ra ở bộ lưỡi và cánh hoa. Đây là loài Lan có màu sắc rực rỡ và nổi bật. Nếu chăm sóc tốt Lan Hoàng Thảo có thể được bán với giá cao. Loại Lan này phát triển với tốc độ nhanh, dễ trồng chỉ cần cung cấp cho nó đầy đủ các chất dinh dưỡng cần thiết.',
    },
    {
      id: 9,
      name: 'Hoa Lan Cẩm Cù',
      price: '50000',
      date: '7/3/2023',
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
      image: require('../images/orchid5.jpg'),
      desc: 'Lan Hồ Điệp với những cánh hoa có hình dạng như những con bướm đang bay lượn. Loại Lan này có có tên khoa học là Phalaenopsis.',
    },
    // Thêm các cây lan Bán địa lanc vào đây
  ];
  const [orchids, setOrchids] = useState(initialOrchids);
  const [isFavorite, setIsFavorite] = useState(false);
  const [transactions, setTransactions] = useState([]);

  const { favoriteOrchids, setFavoriteOrchids } = useContext(
    FavoriteOrchidsContext
  );
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
  const ItemSeparator = () => {
    return <View style={styles.itemSeparator} />;
  };

  const [searchText, setSearchText] = useState('');
  const handleSelectOrchid = (orchid) => {
    const isFavorite = favoriteOrchids.some((item) => item.id === orchid.id);

    if (!isFavorite) {
      setFavoriteOrchids([...favoriteOrchids, orchid]);
    }
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
    navigation.navigate('Detail', { orchid });
  };
  const handleAddToFavorite = (orchid) => {
    setFavoriteOrchids([...favoriteOrchids, orchid]);
  };
  useEffect(() => {
    if (!searchText) {
      setOrchids(initialOrchids);
    }
  }, [searchText]);

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
            <Text style={[styles.orchidName, { color: 'red' }]}>
              {item.name}
            </Text>
            <Text style={[styles.orchidPrice, { color: 'green' }]}>
              Giá: {item.price} VNĐ
            </Text>
            <Text style={[styles.orchidCategory, { color: 'blue' }]}>
              Loại: {item.category}
            </Text>
            {/* {favoriteOrchids.some((orchid) => orchid.id === item.id) && (
          <Icon
            name="heart"
            size={24}
            color="red"
            style={styles.favoriteIcon}
          />
        )} */}
          </View>
        </View>
      </Animatable.View>
    </TouchableOpacity>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
      keyboardVerticalOffset={Platform.select({
        ios: () => 0,
        android: () => -150,
      })()}>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Welcome to App Bán Lan</Text>
        </View>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Tìm kiếm..."
            value={searchText}
            onChangeText={setSearchText}
            onSubmitEditing={handleSearch}
          />
          <TouchableOpacity onPress={handleSearch}>
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
        />
      </SafeAreaView>
    </KeyboardAvoidingView>
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
    marginBottom: 20,
  },

  // header: {
  //   backgroundColor: 'white',
  //   height: 100,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   width: '100%',
  //   shadowColor: 'black',
  //   shadowOffset: { width: 0, height: 2 },
  //   shadowOpacity: 0.8,
  //   shadowRadius: 4,
  //   elevation: 2,
  //   marginBottom:20,
  //   borderRadius:20,
  //   borderBottomColor: 'gray',
  //   marginBottom: 20,
  //   borderBottomWidth: 1,
  //   borderBottomColor: 'gray',
  // },
  header: {
    // position: 'absolute',
    // top: 0,
    // left: 0,
    // right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    marginBottom: 10,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: '#9acd32',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
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
    marginBottom: 12,
    margin: 10,
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 14,
    paddingHorizontal: 40, // Adjust this value as needed
    paddingVertical: 10,
    marginRight: 10,
    padding: 10,
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
    fontSize: 16,
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
    margin: 10,
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
});

export default HomeScreen;
