import React from 'react'
import {
  View,
  Text,
  TextInput,
  Modal,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import OTP from 'src/onboarding/OTP'

type OTPModalProps = {
  isVisible: boolean
  handleModalVisibility: (isVisible: boolean) => void
  phoneNumber: string
  next: () => void
}

const OTPModal: React.FC<OTPModalProps> = ({
  isVisible,
  handleModalVisibility,
  phoneNumber,
  next,
}) => {
  return (
    <Modal
      animationType='slide'
      transparent={true}
      visible={isVisible}
      onRequestClose={() => handleModalVisibility(false)}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <OTP
            phoneNumber={phoneNumber}
            showModal={handleModalVisibility}
            goNext={next}
          />
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
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
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    width: 200,
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: '#2196F3',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
})

export default OTPModal
