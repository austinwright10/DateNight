import { Modal, StyleSheet, View } from 'react-native'
import OTP from 'src/onboarding/OTP'

type OTPModalProps = {
  handleModalVisibility: (isVisible: boolean) => void
  isVisible: boolean
  phoneNumber: string
  firstName: string
  lastName: string
  location: string
  next: () => void
}

export default function OTPModal({
  handleModalVisibility,
  isVisible,
  phoneNumber,
  firstName,
  lastName,
  location,
  next,
}: OTPModalProps) {
  const toggleModalVisibility = () => {
    handleModalVisibility(!isVisible)
  }
  return (
    <View>
      <Modal
        animationType='slide'
        transparent={true}
        visible={isVisible}
        onRequestClose={() => {
          toggleModalVisibility()
        }}
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
    </View>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Add a semi-transparent background
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    justifyContent: 'center',
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
})
