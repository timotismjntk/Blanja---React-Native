import React, {useState, useEffect} from 'react';
import {StyleSheet, Modal, TouchableOpacity, Text, View} from 'react-native';

const ModalDeleteCart = (props) => {
  const {open, close, press} = props;
  const [modalVisible, setModalVisible] = useState(open);

  useEffect(() => {
    if (open === true) {
      setModalVisible(open);
    } else if (open === false) {
      setModalVisible(open);
    }
  }, [open]);
  return (
    <Modal
      animationType="fade"
      statusBarTranslucent={false}
      transparent={true}
      onRequestClose={() => setModalVisible(close)}
      visible={modalVisible}>
      <TouchableOpacity
        activeOpacity={1}
        style={styles.modal}
        onPress={() => setModalVisible(close)}>
        <View style={styles.modalContent}>
          <View style={styles.btnModalContainer}>
            <TouchableOpacity style={styles.btnModal} onPress={press}>
              <Text style={styles.modalText}>Delete ?</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default ModalDeleteCart;

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    padding: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  modalContent: {
    width: '100%',
    backgroundColor: 'white',
  },
  modalText: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  btnModal: {
    padding: 15,
  },
});
