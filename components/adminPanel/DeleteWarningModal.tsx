import React from "react"
import styles from "../../styles/adminStyles/Admin.module.css";
import { Text } from "./Text";
import { AdminButton } from "./AdminButton";
import { Portal } from "../Portal";

type Props = {
  isVisible: boolean
  onClose(): void
  onDelete(): void
}

export const DeleteWarningModal = React.memo(({ isVisible, onClose, onDelete }: Props) => {
  return (
    <Portal isVisible={isVisible}>
      <div className={styles.deleteModal}>
        <Text text={"Подтвердите удаление элемента"} size={"high"} />
        {/*todo s*/}
        {/*<Text text={удаленный элемент} size={"high"} />*/}
        <div className={styles.deleteModal_buttons}>
          <AdminButton text={"Да"} type={"primary"} stretch={true} onClick={onDelete}/>
          <div style={{width:'20px'}}/>
          <AdminButton text={"Нет"} type={"secondary"} stretch={true} onClick={onClose}/>
        </div>
      </div>
    </Portal>
  )
})