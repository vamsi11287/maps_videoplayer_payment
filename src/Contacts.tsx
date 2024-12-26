import React, {useEffect, useState} from 'react';
import Contacts from 'react-native-contacts';

import {
  PermissionsAndroid,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
const requestPermission = async () => {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_CONTACTS,
        {
          title: 'Contact Permission',
          message: 'We need your permission to add contacts.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
      return false;
    }
  } else {
    return true;
  }
};

const ContactsPage = () => {
  const [contactsList, setContactsList] = useState([]);
  const [load, setLoad] = useState(false);

  const toggleModal = () => {
    requestPermission();
    Contacts.openContactForm({});
    setLoad(!load);
  };

  useEffect(() => {
    readContacts();
  }, []);
  const readContacts = () => {
    Contacts?.getAll().then((contacts: any) => {
      setContactsList(contacts);
    });
  };
  console.log('gee');

  return (
    <SafeAreaView>
      <View style={styles.mainContainer}>
        <Text style={styles.subContainer}>All Contacts</Text>
        <TouchableOpacity onPress={toggleModal}>
          <Text style={{color: 'red'}}>Add</Text>
        </TouchableOpacity>
      </View>

      <View style={{padding: 5}}>
        {contactsList.map((each, index) => (
          <View
            key={index}
            style={{
              elevation: 2,
              borderWidth: 1,
              padding: 5,
              borderColor: 'white',
              paddingLeft: 12,
            }}>
            <Text style={{color: 'black', fontSize: 24, fontWeight: '600'}}>
              {each?.givenName}
            </Text>

            <Text
              style={{
                color: 'orange',
                fontSize: 20,
                fontWeight: '600',
                margin: 3,
              }}>
              {each?.phoneNumbers[0]?.number}
            </Text>
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
};

export default ContactsPage;

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  contactCon: {
    flex: 1,
    flexDirection: 'row',
    padding: 5,
    borderBottomWidth: 0.5,
    borderBottomColor: '#d9d9d9',
  },
  imgCon: {},
  placeholder: {
    width: 55,
    height: 55,
    borderRadius: 30,
    overflow: 'hidden',
    backgroundColor: '#d9d9d9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contactDat: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 5,
  },
  txt: {
    fontSize: 18,
  },
  name: {
    fontSize: 16,
  },
  phoneNumber: {
    color: '#888',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // padding: 20,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalContainer: {
    width: 300,
    padding: 20,
    height: 250,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    marginBottom: 15,
  },
  input: {
    width: 250,
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  mainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 5,
  },
  subContainer: {
    textAlign: 'center',
    fontSize: 24,
    margin: 5,
    color: 'black',
    fontWeight: '600',
  },
});
