import React, {useState, useCallback, useEffect} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  TextInput,
  Image,
  Modal,
  Alert,
  TouchableOpacity,
} from 'react-native';
import * as ImagePicker from 'react-native-image-picker';

import {wh, ww} from '../helpers/responsive';
import Button from '../components/Button';
import {FabButton} from '../components';
import {useSelector} from 'react-redux';
import axios from 'axios';

const HomeScreen = () => {
  const [response, setResponse] = useState(null);
  const [photo, setPhoto] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [code, setCode] = useState('33');
  const [productName, setProductName] = useState('Test');
  const [price, setPrice] = useState('30₺');
  const user = useSelector(state => state.app.user);

  const [items, setItems] = useState([
    {
      id: '1',
      code: '11',
      name: 'Snoppy',
      photo:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYdeqMOmz-rHzck70hXo_KYxWl--4M6mc14Q&usqp=CAU',
      price: '30₺',
      lastUpdate: '2022-05-14',
    },
    {
      id: '2',
      code: '22',
      name: 'Linux',
      photo:
        'https://freepikpsd.com/file/2019/10/resimler-png-5-Transparent-Images.png',
      price: '60₺',
      lastUpdate: '2022-04-15',
    },
    {
      id: '3',
      code: '33',
      name: 'Mario',
      photo:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTwQ_4WDaG622jZ5R3qrM7FREuRobYcWfo_Q&usqp=CAU',
      price: '90₺',
      lastUpdate: '2022-04-19',
    },
  ]);

  const addUpdateProduct = () => {
    var data = JSON.stringify({
      code: code,
      name: productName,
      photo: photo,
      price: price,
      lastUpdate: new Date().toISOString().split('T')[0],
    });

    var config = {
      method: 'put',
      url: 'https://test.com/api/product',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const deleteProduct = () => {
    var data = JSON.stringify({
      id: '',
    });

    var config = {
      method: 'delete',
      url: 'https://test.com/api/product',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const getAllProducts = () => {
    var config = {
      method: 'get',
      url: 'https://test.com/api/product',
      headers: {},
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        setItems(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    getAllProducts();

    // AUTH TOKEN && LAST UPDATE
    console.log('Token: ', user?.access_token);
    console.log('Last Update:', new Date().toISOString().split('T')[0]);
  }, []);

  const onButtonPress = useCallback((type, options) => {
    ImagePicker.launchImageLibrary(options, setResponse);
    setPhoto(response?.assets[0].uri);
    console.log('response:', response?.assets[0].uri);
  }, []);

  const TableHeader = () => (
    <View style={styles.tableContainer}>
      <View style={styles.column}>
        <Text style={styles.columnText}>ID</Text>
      </View>
      <View style={styles.column}>
        <Text style={styles.columnText}>Code</Text>
      </View>
      <View style={styles.column}>
        <Text style={styles.columnText}>Name</Text>
      </View>
      <View style={styles.column}>
        <Text style={styles.columnText}>Photo</Text>
      </View>
      <View style={styles.column}>
        <Text style={styles.columnText}>Price</Text>
      </View>
      <View style={styles.column}>
        <Text style={styles.columnText}>Last Updated</Text>
      </View>
    </View>
  );

  const TableItems = () =>
    items.map((i, index) => (
      <TouchableOpacity
        style={styles.tableContainer}
        onLongPress={() => {
          setUpdateModalVisible(!updateModalVisible);
        }}>
        <View style={styles.itemColumn}>
          <Text style={styles.columnText}>{i.id}</Text>
        </View>
        <View style={styles.itemColumn}>
          <Text style={styles.columnText}>{i.code}</Text>
        </View>
        <View style={styles.itemColumn}>
          <Text style={styles.columnText}>{i.name}</Text>
        </View>
        <View style={styles.itemColumn}>
          {photo !== '' ? (
            <Image source={{uri: i.photo}} style={styles.photo} />
          ) : (
            <Text>-</Text>
          )}
        </View>
        <View style={styles.itemColumn}>
          <Text style={styles.columnText}>{i.price} </Text>
        </View>
        <View style={styles.itemColumn}>
          <Text style={styles.columnText}>{i.lastUpdate}</Text>
        </View>
      </TouchableOpacity>
    ));

  return (
    <SafeAreaView style={styles.container}>
      {/* -------------------------- Product Add Modal -------------------------- */}
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={modalStyle.transparentBackground}>
          <View style={modalStyle.modalView}>
            <TouchableOpacity
              style={modalStyle.closeButton}
              onPress={() => setModalVisible(false)}>
              <Text style={modalStyle.closeX}>X</Text>
            </TouchableOpacity>
            <Text>Add Product</Text>
            <View style={modalStyle.inputContainer}>
              <TextInput
                placeholder="Code"
                style={modalStyle.textInput}
                onChangeText={code => setCode(code)}
              />
              <TextInput
                placeholder="Name"
                style={modalStyle.textInput}
                onChangeText={name => setProductName(name)}
              />
              <TouchableOpacity
                style={modalStyle.button}
                onPress={onButtonPress}>
                <Text style={modalStyle.buttonText}>Select Image</Text>
              </TouchableOpacity>

              <TextInput
                placeholder="Price"
                style={modalStyle.textInput}
                onChangeText={price => setPrice(price)}
              />
            </View>
            <TouchableOpacity
              style={modalStyle.addButton}
              onPress={addUpdateProduct}>
              <Text style={modalStyle.addButtonText}>Add Product</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {/* -------------------------- Product Add Modal -------------------------- */}
      {/* -------------------------- Product Update Modal -------------------------- */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={updateModalVisible}>
        <View style={modalStyle.transparentBackground}>
          <View style={modalStyle.modalView}>
            <TouchableOpacity
              style={modalStyle.closeButton}
              onPress={() => setUpdateModalVisible(false)}>
              <Text style={modalStyle.closeX}>X</Text>
            </TouchableOpacity>
            <Text>Update Product</Text>
            <View style={modalStyle.inputContainer}>
              <TextInput
                placeholder="Code"
                value={code}
                style={modalStyle.textInput}
                onChangeText={code => setCode(code)}
              />
              <TextInput
                placeholder="Name"
                value={productName}
                style={modalStyle.textInput}
                onChangeText={name => setName(name)}
              />
              <TouchableOpacity
                onPress={onButtonPress}
                style={modalStyle.blankPhoto}>
                {photo !== '' ? (
                  <Image source={{uri: photo}} style={styles.photo} />
                ) : (
                  <Text>-</Text>
                )}
              </TouchableOpacity>

              <TextInput
                placeholder="Price"
                value={price}
                style={modalStyle.textInput}
                onChangeText={price => setPrice(price)}
              />
            </View>
            <View style={modalStyle.buttons}>
              <TouchableOpacity
                style={[modalStyle.addButton, {backgroundColor: 'crimson'}]}
                onPress={() =>
                  Alert.alert(
                    'Delete Product',
                    'Do you want to delete this product?',
                    [
                      {
                        text: 'No',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                      },
                      {text: 'Yes', onPress: deleteProduct},
                    ],
                  )
                }>
                <Text style={modalStyle.addButtonText}>Delete Product</Text>
              </TouchableOpacity>
              <TouchableOpacity style={modalStyle.addButton} onPress={() => {}}>
                <Text style={modalStyle.addButtonText}>Update Product</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      {/* -------------------------- Product Update Modal -------------------------- */}

      <TableHeader />
      <TableItems />
      <FabButton onPress={() => setModalVisible(!modalVisible)} />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  tableContainer: {
    flexDirection: 'row',
  },
  column: {
    alignItems: 'center',
    justifyContent: 'center',
    width: ww(0.16),
    borderWidth: 1,
  },
  itemColumn: {
    alignItems: 'center',
    justifyContent: 'center',
    width: ww(0.16),
    height: wh(0.1),
    borderWidth: 1,
  },
  columnText: {
    textAlign: 'center',
  },
  photo: {
    width: ww(0.16),
    height: wh(0.1),
  },
});

const modalStyle = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  transparentBackground: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4b4a4ae3',
  },
  modalView: {
    width: ww(0.8),
    height: wh(0.6),
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  closeButton: {
    width: ww(0.07),
    height: ww(0.07),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: ww(0.5),
    position: 'absolute',
    zIndex: 99,
    top: ww(0.02),
    right: ww(0.02),
    backgroundColor: '#2196F3',
  },
  closeX: {
    color: '#fff',
    fontSize: ww(0.05),
    fontWeight: 'bold',
  },
  inputContainer: {
    marginTop: wh(0.02),
  },
  textInput: {
    marginTop: wh(0.02),
    width: ww(0.4),
    height: wh(0.05),
    borderBottomWidth: 0.5,
  },
  button: {
    width: ww(0.4),
    marginTop: wh(0.03),
    height: wh(0.04),
    borderBottomWidth: 0.5,
  },
  buttonText: {
    color: '#C6C6C8',
    paddingTop: wh(0.005),
  },
  addButton: {
    width: ww(0.3),
    marginTop: wh(0.09),
    height: wh(0.04),
    backgroundColor: '#2196F3',
    alignItems: 'center',
    justifyContent: 'center',
  },

  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    paddingTop: wh(0.005),
  },
  blankPhoto: {
    marginTop: wh(0.03),
    alignItems: 'center',
    justifyContent: 'center',
    width: ww(0.16),
    height: wh(0.1),
    borderWidth: 0.5,
  },
  buttons: {
    width: ww(0.7),
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
