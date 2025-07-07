import { useDeleteShoppingMutation, useGetShoppingQuery } from '@/store/services/shopping';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native';
import AddShoppingModal from './add-shopping-modal';

const ShoppingCRUD = () => {
  const { data, isLoading } = useGetShoppingQuery({});
  
  let qailoZenProducts = [];
  // @ts-ignore
  if (!isLoading && data?.data) {
    // @ts-ignore
    const qailoZenCategory = data.data.find(
      // @ts-ignore
      (category) => category.category === "Qailo Zen"
    );
    
    qailoZenProducts = qailoZenCategory?.products || [];
    // console.log("Qailo Zen Products:", qailoZenProducts);
  }
  
  const [deleteItem, { isLoading: isDeleting }] = useDeleteShoppingMutation();
  const handleDelete = async (id: number) => { 
    const response = await deleteItem(id);
    if (response) {
      ToastAndroid.show(`Item Deleted`, ToastAndroid.SHORT);
    }
  };


  // Modal state for add/edit
  const [modalVisible, setModalVisible] = useState(false);
  const [editingItem, setEditingItem] = useState<ShoppingT | null>(null);

  const handleAddItem = () => {
    setEditingItem(null);
    setModalVisible(true);
  };

  const handleEdit = (item: ShoppingT) => {
    setEditingItem(item);
    setModalVisible(true);
  };

  const renderItem = ({ item }: { item: ShoppingT }) => (
    <View style={styles.itemContainer}>
      <View>
        <Text style={styles.itemName}>{item.product_name}</Text>
        <Text style={styles.itemDetails}>
          {item.quantity} {item.unit}
        </Text>
      </View>
      <View style={styles.itemActions}>
        <TouchableOpacity onPress={() => handleEdit(item)} style={styles.actionBtn}>
          <Ionicons name="create-outline" size={20} color="#007bff" />
        </TouchableOpacity>
        {
          isDeleting ? (
            <ActivityIndicator size="small" color="#007bff" />
          ) : (
            <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.actionBtn}>
              <Ionicons name="trash-outline" size={20} color="#dc3545" />
            </TouchableOpacity>
          )
        }
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Add Shopping Item</Text>
        <TouchableOpacity style={styles.addBtn} onPress={handleAddItem}>
          <Ionicons name="add-circle-outline" size={28} color="#28a745" />
        </TouchableOpacity>
      </View>

      {/* Add/Edit Item Modal */}
      <AddShoppingModal
        visible={modalVisible}
        onClose={() => {
          setModalVisible(false);
          setEditingItem(null);
        }}
        editItem={editingItem}
      />

      {/* Item List */}
      {
        isLoading ? (
          <ActivityIndicator size="small" color="#007bff" />
        ) : (
          <FlatList
            data={qailoZenProducts}
            keyExtractor={item => item.id.toString()}
            renderItem={renderItem}
            contentContainerStyle={styles.listContent}
          />
        )
      }
    </View>
  )
}

export default ShoppingCRUD

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#eee',
    backgroundColor: '#f8f9fa',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222',
  },
  addBtn: {
    padding: 4,
  },
  listContent: {
    padding: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f1f3f6',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  itemDetails: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  itemActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionBtn: {
    marginLeft: 12,
    padding: 4,
  },
});