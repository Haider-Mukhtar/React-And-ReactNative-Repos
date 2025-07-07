import { useAddShoppingMutation, useEditShoppingMutation } from '@/store/services/shopping';
import { Picker } from '@react-native-picker/picker';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Modal, Platform, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native';

interface Props {
  visible: boolean
  onClose: () => void
  editItem?: ShoppingT | null
}

const unitOptions = ['Pieces', 'Kg', 'Liter']


const AddShoppingModal: React.FC<Props> = ({ visible, onClose, editItem }) => {
  const [addItem, { isLoading: isAdding }] = useAddShoppingMutation();
  const [editShopping, { isLoading: isEditing }] = useEditShoppingMutation();

  const [productId, setProductId] = useState<number | undefined>(undefined);
  const [productName, setProductName] = useState<string>('');
  const [quantity, setQuantity] = useState<string>('');
  const [unit, setUnit] = useState(unitOptions[0]);

  useEffect(() => {
    if (editItem) {
      setProductId(editItem.id);
      setProductName(editItem.product_name || '');
      setQuantity(editItem.quantity);
      setUnit(editItem.unit || unitOptions[0]);
    } else {
      setProductName('');
      setQuantity('');
      setUnit(unitOptions[0]);
    }
  }, [editItem, visible]);

  const handleSubmit = async () => {
    if (editItem) {
      const response = await editShopping({
        id: productId,
        product_name: productName,
        quantity: quantity,
        unit: unit,
      });
      // console.log(response);
    } else {
      const response = await addItem({
        category: "Qailo Zen",
        product_name: productName,
        quantity: quantity,
        unit: unit,
      });
      // console.log(response);
    }
    ToastAndroid.show(`Item ${editItem ? 'Updated' : 'Added'}`, ToastAndroid.SHORT);
    setProductName('');
    setQuantity('');
    setUnit(unitOptions[0]);
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Add Shopping Item</Text>
          <TextInput
            style={styles.input}
            placeholder="Product Name"
            value={productName}
            onChangeText={setProductName}
          />
          <TextInput
            style={styles.input}
            placeholder="Quantity"
            value={quantity}
            onChangeText={setQuantity}
            keyboardType="numeric"
          />
          {/* Picker for units */}
          {Platform.OS === 'ios' ? (
            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={unit}
                onValueChange={setUnit}
                style={styles.picker}
              >
                {unitOptions.map(opt => (
                  <Picker.Item key={opt} label={opt} value={opt} />
                ))}
              </Picker>
            </View>
          ) : (
            <Picker
              selectedValue={unit}
              onValueChange={setUnit}
              style={styles.picker}
            >
              {unitOptions.map(opt => (
                <Picker.Item key={opt} label={opt} value={opt} />
              ))}
            </Picker>
          )}

            {
              isAdding || isEditing ? (
                <ActivityIndicator size="small" color="#007bff" />
              ) : (
                <TouchableOpacity onPress={handleSubmit} style={styles.addBtn}>
                  <Text style={styles.addBtnText}>{editItem ? 'Edit Item' : 'Add Item'}</Text>
                </TouchableOpacity>
              )
            }
          <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
            <Text style={styles.closeText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}

export default AddShoppingModal

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    padding: 10,
    marginBottom: 14,
    fontSize: 16,
  },
  pickerWrapper: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    marginBottom: 14,
    overflow: 'hidden',
  },
  picker: {
    width: '100%',
    height: 64,
  },
  addBtn: {
    backgroundColor: '#28a745',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 6,
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
  },
  addBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  closeBtn: {
    marginTop: 12,
    padding: 10,
    backgroundColor: '#eee',
    borderRadius: 6,
    width: '100%',
    alignItems: 'center',
  },
  closeText: {
    color: '#333',
  },
})