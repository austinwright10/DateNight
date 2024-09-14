import { Modal, StyleSheet, Text, Pressable, View } from 'react-native'
import OTP from 'src/onboarding/OTP'

type OTPModalProps = {
  handleModalVisibility: (isVisible: boolean) => void
  isVisible: boolean
}

export default function OTPModal({
  handleModalVisibility,
  isVisible,
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
            <OTP />
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    height: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
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
