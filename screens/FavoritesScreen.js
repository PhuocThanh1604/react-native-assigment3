import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  Animated,
  SafeAreaView,
  TouchableWithoutFeedback,
  ToastAndroid,
  Modal,
  Pressable,
} from 'react-native';
import { FavoriteOrchidsContext } from './FavoriteOrchidsContext';
import { useNavigation } from '@react-navigation/native';
// Thêm dòng sau vào đầu tệp
import Icon from 'react-native-vector-icons/FontAwesome';

const FavoritesScreen = () => {
  const [animation] = useState(new Animated.Value(0));
  const [deletedItemId, setDeletedItemId] = useState(null);
  const [showEmptyText, setShowEmptyText] = useState(false);

  const { favoriteOrchids, setFavoriteOrchids } = useContext(
    FavoriteOrchidsContext
  );
  const navigation = useNavigation();
  const [confirmDeleteAll, setConfirmDeleteAll] = useState(false);
  const [confirmDeleteItem, setConfirmDeleteItem] = useState(null);

  const handleDeleteAll = () => {
    setConfirmDeleteAll(true);
  };

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
      navigation.navigate('Detail', {
        orchid: item,
        selectedOrchidId: item.id,
      });
    });
  };

  const handleDeleteItem = (itemId) => {
    setConfirmDeleteItem(itemId);
  };

  const handleDeleteConfirm = () => {
    if (confirmDeleteAll) {
      // Xử lý logic khi người dùng xóa tất cả item, ví dụ: cập nhật danh sách cây lan ưa thích
      setFavoriteOrchids([]);
      setConfirmDeleteAll(false);
      ToastAndroid.show('Đã xóa tất cả cây lan ưa thích', ToastAndroid.SHORT);
    } else if (confirmDeleteItem !== null) {
      // Xử lý logic khi người dùng xóa item, ví dụ: cập nhật danh sách cây lan ưa thích
      setFavoriteOrchids((prevOrchids) =>
        prevOrchids.filter((orchid) => orchid.id !== confirmDeleteItem)
      );
      setConfirmDeleteItem(null);
      ToastAndroid.show('Đã xóa cây lan', ToastAndroid.SHORT);
    }
  };

  const handleDeleteCancel = () => {
    setConfirmDeleteAll(false);
    setConfirmDeleteItem(null);
  };

  const renderOrchidItem = ({ item, index }) => {
    if (confirmDeleteAll) {
      return null;
    }
    const translateX = animation.interpolate({
      inputRange: [0, 1],
      outputRange: [500, 0],
    });

    const animatedStyle = {
      transform: [{ translateX: translateX }],
      elevation: 2,
      shadowColor: 'rgba(0, 0, 0, 0.2)',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 1,
      shadowRadius: 2,
    };

    const itemContainerStyle = {
      opacity: deletedItemId === item.id ? 0 : 1,
    };
    useEffect(() => {
      if (favoriteOrchids.length === 0) {
        setShowEmptyText(true);
      } else {
        setShowEmptyText(false);
      }
    }, [favoriteOrchids]);

    return (
      <TouchableWithoutFeedback onPress={() => handleItemPress(item)}>
        <Animated.View
          style={[
            styles.orchidItemContainer,
            animatedStyle,
            itemContainerStyle,
          ]}>
          <Image source={item.image} style={styles.orchidImage} />
          <Text style={styles.orchidName}>{item.name}</Text>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => handleDeleteItem(item.id)}>
            <Icon name="trash" size={30} color="white" />
          </TouchableOpacity>
        </Animated.View>
        {showEmptyText && (
          <Text style={styles.emptyText}>Không có sản phẩm ưa thích</Text>
        )}
      </TouchableWithoutFeedback>
    );
  };

  useEffect(() => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  useEffect(() => {
    if (deletedItemId !== null) {
      Animated.timing(animation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setDeletedItemId(null);
      });
    }
  }, [deletedItemId]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Danh sách cây lan ưa thích</Text>
      </View>
      <TouchableOpacity
        style={styles.deleteAllButton}
        onPress={handleDeleteAll}>
        <Text style={styles.deleteAllButtonText}>Xóa tất cả</Text>
        <Icon name="trash" size={30} color="white" />
      </TouchableOpacity>

      <FlatList
        data={favoriteOrchids}
        renderItem={renderOrchidItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
      />

      <Modal
        visible={confirmDeleteAll || confirmDeleteItem !== null}
        animationType="slide"
        transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              {confirmDeleteAll
                ? 'Bạn có chắc chắn muốn xóa tất cả cây lan ưa thích?'
                : 'Bạn có chắc chắn muốn xóa cây lan này?'}
            </Text>
            <View style={styles.modalButtons}>
              <Pressable
                style={styles.modalButton}
                onPress={handleDeleteCancel}>
                <Text style={styles.modalButtonText}>Hủy</Text>
              </Pressable>
              <Pressable
                style={styles.modalButton}
                onPress={handleDeleteConfirm}>
                <Text style={styles.modalButtonText}>Đồng ý</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
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
  },
  listContainer: {
    paddingBottom: 20,
    padding: 10,
  },
  orchidItemContainer: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#f8f8f8',
  },
  emptyText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
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
    marginTop: 10,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#f0fff0',
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
  deleteButton: {
    backgroundColor: '#dc143c',
    borderRadius: 5,
    padding: 5,
    marginTop: 10,
    alignSelf: 'flex-end',
    marginRight: 10,
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  deleteAllButton: {
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#dc143c',
    borderRadius: 5,
    margin: 10,
  },

  deleteAllButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    elevation: 5,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
  },
  modalButton: {
    flex: 1,
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 10,
    backgroundColor: '#dc143c',
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  orchidItemContainer: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#f8f8f8',
    flexDirection: 'row',
    alignItems: 'center',
  },
  orchidImage: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 10,
    marginRight: 10,
  },
  orchidName: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#f00',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 10,
  },
  backRightBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 75,
    paddingRight: 17,
    borderRadius: 10,
  },
  backRightBtnRight: {
    backgroundColor: '#f00',
    right: 0,
  },
  backTextWhite: {
    color: '#FFF',
  },
});

export default FavoritesScreen;
