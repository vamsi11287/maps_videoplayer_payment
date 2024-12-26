import React, {useState} from 'react';
import {
  Alert,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import RazorpayCheckout from 'react-native-razorpay';

const productsData = [
  {
    id: '1',
    name: 'I-Watch SE(2021)',
    price: 10,
    imageUrl:
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D',
  },
  {
    id: '2',
    name: 'Himalaya',
    price: 20,
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvvTevn3w90jJD1NDyky3XC7Nv6v0NlhrxWw&s',
  },
  {
    id: '3',
    name: 'Just Herbs',
    price: 30,
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZ4TKcuS4tnoJOZFIEgSXaj5EMaVJC30YOuA&s',
  },
  {
    id: '4',
    name: 'Pure Herbs',
    price: 20,
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRP2tAga50LVJmuCn4CxDyUHGKy_ZQdkVUwIQ&s',
  },
];

const Razorpay = () => {
  const [quantities, setQuantities] = useState(
    productsData.reduce((acc, product) => ({...acc, [product.id]: 0}), {}),
  );

  const calculateTotalPrice = () => {
    return productsData.reduce(
      (total, product) => total + product.price * quantities[product.id],
      0,
    );
  };

  const handlePayment = () => {
    const totalAmount = calculateTotalPrice() * 100; // Convert to paise

    let options = {
      description: 'Credits towards consultation',
      image: 'https://i.imgur.com/3g7nmJC.png',
      currency: 'INR',
      key: 'rzp_test_x3myk6U018KmOm', // Your API key
      amount: totalAmount.toString(), // Amount in paise
      name: 'foo',
      prefill: {
        email: 'void@razorpay.com',
        contact: '9191919191',
        name: 'Razorpay Software',
      },
      theme: {color: '#F37254'},
    };
    if (totalAmount === 0) return;

    RazorpayCheckout.open(options)
      .then(data => {
        // Handle success
        Alert.alert(
          'Payment Successful',
          `Payment ID: ${data.razorpay_payment_id}`,
          [{text: 'OK'}],
        );
        // Reset quantities and total amount after successful payment
        setQuantities(
          productsData.reduce(
            (acc, product) => ({...acc, [product.id]: 1}),
            {},
          ),
        );
      })
      .catch(error => {
        // Handle failure
        Alert.alert(
          'Payment Failed',
          `Error: ${error.code} | ${error.description}`,
          [{text: 'OK'}],
        );
      });
  };

  const increaseQuantity = id => {
    setQuantities(prevQuantities => ({
      ...prevQuantities,
      [id]: prevQuantities[id] + 1,
    }));
  };

  const decreaseQuantity = id => {
    setQuantities(prevQuantities => ({
      ...prevQuantities,
      [id]: Math.max(prevQuantities[id] - 1, 0), // Ensure quantity is never less than 1
    }));
  };

  const renderProduct = ({item}) => (
    <View style={styles.productCard}>
      <Image source={{uri: item.imageUrl}} style={styles.productImage} />
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productPrice}>Price: ₹{item.price}</Text>
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            onPress={() => decreaseQuantity(item.id)}
            style={styles.quantityButton}>
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityText}>{quantities[item.id]}</Text>
          <TouchableOpacity
            onPress={() => increaseQuantity(item.id)}
            style={styles.quantityButton}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.productTotal}>
          Total: ₹{item.price * quantities[item.id]}
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text
        style={{
          color: 'black', 
          fontWeight: '800',
          fontSize: 28,
          marginBottom: 12,
        }}>
        All Products
      </Text>
      <FlatList
        data={productsData}
        keyExtractor={item => item.id}
        renderItem={renderProduct}
        style={styles.productList}
      />
      <View style={styles.summaryContainer}>
        <Text style={styles.summaryText}>
          Total Price: ₹{calculateTotalPrice()}
        </Text>
        <TouchableOpacity onPress={handlePayment} style={styles.paymentButton}>
          <Text style={styles.paymentButtonText}>Proceed to Payment</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
  productList: {
    flex: 1,
  },
  productCard: {
    flexDirection: 'row',
    padding: 16,
    marginBottom: 12,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 3,
    alignItems: 'center',
  },
  productImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
    marginRight: 16,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
    fontFamily: 'PlaywriteCU-Regular',
  },
  productPrice: {
    fontSize: 15,
    color: '#333',
    marginBottom: 8,
    fontFamily: 'Poppins-Medium',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  quantityButton: {
    width: 40,
    height: 40,
    backgroundColor: '#ddd',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 8,
  },
  buttonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  quantityText: {
    fontSize: 18,
    color: '#555',
    marginHorizontal: 10,
    fontFamily: 'Poppins-Black',
  },
  productTotal: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 8,
  },
  summaryContainer: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginTop: 16,
    elevation: 3,
    alignItems: 'center',
  },
  summaryText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  paymentButton: {
    height: 55,
    backgroundColor: '#000',
    elevation: 4,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    width: '100%',
  },
  paymentButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Razorpay;
