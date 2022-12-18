import css from './AddButton.module.css'
const AddButton = ({ toggleAddCard, prevTaskList }) => {
  return (
    <button
      type='submit'
      className={css.list_add_button}
      disabled={Boolean(prevTaskList.length < 1)}
      onClick={toggleAddCard} >Add card</button>
  );
}

export default AddButton;