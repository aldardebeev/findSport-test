import { useState } from "react";
import { Dialog } from "primereact/dialog";
import "./test.scss";

const initialState = {
  author: "",
  content: "",
  count: 0,
};

interface AddPostModalProps {
  modalOpen: boolean;
  handleSendPost: (author: string, content: string) => void;
  handleCloseModal: () => void;
}

const AddPostModal = ({
  modalOpen,
  handleSendPost,
  handleCloseModal,
}: AddPostModalProps) => {
  const [state, setState] = useState(initialState);
  const { author, content, count } = state;

  const handleSendClick = () => {
    if (author && content) {
      handleSendPost(author, content);
      setState(initialState); // Сбрасываем состояние после отправки
      handleCloseModal(); // Закрываем модальное окно после отправки
    } else {
      alert("Пожалуйста, заполните все поля.");
    }
  };

  return (
    <Dialog visible={modalOpen} onHide={handleCloseModal}>
      <div className="AddPostModal">
        <div className="ModalHeader">Новый пост</div>
        <input
          className="Author"
          type="text"
          placeholder="Имя"
          value={author}
          onChange={(e) => setState({ ...state, author: e.target.value })}
        />
        <textarea
          className="Content"
          value={content}
          maxLength={200}
          onChange={(e) =>
            setState({ ...state, content: e.target.value, count: e.target.value.length })
          }
        />
        <div className="charCount">{`${count}/200`}</div>
        <div className="buttonsWrapper">
          <button onClick={handleCloseModal}>Закрыть</button>
          <button onClick={handleSendClick}>Отправить</button>
        </div>
      </div>
    </Dialog>
  );
};

export default AddPostModal;
