import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, View, Image, Alert, Text } from 'react-native';
import { RectButton, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { fetchOrders } from '../api';
import Header from '../Header';
import OrderCard from '../OrderCard';
import { Order } from '../types';

export default function Orders() {

  const[orders, setOrders] = useState<Order[]>([]);
  const[isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const fetchData = () => {
    setIsLoading(true);
    fetchOrders()
    .then(response => setOrders(response.data))
    .catch(() => Alert.alert("Houve um erro ao carregar os pedidos!"))
    .finally(() => setIsLoading(false));
  }

  useEffect(() => {
    if(isFocused){
      fetchData();
    }
  }, [isFocused]);

  

  const handleOnPress = (order : Order) => {
    navigation.navigate('OrderDetails', {
      order
    })
  }

   return (
    <>  
    <Header />
    <ScrollView style={styles.container}>
      {isLoading ? (
        <Text>Bucando pedidos...</Text>
        ) : (
        orders.map(order => (
          <TouchableWithoutFeedback key={order.id} onPress={() => handleOnPress(order)}> 
            <OrderCard order={ order} /> 
          </TouchableWithoutFeedback>
        ))
      )}

    </ScrollView>
    </>
  );

}
const styles = StyleSheet.create({
  container : {
    padding : '5%',
    paddingLeft : '5%',
  }
});

