import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';

const AddModal = ({modalVisible, closeModal, addClick}) => {
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  return (
    <>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={modalStyle.transparentBackground}>
          <View style={modalStyle.modalView}>
            <TouchableOpacity
              style={modalStyle.closeButton}
              onPress={closeModal}>
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
                onChangeText={name => setName(name)}
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
            <TouchableOpacity style={modalStyle.addButton} onPress={addClick}>
              <Text style={modalStyle.addButtonText}>Add Product</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default AddModal;

const styles = StyleSheet.create({});
